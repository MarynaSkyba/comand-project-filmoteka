import Notiflix from 'notiflix';
import getRefs from './refs';
const refs = getRefs();

refs.libraryBtn.addEventListener('click', addGallery)


function addGallery(){
    Notiflix.Notify.failure('Sorry, there are no film at your library yet. Want to add some?');

    refs.container.innerHTML = '';
    // refs.container.insertAdjacentHTML('beforeend', templateCard(data));
}

refs.libraryBtn.addEventListener('click', changeHeaderLibraryBtn)

function changeHeaderLibraryBtn(){
    refs.menuInput.classList.add('is-hidden');
    refs.menuBtn.classList.remove('is-hidden');
    refs.libraryBtn.classList.add('current');
    refs.homeBtn.classList.remove('current');
    document.getElementById('the_body').style.backgroundImage = "url('https://cs7.pikabu.ru/post_img/big/2018/06/05/7/15281978511730308.jpg')";
}

refs.homeBtn.addEventListener('click', changeHeaderHomeBtn)

function changeHeaderHomeBtn(){
    refs.menuInput.classList.remove('is-hidden');
    refs.menuBtn.classList.add('is-hidden');
    refs.libraryBtn.classList.remove('current');
    refs.homeBtn.classList.add('current');
}

refs.queueBtn.addEventListener('click', changeColor)

function changeColor(){
    refs.watchedBtn.classList.remove('active-btn');
    refs.queueBtn.classList.add('active-btn');
}

refs.watchedBtn.addEventListener('click', changeColorBack)

function changeColorBack(){
    refs.watchedBtn.classList.add('active-btn');
    refs.queueBtn.classList.remove('active-btn');
}