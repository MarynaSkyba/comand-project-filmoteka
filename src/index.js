import './sass/main.scss';
import templateCard from './template/tmp-card.hbs';
import getRefs from './js/refs';
import QueryService from './js/query-service.js';
const refs = getRefs();
const queryService = new QueryService();

queryService.fetchDate().then((response) => {
    console.log(response);
     renderMoveGallery(response.results);
 });
    
 
 function renderMoveGallery(data) {
    refs.container.insertAdjacentHTML('beforeend', templateCard(data));

}

