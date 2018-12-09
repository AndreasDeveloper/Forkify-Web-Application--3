// --- IMPORTING MODELS | PACKAGES --- \\
import axios from 'axios';

export default class Search {
    constructor(query) {
        this.query = query;
    }
    // Making AJAX call | - Getting recipes from food2fork | SEARCH
    async getResults() {    // Query will always be in the object once we call getResults method.
        const apikey = '1a3554833bfedb915df1c4a71f61bb53';
        const res = await axios(`https://www.food2fork.com/api/search?key=${apikey}&q=${this.query}`);   // res stands for result
        try {
            this.recipes = res.data.recipes;
            //console.log(this.recipes);   // Displays recipes only (except whole obj)
        } catch (error) {
            console.log(error);
        }
    }
}