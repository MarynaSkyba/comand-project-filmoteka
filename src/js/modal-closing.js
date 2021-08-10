import modalTemplate from '../template/modal-card-about-film.hbs'
const modalDiv=document.getElementById('modal')
const cardFilm = document.querySelector('.gallery');

cardFilm.addEventListener('click', openModal);


  //  отрисовка модального окна Настя можешь взять эту а можешь заливать через шаблон напрямую-тогда я немного сменню логику закрытия
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
   // errorModal();
    console.error('Uuups something go wrong' + error);
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
// Открытие м.о

 function openModal(event) {
  event.preventDefault();
  let data = event.target.dataset.action;
 if (event.target.nodeName !== 'IMG') {
    return
   }
   renderMovieModal(data);
 }


