const axios = require('axios').default;
const KEY_USER = '2fa9e4bbaa008ede70ee7a4ceca0d3a2';
const BASE_URL = 'https://api.themoviedb.org/3/';
export default class QueryService{
    constructor() {
        this.time_window = 'day';
        this.media_type = '/all/';
        this.home = 'trending';
        this.searchQuery = '';
        this.page = 1;
         this.id = '';
    }
    
 async fetchDate(page) {
    const url = `${BASE_URL}${this.home}${this.media_type}${this.time_window}?api_key=${KEY_USER}&page=${page}`;
     const response = await axios.get(url);
     return response.data;
    };    
   




 fetchSearch() {
    const url = `${BASE_URL}/search/movie?api_key=${KEY_USER}&language=en-US&page=${this.page}&query=${this.searchQuery}`;
    return fetch(url)
      .then(response => response.json())
      .then(({ results }) => {
        return this.fetchFilmGenre().then(genres => {
          return results.map(result => ({
            ...result,
            release_date: result.release_date
              ? result.release_date.slice(0, 4)
              : result.release_date,
              genres,
          }));
        });
      });
  }





 fetchFilmGenre() {
    const url = `${BASE_URL}/genre/movie/list?api_key=${KEY_USER}&language=en-US`;
    return fetch(url)
      .then(response => response.json())
      .then(({ genres }) => {
        return genres;
      });
    }


    }