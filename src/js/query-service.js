const axios = require('axios').default;
const KEY_USER = '2fa9e4bbaa008ede70ee7a4ceca0d3a2';
const BASE_URL = 'https://api.themoviedb.org/3/';
export default class QueryService{
    constructor() {
        this.time_window = 'day';
        this.media_type = '/all/';
        this.home = 'trending';
    }
    
 async fetchDate(page) {
    const url = `${BASE_URL}${this.home}${this.media_type}${this.time_window}?api_key=${KEY_USER}&page=${page}`;
     const response = await axios.get(url);
     return response.data;
    };    
   
}