// --- IMPORTING MODELS | PACKAGES --- \\
import axios from 'axios';
import { apikey } from '../config.js';

export default class Recipe {
    constructor(id) {
        this.id = id;
    }
    // Making AJAX call | - Getting recipes from food2fork | Recipe Info
    async getRecipe() {
        try {
            const res = await axios(`https://www.food2fork.com/api/get?key=${apikey}&rId=${this.id}`);   // res stands for result
            this.title = res.data.recipe.title; // navigating it to the recipe title
            this.author = res.data.recipe.publisher;
            this.img = res.data.recipe.image_url;
            this.url = res.data.recipe.source_url;
            this.ingredients = res.data.recipe.ingredients;
        } catch (error) {
            console.log(error);
        }
    }
    calcTime() {
        // Assuming that we need 15 for each 3 ingredients
        const numIng = this.ingredients.length;
        const periods = Math.ceil(numIng / 3);
        this.time = periods * 15;
    }
    calcServings() {
        this.servings = 4;
    }
};