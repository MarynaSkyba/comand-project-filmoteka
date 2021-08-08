import modalTemplate from '../template/modal-card-about-film.hbs'
import cards from '../template/tmp-card.hbs'
const modalDiv = document.getElementById('modal');
const pictureDiva=document.querySelector('.photo-card"')

  //  отрисовка модального окна 
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
    errorModal();
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

