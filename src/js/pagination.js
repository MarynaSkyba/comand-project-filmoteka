import getRefs from './refs';
import templateCard from '../template/tmp-card.hbs';
import QueryService from './query-service';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import '../../node_modules/spin.js/spin.css';
import {target, spinner}  from './spinner.js'
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
queryService.fetchDate(page).then(response => {
    console.log(response);
    pagination.reset(response.total_pages);
    renderMoveGallery(response.results);
    spinner.stop();
 });

pagination.on('afterMove', (event) => {
    spinner.spin(target);
    const currentPage = event.page;
    clearGallery();
    queryService.fetchDate(currentPage).then(response => {
        renderMoveGallery(response.results);
        spinner.stop();
    } )
});

 function renderMoveGallery(data) {
    refs.gallery.insertAdjacentHTML('beforeend', templateCard(data));
}

function clearGallery() {
     refs.gallery.innerHTML = '';
}
