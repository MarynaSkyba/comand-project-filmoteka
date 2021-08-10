import moviesCard from '../template/tmp-card.hbs';
import QueryService from  './query-service';
import getRefs from './refs';
import Notiflix from "notiflix";




const debounce = require('lodash.debounce')
const DEBOUNCE_DELAY = 300;
const refs = getRefs();

const filmsApiService = new QueryService();


refs.input.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));




function onSearch(e) {
    e.preventDefault()
    filmsApiService.query = e.target.value;

    if (filmsApiService.query.trim() === '') {
         getInfoMessage('Please enter a more specific name.');
    }

      filmsApiService.resetPage();
    clearMoviesContainer();
    

    if (filmsApiService.query !== '') {
        filmsApiService.fetchSearch().then(movies => {
            if (movies.length === 0) {
               getErrorMessage('Oops, there is no movie with that name');
 
            } else {
                createFilmCardsMarkUp(movies);
            }
        })
    }
}

function createFilmCardsMarkUp(movieInfo) {
  refs.gallery.insertAdjacentHTML('beforeend', moviesCard(movieInfo));
}

function clearMoviesContainer() {
  refs.gallery.innerHTML = '';
}





function getInfoMessage(message) {
    Notiflix.Notify.info(message);
}

function getErrorMessage(message) {
    Notiflix.Notify.failure(message);
}


















