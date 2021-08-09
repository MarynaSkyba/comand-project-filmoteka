// import moviesCard from '../template/tmp-card.hbs';
// import QueryService from  './query-service';
// import getRefs from './refs';
// import Notiflix from "notiflix";
// import debounce from 'lodash.debounce';



// const debounce = require('lodash.debounce')
// const DEBOUNCE_DELAY = 300;
// const refs = getRefs();

// const filmsApiService = new QueryService();


// refs.input.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));


// function onSearch(e) {
//     filmsApiService.searchQuery = e.target.value;

//     if (filmsApiService.searchQuery.trim() === '') {
//         return  getInfoMessage('Please enter a more specific name.');
//     }

//       filmsApiService.resetPage();
//     clearMoviesContainer();
    

//     if (filmsApiService.searchQuery !== '') {
//         filmsApiService.fetchSearch().then(movies => {
//             if (movies.length === 0) {
//                getErrorMessage('Oops, there is no movie with that name'); 
//             } else {
//                  createFilmCardsMarkUp(movies);
//            }
//        }) 
//     }
// }


// function createFilmCardsMarkUp(movieInfo) {
//   refs.gallery.insertAdjacentHTML('beforeend', moviesCard(movieInfo));
// }

// function clearMoviesContainer() {
//     refs.gallery.innerHTML = '';
    
// }








// function onSearch(e) {
//     e.preventDefault()
//     const page = refs.input.value;
//     refs.gallery.innerHTML = '';
//     const searchQuery = e.target.value;

    
//     if(searchQuery.trim() !== '') {
    
//         filmsApiService.fetchDate(page)
//             .then(renderMovieCard)
//             .catch(error => console.log(error))
    
//     }
// }




// function renderMovieCard(name) {
//     if (name.length === 1) {
//         const markup = name[0];
//         refs.gallery.insertAdjacentHTML('beforeend', moviesCard(markup));

//     } else if (name.length > 10) {
//         getInfoMessage('Too many matches found. Please enter a more specific name.');

//     } else if (name.status === 404) {
//         getErrorMessage('Oops, there is no movie with that name');

    

//     } else {
//         refs.gallery.innerHTML = moviesCard(name);
//     }
//         }





// function getInfoMessage(message) {
//     Notiflix.Notify.info(message);
// }

// function getErrorMessage(message) {
//     Notiflix.Notify.failure(message);
// }


