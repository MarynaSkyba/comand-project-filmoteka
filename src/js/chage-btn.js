import templateCard from '../template/tmp-card.hbs';
import QueryService from './query-service';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import '../../node_modules/spin.js/spin.css';
import {target, spinner}  from './spinner.js';
import movieButtons from './overlay-btn';

import Notiflix from 'notiflix';
import getRefs from './refs';
const refs = getRefs();

const queryService = new QueryService();


const options = {
    total_pages: 0,
    itemsPerPage: 20,
    visiblePages: 5,
    page: 1,
    centerAlign: true,
    firstItemClassName: 'tui-first-child',
    lastItemClassName: 'tui-last-child',
    template: {
        page: '<a href="#" class="tui-page-btn">{{page}}</a>',
        currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
        moveButton:
        '<a href="#" class="tui-page-btn tui-{{type}}">' +
            '<span class="tui-ico-{{type}}">{{type}}</span>' +
            '</a>',
            disabledMoveButton:
            '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
            '<span class="tui-ico-{{type}}">{{type}}</span>' +
            '</span>',
            moreButton:
            '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
            '<span class="tui-ico-ellip">...</span>' +
            '</a>'
        }
    };
    
    
    const pagination = new Pagination('#tui-pagination-container', options);
    const page = pagination.getCurrentPage();
    spinner.spin(target);
    
    
refs.libraryBtn.addEventListener('click', changeHeaderLibraryBtn)

function changeHeaderLibraryBtn(){
    refs.menuInput.classList.add('is-hidden');
    refs.menuBtn.classList.remove('is-hidden');
    refs.libraryBtn.classList.add('current');
    refs.homeBtn.classList.remove('current');
    document.getElementById('the_body').classList.add('library-bg');
    refs.watchedBtn.classList.remove('active-btn');
    refs.queueBtn.classList.remove('active-btn');
}

refs.homeBtn.addEventListener('click', changeHeaderHomeBtn)

function changeHeaderHomeBtn(){
    refs.menuInput.classList.remove('is-hidden');
    refs.menuBtn.classList.add('is-hidden');
    refs.libraryBtn.classList.remove('current');
    refs.homeBtn.classList.add('current');
    document.getElementById('the_body').classList.remove('library-bg')


    queryService.fetchDate(page).then(response => {
        clearGallery();
        pagination.reset(response[1].total_pages);
        refs.gallery.classList.remove('picture');
        renderMoveGallery(response);
        const li =  document.querySelectorAll('.gallery-item');
        movieButtons(li, response);
        spinner.stop();
     });
    
    pagination.on('afterMove', (event) => {
        spinner.spin(target);
        const currentPage = event.page;
        clearGallery();
        queryService.fetchDate(currentPage).then(response => {
            renderMoveGallery(response);
    console.log(response)
            const li =  document.querySelectorAll('.gallery-item');
            movieButtons(li, response);
            spinner.stop();
        } )
    });
    
}
  function clearGallery() {
         refs.gallery.innerHTML = '';
    }

 function renderMoveGallery(data) {
        refs.gallery.insertAdjacentHTML('beforeend', templateCard(data));
      
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