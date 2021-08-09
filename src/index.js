import './sass/main.scss';

import './js/watch-queue';
import './js/modal'

import templateCard from './template/tmp-card.hbs';
import getRefs from './js/refs';
import QueryService from './js/query-service.js';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import Notiflix from 'notiflix';
import changeBtn from './js/chage-btn';

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

queryService.fetchDate(page).then(response => {
    console.log(response);
    pagination.reset(response.total_pages);
     renderMoveGallery(response.results);
 });

pagination.on('afterMove', (event) => {
    const currentPage = event.page;

    refs.gallery.innerHTML = '';

    queryService.fetchDate(currentPage).then(response => {
        renderMoveGallery(response.results);
    } )
});

 function renderMoveGallery(data) {
    refs.gallery.insertAdjacentHTML('beforeend', templateCard(data));
}


// queryService.fetchSearch(e).then(response => {
//         renderMoveGallery(response.results);
//     } )

// function query(page) {
//     queryService.fetchDate(page).then((response) => {
//     pagination.reset(response.total_pages);
//      renderMoveGallery(response.results);
//  });
// }


// function clearGallery() {
//      refs.gallery.innerHTML = '';
// }



// const pagination = new Pagination('#tui-pagination-container', options);
// const Page = pagination.getCurrentPage();
// query(Page);

// pagination.on('afterMove', (event) => {
//     console.log(event)
//     const currentPage = event.page;
//     clearGallery();
//     console.log(currentPage);
//     query(currentPage);
// });





//  function renderMoveGallery(data) {
//     refs.gallery.insertAdjacentHTML('beforeend', templateCard(data));
// }


// function query(page) {
//     queryService.fetchDate(page).then((response) => {
//     pagination.reset(response.total_pages);
//      renderMoveGallery(response.results);
//  });
// }


// function clearGallery() {
//      refs.gallery.innerHTML = '';
// }




// changeBtn();




