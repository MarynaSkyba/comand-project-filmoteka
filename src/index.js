import './sass/main.scss';
import './library';
import './watch-queue';
import templateCard from './template/tmp-card.hbs';
import getRefs from './js/refs';
import QueryService from './js/query-service.js';
import pagination from './js/pagination'
// import Pagination from 'tui-pagination';
// import 'tui-pagination/dist/tui-pagination.css';
import Notiflix from 'notiflix';
import changeBtn from './js/chage-btn';


const refs = getRefs();
const queryService = new QueryService();

queryService.fetchDate().then((response) => {
    console.log(response);
    renderMoveGallery(response.results);
 });
 
 
 function renderMoveGallery(data) {
     refs.container.insertAdjacentHTML('beforeend', templateCard(data));
     
    }


changeBtn();

refs.libraryBtn.addEventListener('click', addGallery)


function addGallery(){
    Notiflix.Notify.failure('Sorry, there are no film matching your search query. Please try again.');

    refs.container.innerHTML = '';
    // refs.container.insertAdjacentHTML('beforeend', templateCard(data));
}