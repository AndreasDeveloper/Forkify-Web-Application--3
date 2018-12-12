// --- IMPORTING MODELS | PACKAGES --- \\
import axios from 'axios';
import { apikey } from '../config.js';

export default class Search {
    constructor(query) {
        this.query = query;
    }
    // Making AJAX call | - Getting recipes from food2fork | SEARCH
    async getResults() {    // Query will always be in the object once we call getResults method.
        const res = await axios(`https://www.food2fork.com/api/search?key=${apikey}&q=${this.query}`);   // res stands for result
        try {
            this.recipes = res.data.recipes;
            //console.log(this.recipes);   // Displays recipes only (except whole obj)
        } catch (error) {
            console.log(error);
        }
    }
}