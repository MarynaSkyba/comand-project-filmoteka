import modalTemplate from '../template/modal-card-about-film.hbs'
import getRefs from './refs';
import Notiflix from "notiflix";
const modalDiv=document.getElementById('modal')
const refs = getRefs();

import QueryService from  './query-service';

const modalApiFetch = new QueryService();

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

function openModal(movieId) {
  
  modalApiFetch.fetchById(movieId).then(response => {
      renderMovieModal(response)
      console.log(response.status)
    
  }
  ).catch(error =>
     {if (error = 404) {
      Notiflix.Notify.failure('Sorry this movie temporary not aviable')
     } }
   )

}






