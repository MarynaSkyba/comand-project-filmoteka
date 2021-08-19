import Notiflix from "notiflix";


export default function movieButtons(li, response) {

  
    for (let index = 0; index < li.length; ++index) {
      let el = li[index];
      let movie = response[index];
    

      el.addEventListener("mouseenter", (e) => {
        let watchedInLocalstorage = JSON.parse(localStorage.getItem("watched"));
        let queueInLocalstorage = JSON.parse(localStorage.getItem("queue"));      
        let watchedBtnText;
        let queueBtnText;
    
     
        if (checkFilm(watchedInLocalstorage, movie)) {
            watchedBtnText = "delete from Watched";

          } else if (!checkFilm(watchedInLocalstorage, movie)) {
            watchedBtnText = "add to Watched";
          } 
    
          if (checkFilm(queueInLocalstorage, movie)) {
            queueBtnText = "delete from queue";
          } else if (!checkFilm(queueInLocalstorage, movie)) {
            queueBtnText = "add to queue";
          }            

        e.target.insertAdjacentHTML(
          "afterBegin",
          `<div class="film-overlay"><button class="button watched-button button-anactive li-btn-js-watched">${watchedBtnText}</button>
                <button class="button queue-button button-anactive li-btn-js-queue">${queueBtnText}</button></div>`,
        );
  
        const overlayBtnQueue = document.querySelector(".li-btn-js-queue");
        const overlayBtnWatched = document.querySelector(".li-btn-js-watched");
      
        overlayBtnWatched.addEventListener("click", overlayWatchedHandler(movie, overlayBtnWatched, overlayBtnQueue),);
        overlayBtnQueue.addEventListener("click", overlayQueueHandler(movie, overlayBtnWatched, overlayBtnQueue),);

      });

      el.addEventListener("mouseleave", () => {
        const overlay = document.querySelector(".film-overlay");
        if (overlay) {
          overlay.remove();
        }
      });
  
     

      }
    }
  

  export function checkFilm(filmArr, film) {
    if (!filmArr) return false;
    
    return filmArr.some((item) => item.id === film.id)
    
  }

function overlayWatchedHandler(data, watchBtn, queueBtn) {
    return function () {
        watchedHandler(data, watchBtn)();
      
  
      let queueInLocalstorage = JSON.parse(localStorage.getItem("queue"));
      if (!queueInLocalstorage) queueInLocalstorage = [];
  
      if (checkFilm(queueInLocalstorage, data)) {
          queueBtn.textContent = "remove from queue";
      } else {
          queueBtn.textContent = "add to queue";
        } 
      }
    }
  

function overlayQueueHandler(response, watchBtn, queueBtn) {
    return function () {
      queueHandler(response, queueBtn)();
  
  
      let watchedInLocalstorage = JSON.parse(localStorage.getItem("watched"));
      if (!watchedInLocalstorage) watchedInLocalstorage = [];
  
      if (checkFilm(watchedInLocalstorage, response)) {
          watchBtn.textContent = "remove from watched";
        } else

          watchBtn.textContent = "add to watched";

    };
  }

  export function watchedHandler(data, btn) {
    return function () {
    
      let watchedInLocalstorage = JSON.parse(localStorage.getItem("watched"));
      if (!watchedInLocalstorage) watchedInLocalstorage = [];
  
      if (!checkFilm(watchedInLocalstorage, data)) {
        watchedInLocalstorage.push(data);
        btn.textContent = "remove from Watched";
        localStorage.setItem("watched", JSON.stringify(watchedInLocalstorage));
        Notiflix.Notify.success('The movie was successfully added to the library');
  
        let queueInLocalstorage = JSON.parse(localStorage.getItem("queue"));
        if (!queueInLocalstorage) queueInLocalstorage = [];
  
        if (checkFilm(queueInLocalstorage, data)) {
          queueInLocalstorage.forEach((movie) => {
            if (movie.id === data.id) {
              queueInLocalstorage.splice(queueInLocalstorage.indexOf(movie), 1);
            }
          });
          localStorage.setItem("queue", JSON.stringify(queueInLocalstorage));
        }
      } else {
        watchedInLocalstorage.forEach((movie) => {
          if (movie.id === data.id) {
            watchedInLocalstorage.splice(watchedInLocalstorage.indexOf(movie), 1);
          }
        });
        btn.textContent = "add to Watched";
        localStorage.setItem("watched", JSON.stringify(watchedInLocalstorage));
        Notiflix.Notify.success('The movie was successfully deleted from the library');
      }
    };
  }

  
  
  

  export function queueHandler(data, btn) {
    return function () {
  
      let queueInLocalstorage = JSON.parse(localStorage.getItem("queue"));
      
      if (!queueInLocalstorage) queueInLocalstorage = [];
  
      if (!checkFilm(queueInLocalstorage, data)) {
        queueInLocalstorage.push(data);
        btn.textContent = "delete from queue";
        localStorage.setItem("queue", JSON.stringify(queueInLocalstorage));
        Notiflix.Notify.success('The movie was successfully added to the library');
  
        let watchedInLocalstorage = JSON.parse(localStorage.getItem("watched"));
        if (!watchedInLocalstorage) watchedInLocalstorage = [];
  
        if (checkFilm(watchedInLocalstorage, data)) {
          watchedInLocalstorage.forEach((movie) => {
            if (movie.id === data.id) {
              watchedInLocalstorage.splice(watchedInLocalstorage.indexOf(movie), 1);
            }
          });
          localStorage.setItem("watched", JSON.stringify(watchedInLocalstorage));
        }
      } else {
        queueInLocalstorage.forEach((movie) => {
          if (movie.id === data.id) {
            queueInLocalstorage.splice(queueInLocalstorage.indexOf(movie), 1);
          }
        });
          btn.textContent = "add to queue";
          localStorage.setItem("queue", JSON.stringify(queueInLocalstorage));
          Notiflix.Notify.success('The movie was successfully deleted from the library');
      }
    };
  }


