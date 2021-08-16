import getRefs from './refs';
const refs = getRefs();

const KEY_USER = '2fa9e4bbaa008ede70ee7a4ceca0d3a2';
const BASE_URL = 'https://api.themoviedb.org/3/';

function generateUrl(path) {
    const url = `${BASE_URL}${path}?api_key=${KEY_USER}`;
    return url;
}

function createIframe(video) {
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${video.key}`;
    iframe.allowFullscreen = true;

    return iframe;
}

// function createVideoTemplate(data) {
//     const video = data.results[0];
//     const iframeContainer = document.querySelector('.lightbox__content');
    
//     // const iframeContainer = '';
//     const iframe = createIframe(video);
//     iframeContainer.appendChild(iframe);
// }

document.addEventListener('click', openLightbox)

function openLightbox(event) {
    const target = event.target;

    if (target.tagName.toLowerCase() === 'img') {
        const movieID = target.dataset.movieId;
        // console.log(movieID);

        const path = `/movie/${movieID}/videos`;
        const url = generateUrl(path);

        fetch(url)
            .then((res) => res.json())
            .then((data) => {                
                // console.log(data);
                const video = data.results[0];  
                const iframeContainer = document.querySelector('.lightbox__content');
                // const iframeContainer = '';
                const iframe = createIframe(video);
                iframeContainer.innerHTML = '';
                iframeContainer.appendChild(iframe);       
            }
            )
            .catch((error) => {
            console.log(error);
        })
    }

    if (target.classList.contains('btn__trailer')) {
        refs.lightbox.classList.add('is-open'); 
    }          
}
    
// Закрытие модального окна 
refs.closeLightboxBtn.addEventListener('click', onCloseLightbox);
    
function onCloseLightbox() {
    refs.lightbox.classList.remove('is-open');
    window.removeEventListener('keydown', onEscKeyPress);
    
}
//по нажатию клавиши ESC

function onEscKeyPress(evt) {
    if (evt.code === 'Escape') {
     onCloseLightbox();   
    }    
}

//по клику на div.lightbox__overlay.
refs.lightbox.addEventListener('click', clickOnLightbox);

function clickOnLightbox(evt) {
  if (evt.target !== refs.lightboxImage) {
        onCloseLightbox();
    }    
}



