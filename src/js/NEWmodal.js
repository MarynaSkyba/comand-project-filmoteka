import modalTemplate from '../template/modal-card-about-film.hbs'
import getRefs from './refs';
import Notiflix from "notiflix";
import QueryService from  './query-service';
const modalDiv=document.getElementById('modal')
const refs = getRefs();
const modalApiFetch = new QueryService();
import moviesCard from '../template/tmp-card.hbs';


let library = []
let watchedLibrary = []
let queueLibrary = []


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
  
  modalApiFetch.fetchById(movieId).then(response => {
    renderMovieModal(response)
    const watchedBtnM = document.querySelector('.btn__watch')
    const queueBtnM = document.querySelector('.btn__queue')
    const trailerBtn = document.querySelector('.btn__trailer');
    watchedBtnM.addEventListener('click', () => {
      currentMovieW = response
      localStorage.setItem('watched', JSON.stringify(response))
      const watched = JSON.parse(localStorage.getItem('watched'))
      if (watchedLibrary.find(e => e.title === response.title)) {
        Notiflix.Notify.failure('Oops, you already have this movie in watched');
        watchedBtnM.disabled = true
    
        return
      } else if (queueLibrary.find(e => e.title === currentMovieW.title)) {
        Notiflix.Notify.failure('Oops, you already have this movie in your library');
        queueBtnM.disabled = true
        return
      }
     
      watchedLibrary.push(watched)
      Notiflix.Notify.success('The movie was successfully added to the library');
      
    })
    queueBtnM.addEventListener('click', () => {
      currentMovieQ = response
      localStorage.setItem('queue', JSON.stringify(response))
      const queue = JSON.parse(localStorage.getItem('queue'))
      if (queueLibrary.find(e => e.title === response.title)) {
        Notiflix.Notify.failure('Oops, you already put this movie in queue');
        queueBtnM.disabled = true
    
        return
      } else if (watchedLibrary.find(e => e.title === currentMovieQ.title)) {
        Notiflix.Notify.failure('Oops, you already have this movie in your library');
        watchedBtnM.disabled = true
        return
      }
      
      queueLibrary.push(queue)
      Notiflix.Notify.success('The movie was successfully added to the library');

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

  list = [...watchedLibrary]
  if (list.find(e => e.title === currentMovieW.title)) {
    refs.watchedBtn.disabled = true
    
  }
  
  refs.gallery.innerHTML=''
  refs.gallery.insertAdjacentHTML('beforeend', moviesCard(list))
  refs.queueBtn.disabled = false
}
 
refs.queueBtn.addEventListener('click',renderQueueMarkup)
function renderQueueMarkup(list) {
  list = [...queueLibrary]
  if (list.find(e => e.title === currentMovieQ.title)) {
    refs.queueBtn.disabled = true
   
   
  }
  refs.gallery.innerHTML=''
  refs.gallery.insertAdjacentHTML('beforeend', moviesCard(list))
  refs.watchedBtn.disabled = false
}

// Library

refs.libraryBtn.addEventListener('click', () => {
  
  library = [...watchedLibrary, ...queueLibrary]
  refs.gallery.innerHTML = '';
  refs.gallery.insertAdjacentHTML('beforeend', moviesCard(library))
})










