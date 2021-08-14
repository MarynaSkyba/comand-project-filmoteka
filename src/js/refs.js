export default function getRefs() {
    return {

    gallery : document.querySelector('.gallery'),

    // container : document.querySelector('.film-gallery'),
    watchedBtn: document.getElementById('watched_btn'),
        queueBtn: document.getElementById('queue_btn'),
        trailerBtn: document.getElementById('trailer_btn'),

    homeBtn: document.querySelector('.home_btn'),
    libraryBtn: document.querySelector('.library_btn'),
    searchForm: document.querySelector('.form-field'),

    menuBtn: document.querySelector('.nav-btn'),
        menuInput: document.querySelector('.input-container'),

        lightbox: document.querySelector('.js-lightbox'),
        closeLightboxBtn: document.querySelector('[data-action="close-lightbox"]'),

    }}