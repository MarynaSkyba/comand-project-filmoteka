const axios = require('axios').default;
export default class QueryService{
    constructor() {
        this.page = 1;
        this.KEY_USER = '2fa9e4bbaa008ede70ee7a4ceca0d3a2';
        this.BASE_URL = 'https://api.themoviedb.org/3/';
        this.time_window = 'day';
        this.media_type = '/all/';
        this.home = 'trending';
    }
    
 async fetchDate() {
    const url = `${this.BASE_URL}${this.home}${this.media_type}${this.time_window}?api_key=${this.KEY_USER}&page=${this.page}`;
     const response = await axios.get(url);
     return response.data;
    };

    incriment() {
        this.page += 1;
    }
     
   
}