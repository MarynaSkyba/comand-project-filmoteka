import moviesCard from '../template/tmp-card.hbs';
import QueryService from  './query-service';
import getRefs from './refs';
import Notiflix from "notiflix";
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';


const debounce = require('lodash.debounce')
const DEBOUNCE_DELAY = 300;
const refs = getRefs();

const options = {
    total_pages: 0,
    itemsPerPage: 20,
    visiblePages: 5,
    page: 1,
    centerAlign: true,
    firstItemClassName: 'tui-first-child',
    lastItemClassName: 'tui-last-child',
    template: {
        page: '<a href="#" class="tui-page-btn">{{page}}</a>',
        currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
        moveButton:
            '<a href="#" class="tui-page-btn tui-{{type}}">' +
            '<span class="tui-ico-{{type}}">{{type}}</span>' +
            '</a>',
        disabledMoveButton:
            '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
            '<span class="tui-ico-{{type}}">{{type}}</span>' +
            '</span>',
        moreButton:
            '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
            '<span class="tui-ico-ellip">...</span>' +
            '</a>'
    }
};
const paginationInput = new Pagination('#tui-pagination-container', options);

const page = paginationInput.getCurrentPage();
const filmsApiService = new QueryService();


refs.input.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));


function renderMovieCards(name) {
  
  refs.gallery.insertAdjacentHTML('beforeend', moviesCard(name));
  
}


 

function onSearch(e) {
  const query = e.target.value
  if (query === '' || query.trim() === '') {
     clearInput()
    Notiflix.Notify.failure('Oops, there is no movie with that name');
   
    return
  }
  clearInput()

 filmsApiService.fetchSearch(query).then(response => {
   console.log(response);
   paginationInput.reset(response.total_pages);

   renderMovieCards(response.results);
   console.log(response.results)
  }
  ).catch(error => console.log(error))
 

}

paginationInput.on('afterMove', (event) => {
  const currentPage = event.page;
  const query = refs.input.value
    console.log(query)
    filmsApiService.fetchSearchTest(currentPage, query).then(response => {
        renderMovieCards(response.results);
    } )
});



function clearInput() {
  refs.input.innerHTML = ''
  refs.gallery.innerHTML=''
}














