
import Notiflix from 'notiflix';
import getRefs from './refs';
const refs = getRefs();

refs.libraryBtn.addEventListener('click', addGallery)


function addGallery(){
    if (refs.container.innerHTML = ''){
        Notiflix.Notify.failure('Sorry, there are no film matching your search query. Please try again.');
    }
    else 
    refs.container.innerHTML = '';
    refs.container.insertAdjacentHTML('beforeend', templateCard(data));
}