
import getRefs from './refs';
const refs = getRefs();

refs.libraryBtn.addEventListener('click', changeHeaderLibraryBtn)

function changeHeaderLibraryBtn(){
    refs.menuInput.classList.add('is-hidden');
    refs.menuBtn.classList.remove('is-hidden');
    refs.libraryBtn.classList.add('current');
    refs.homeBtn.classList.remove('current');
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