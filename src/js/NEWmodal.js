import modalTemplate from '../template/modal-card-about-film.hbs'
import getRefs from './refs';
import Notiflix from "notiflix";
import QueryService from  './query-service';
import moviesCard from '../template/tmp-card.hbs';
const modalDiv=document.getElementById('modal')
const refs = getRefs();
const modalApiFetch = new QueryService();
const tui = document.querySelector('.pagination-thumb')


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

    const closeButton = document.querySelector('[data-action="close-modal"]');

      closeButton.addEventListener('click', modalClosing);
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
function openModal(movieId) {
  
  modalApiFetch.fetchByIdModal(movieId).then(response => {
    renderMovieModal(response)
    const watchedBtnM = document.querySelector('.btn__watch')
    const queueBtnM = document.querySelector('.btn__queue')

    const trailerBtn = document.querySelector('.btn__trailer');
watchedBtnM.addEventListener('click', () => {
      currentMovieW = response
         let watchedStorage = JSON.parse(localStorage.getItem('watched'))
      if (!watchedStorage) {
        watchedStorage = []
      }
       for (const film of watchedLibrary){
         if (film.title === response.title) {
          //  watchedBtnM.disabled = true
           watchedBtnM.textContent = 'DELETE FROM WATCHED'
          Notiflix.Notify.failure('Oops, you already have this movie in watched');
           console.log(watchedLibrary)
           return
        
      } 
      }
      for (const film of queueLibrary){
         if (film.title === currentMovieW.title) {
          //  watchedBtnM.disabled = true
          //  watchedBtnM.textContent = 'DELETE FROM QUEUE'
          Notiflix.Notify.failure('Oops, you already have this movie in queue');
           return
        
      } 
      }
      
      watchedStorage.push(response)
      localStorage.setItem('watched', JSON.stringify(watchedStorage))
        Notiflix.Notify.success('The movie was successfully added to the library');
     watchedBtnM.disabled = true
           watchedBtnM.textContent = 'DELETE FROM WATCHED'
      watchedLibrary = [...watchedStorage]
       console.log(watchedLibrary)
        
    })
    
    queueBtnM.addEventListener('click', () => {
      currentMovieQ = response
         
      let queueStorage = JSON.parse(localStorage.getItem('queue'))
      if (!queueStorage) {
       queueStorage = []
      }
       for (const film of queueLibrary){
         if (film.title === response.title) {
           queueBtnM.textContent = 'DELETE FROM QUEUE'
          Notiflix.Notify.failure('Oops, you already have this movie in queue');
           return
        
      } 
      }
      for (const film of watchedLibrary){
         if (film.title === currentMovieQ.title) {
          // 
          //  queueBtnM.textContent = 'DELETE FROM WATCHED'
          Notiflix.Notify.failure('Oops, you already have this movie in watched');
           return
        
      } 
      }
      
      queueStorage.push(response)
      localStorage.setItem('queue', JSON.stringify(queueStorage))
        Notiflix.Notify.success('The movie was successfully added to the library');
     queueBtnM.disabled = true
           queueBtnM.textContent = 'DELETE FROM QUEUE'
      queueLibrary = [...queueStorage]
      
        
    })
   

    
    trailerBtn.addEventListener('click', openLightbox);

    function openLightbox() {
      refs.lightbox.classList.add('is-open');     
    }

    refs.closeLightboxBtn.addEventListener('click', onCloseLightbox);
    function onCloseLightbox() {
      refs.lightbox.classList.remove('is-open');
    }    
  }
  )
  .catch (error =>
  {
    if (error = 404) {
      Notiflix.Notify.failure('Sorry this movie temporary not available')
     } }
   )

}

refs.watchedBtn.addEventListener('click',renderWatchedMarkup)
function renderWatchedMarkup(list) {
  list = JSON.parse(localStorage.getItem('watched')) || []
   
  if (list.length === 0) {
   
    Notiflix.Notify.failure('Sorry, there are no films at your library yet. Want to add some?');
    refs.gallery.innerHTML = '';
    refs.gallery.classList.add('picture');
    
    tui.classList.add('is-hidden')
    return
  } 
 
   
  refs.gallery.innerHTML = ''
  
  refs.gallery.insertAdjacentHTML('beforeend', moviesCard(list))
   refs.gallery.classList.remove('picture');
    // refs.queueBtn.disabled = false
  
}
 refs.queueBtn.addEventListener('click',renderQueueMarkup)
function renderQueueMarkup(list) {

  list = JSON.parse(localStorage.getItem('queue')) || []
  if (list.length === 0){
  
      Notiflix.Notify.failure('Sorry, there are no films at your queue yet. Want to add some?');
      refs.gallery.innerHTML = '';
      refs.gallery.classList.add('picture');
    tui.classList.add('is-hidden')
    return

  }
 
  refs.gallery.innerHTML = ''
  
  refs.gallery.insertAdjacentHTML('beforeend', moviesCard(list))
   refs.gallery.classList.remove('picture');
}


// Library

refs.libraryBtn.addEventListener('click', onLibraryClick)
  
function onLibraryClick() {
  watchedLibrary = JSON.parse(localStorage.getItem('watched')) || []
  queueLibrary = JSON.parse(localStorage.getItem('queue')) || []
  
if (watchedLibrary.length === 0 && queueLibrary.length === 0){
 
    Notiflix.Notify.failure('Sorry, there are no films at your library yet. Want to add some?');
    refs.gallery.classList.add('picture');
    refs.gallery.innerHTML = '';
    tui.classList.add('is-hidden')
  } else {
    library = [...watchedLibrary, ...queueLibrary];
  refs.gallery.innerHTML = '';
     refs.gallery.classList.remove('picture');
refs.gallery.insertAdjacentHTML('beforeend', moviesCard(library));
  tui.classList.add('is-hidden')

  }
}