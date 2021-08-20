import modalTemplate from '../template/modal-card-about-film.hbs'
import getRefs from './refs';
import Notiflix from "notiflix";
import QueryService from  './query-service';
import moviesCard from '../template/tmp-card.hbs';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import { options } from './pagination';
import movieButtons from './overlay-btn';

const modalDiv=document.getElementById('modal')
const refs = getRefs();
const modalApiFetch = new QueryService();
const tui = document.querySelector('.pagination-thumb')
const pagination = new Pagination('#tui-pagination-container', options);
const page = pagination.getCurrentPage();

let library = [];
let watchedLibrary = [];
let queueLibrary = [];


refs.gallery.addEventListener('click', onPosterDivClick);

  export default function renderMovieModal(data) {
  
    const modalMarkup = modalTemplate(data);
    
    try {

    modalDiv.innerHTML = modalMarkup;
    modalDiv.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    const modalBackdrop = document.querySelector('.modal__backdrop');
    const closeButton = document.querySelector('[data-action="close-modal"]');

    closeButton.addEventListener('click', modalClosing);
    modalBackdrop.addEventListener('click', modalClosing);
    window.addEventListener('keydown', modalClosinByEsc);
  } catch (error) {
      console.error('Oops something go wrong' + error);
  }

}
// Закрытие модалки
function modalClosing() {
  modalDiv.classList.remove('is-open');
  document.body.style.overflow = '';
  window.removeEventListener('keydown', modalClosinByEsc);
  

}

// Закрытие модалки по Escape
function modalClosinByEsc(event) {
  if (event.code === 'Escape') {
    modalClosing();
  }
}

function onPosterDivClick(e) {
  if (e.target.nodeName !== 'IMG') {
    return;
  }
  const activeImg = e.target;
   const movieId = activeImg.dataset.movieId;
  openModal(movieId)
}
// Открытие м.о
let currentMovieW
let currentMovieQ
let queueLS
let watchedLS
function openModal(movieId) {
  try
  {modalApiFetch.fetchByIdModal(movieId).then(response => {
    renderMovieModal(response)
    const watchedBtnM = document.querySelector('.btn__watch')
    const queueBtnM = document.querySelector('.btn__queue')

   currentMovieW = response
    watchedBtnM.addEventListener('click', onWatchedbtnClick)
    currentMovieQ = response
    queueBtnM.addEventListener('click', onQueuebtnClick)
    watchedLS = JSON.parse(localStorage.getItem('watched'))|| []
    queueLS = JSON.parse(localStorage.getItem('queue')) || []
   
    for (const film of watchedLS){
         if (film.title === response.title) {
           watchedBtnM.textContent = 'DELETE FROM WATCHED'
    
           
                   return
        } 
    }
    for (const film of queueLS){
         if (film.title === response.title) {
               queueBtnM.textContent = 'DELETE FROM QUEUE'
                   return
        } 
    }
     
  }
  )}
  catch (error) {
    Notiflix.Notify.failure('Sorry this movie temporary not available')
    console.error(error);
    
  }

}

refs.watchedBtn.addEventListener('click',renderWatchedMarkup)
function renderWatchedMarkup(list) {
  localStorage.setItem('isWatched', JSON.stringify(true));
  localStorage.setItem('isQueue', JSON.stringify(false));
  list = JSON.parse(localStorage.getItem('watched')) || []
  
  if (list.length === 0) {
   
    Notiflix.Notify.failure('Sorry, there are no films at your library yet. Want to add some?');
    refs.gallery.innerHTML = '';
    refs.gallery.classList.add('picture');
    
    tui.classList.add('is-hidden')

    return
  } 
 
  if (tui.classList.contains('is-hidden')) {
    tui.classList.remove('is-hidden');
  }
  
  refs.gallery.innerHTML = ''
  
  refs.gallery.insertAdjacentHTML('beforeend', moviesCard(list))
  refs.gallery.classList.remove('picture');
  const li =  document.querySelectorAll('.gallery-item');
  movieButtons(li, list);
 
  
}
refs.queueBtn.addEventListener('click', renderQueueMarkup)
 
function renderQueueMarkup(list) {
  localStorage.setItem('isQueue', JSON.stringify(true));
  localStorage.setItem('isWatched', JSON.stringify(false));
  list = JSON.parse(localStorage.getItem('queue')) || []

  if (list.length === 0){
 
    tui.classList.add('is-hidden')
    
      Notiflix.Notify.failure('Sorry, there are no films at your queue yet. Want to add some?');
      refs.gallery.innerHTML = '';
      refs.gallery.classList.add('picture');
    
    return

  }

    if (tui.classList.contains('is-hidden')) {
    tui.classList.remove('is-hidden');
  }
  refs.gallery.innerHTML = ''
   pagination.reset();
  refs.gallery.insertAdjacentHTML('beforeend', moviesCard(list))
  const li =  document.querySelectorAll('.gallery-item');
  movieButtons(li, list);
 
 
  refs.gallery.classList.remove('picture');
}

 localStorage.setItem('isLibrary', JSON.stringify(false));



function onWatchedbtnClick() {
   const watchedBtnM = document.querySelector('.btn__watch')
 pagination.reset();
   let watchedStorage = JSON.parse(localStorage.getItem('watched'))|| []
      if (!watchedStorage) {
        watchedStorage = []
  }
  if (watchedBtnM.textContent ==='DELETE FROM WATCHED') {
    const movieToRemove = currentMovieW.id
    deleteMovie('watched', movieToRemove)
     updateWatchedPage()
  
    Notiflix.Notify.success('The movie was successfully deleted from the library');
    watchedBtnM.textContent = 'ADD TO WATCHED'
    pagination.reset(1);
    return
       
  }
  

  queueLS = JSON.parse(localStorage.getItem('queue'))|| []
  for (const film of queueLS ) {
  
         if (film.title === currentMovieW.title) {
         
          Notiflix.Notify.failure('Oops, you already have this movie in queue');
           return
        
      } 
  }
      

      watchedStorage.push(currentMovieW)
      localStorage.setItem('watched', JSON.stringify(watchedStorage))
        Notiflix.Notify.success('The movie was successfully added to the library');
   
  watchedBtnM.textContent = 'DELETE FROM WATCHED'
       watchedLibrary = [...watchedStorage]
             
    
}

function onQueuebtnClick() {
  const queueBtnM = document.querySelector('.btn__queue')

  let queueStorage = JSON.parse(localStorage.getItem('queue'))
      if (!queueStorage) {
       queueStorage = []
  }
  if (queueBtnM.textContent ==='DELETE FROM QUEUE') {
    const movieToRemove = currentMovieQ.id
    deleteMovie('queue', movieToRemove)
    updateQueuePage()
    Notiflix.Notify.success('The movie was successfully deleted from the library');
    queueBtnM.textContent = 'ADD TO QUEUE'

    return
       
  }
    watchedLS = JSON.parse(localStorage.getItem('watched')) || [] 
  for (const film of watchedLS ) {

         if (film.title === currentMovieQ.title) {
                   Notiflix.Notify.failure('Oops, you already have this movie in watched');
           return
          
        
      } 
      }
      
      queueStorage.push(currentMovieQ)
      localStorage.setItem('queue', JSON.stringify(queueStorage))
      Notiflix.Notify.success('The movie was successfully added to the library');
  
      queueBtnM.textContent = 'DELETE FROM QUEUE'
      queueLibrary = [...queueStorage]
      
        
    
}

function deleteMovie(key, id) {
  let containerLS = []
  containerLS=JSON.parse(localStorage.getItem(key))

   const resultFilms = containerLS.filter((item) => item.id !== id);
  localStorage.setItem(key, JSON.stringify(resultFilms));

}
// Library

refs.libraryBtn.addEventListener('click', onLibraryClick)
  
function onLibraryClick() {
pagination.reset(); 
localStorage.setItem('isLibrary', JSON.stringify(true));

  watchedLibrary = JSON.parse(localStorage.getItem('watched')) || []
  queueLibrary = JSON.parse(localStorage.getItem('queue')) || []

if (watchedLibrary.length === 0 && queueLibrary.length === 0){
   Notiflix.Notify.failure('Sorry, there are no films at your library yet. Want to add some?');
    refs.gallery.classList.add('picture');
    refs.gallery.innerHTML = '';
    tui.classList.add('is-hidden');
}  
else {
    library = [...watchedLibrary, ...queueLibrary];
  refs.gallery.innerHTML = '';
  refs.gallery.classList.remove('picture');
  refs.gallery.insertAdjacentHTML('beforeend', moviesCard(library));
  const li =  document.querySelectorAll('.gallery-item');
  movieButtons(li, library);
   
  }
    
  
}


export function updateWatchedPage() {
  if (JSON.parse(localStorage.getItem('isWatched')) === true && JSON.parse(localStorage.getItem('isLibrary')) ===true && JSON.parse(localStorage.getItem('isQueue')) ===false) {
    renderWatchedMarkup()
 
    
  } else
  if (JSON.parse(localStorage.getItem('isLibrary')) === true) {
        updateLibrary()
    
    } 
         
}

export function updateQueuePage() {
  if (JSON.parse(localStorage.getItem('isQueue')) === true && JSON.parse(localStorage.getItem('isLibrary')) ===true && JSON.parse(localStorage.getItem('isWatched')) ===false) {
    renderQueueMarkup()

    } else
  if (JSON.parse(localStorage.getItem('isLibrary')) === true) {
    updateLibrary()
  
    } 
}

function updateLibrary() {
watchedLibrary = JSON.parse(localStorage.getItem('watched')) || []
queueLibrary = JSON.parse(localStorage.getItem('queue')) || []  
library = [...watchedLibrary, ...queueLibrary];
refs.gallery.innerHTML = '';
refs.gallery.insertAdjacentHTML('beforeend', moviesCard(library));

}
