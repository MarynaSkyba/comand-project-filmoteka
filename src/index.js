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




const refs = getRefs();
const queryService = new QueryService();

queryService.fetchDate().then((response) => {
    console.log(response);
     renderMoveGallery(response.results);
 });
    
 
 function renderMoveGallery(data) {
    refs.container.insertAdjacentHTML('beforeend', templateCard(data));

}





refs.libraryBtn.addEventListener('click', changeHeaderLibraryBtn)

function changeHeaderLibraryBtn(){
    refs.menuInput.classList.add('is-hidden');
    refs.menuBtn.classList.remove('is-hidden');
    refs.libraryBtn.classList.add('current');
    refs.homeBtn.classList.remove('current');
}

refs.homeBtn.addEventListener('click', changeHeaderHomeBtn)

function changeHeaderHomeBtn(){
    refs.menuInput.classList.remove('is-hidden');
    refs.menuBtn.classList.add('is-hidden');
    refs.libraryBtn.classList.remove('current');
    refs.homeBtn.classList.add('current');
}