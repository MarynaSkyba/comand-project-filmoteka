import moviesCard from '../template/tmp-card.hbs';
import QueryService from  './query-service';
import getRefs from './refs';
import Notiflix from "notiflix";
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import '../../node_modules/spin.js/spin.css';
import { target, spinner } from './spinner.js'
import movieButtons from './overlay-btn';

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

refs.searchForm.addEventListener('submit', onSearch);
 
async function onSearch(e) {
  e.preventDefault();
  spinner.spin(target);
  filmsApiService.query = e.currentTarget.elements.searchQuery.value;

  try{
    
    if (filmsApiService.query.trim() === '') {
    filmsApiService.fetchDate(page).then(response => {
    renderMovieCards(response);
    const li =  document.querySelectorAll('.gallery-item');
      movieButtons(li, response);
       spinner.stop();
 });
      spinner.stop();
      clearInput();
    Notiflix.Notify.failure('Oops, there are no movies with that name');
    return;
    } else {
  const result = await filmsApiService.fetchSearch();
  clearInput()
  paginationInput.reset(result[1].total_pages);
      renderMovieCards(result);
      spinner.stop();
  }}
  
  catch(error) {
    console.log(error)
  }
 
}

paginationInput.on('afterMove', (event) => {
  const currentPage = event.page;
  const query = refs.searchForm.searchQuery.value;
  console.log(query);
  filmsApiService.fetchSearch(currentPage).then(results => {
      clearInput()
        renderMovieCards(results);
    } )
});


function renderMovieCards(data) {  
  refs.gallery.insertAdjacentHTML('beforeend', moviesCard(data));
}

function clearInput() {
  refs.gallery.innerHTML= '';
}












