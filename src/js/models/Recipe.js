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
    parseIngredients() {
        const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds']; // Long name
        const unitShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound']; // Short name
        const units = [...unitShort, 'kg', 'g']; // Using destructuring to insert elements from unitShort array into the units array (without having array inside of an array)

        const newIngredients = this.ingredients.map(el => { // el is EACH element (string) in ingredients data that api provided, mapped trough
            // Uniform units (units should be the same)
            let ingredient = el.toLowerCase(); // Put words to lowercase
            unitsLong.forEach((unit, i) => {
                ingredient = ingredient.replace(unit, unitShort[i]); // Replace unitLong el with unitShort el. Using unit as UNIT (tablespoon etc.) and i as index (position in arr). replace method for replacing unit parameter with unitShort[i]
            });
            // Remove parentheses
            ingredient = ingredient.replace(/ *\([^)]*\) */g, ' '); // Gets rid of parentheses

            // Parse ingredients into count, unit and ingredient itself
            const arrIng = ingredient.split(' '); // if there is a space between the words, each word will become a new element
            const unitIndex = arrIng.findIndex(el2 => units.includes(el2));

            let objIng;
            if (unitIndex > -1) {
                // There is a unit
                // Ex. 4 1/2 cups, arrCount is [4, 1/2] --> eval("4+1/2") eval() function will evaluate this string as JS number and do the math | result is 4.5
                // Ex. 4 cups, arrCount is [4]
                const arrCount = arrIng.slice(0, unitIndex);  // Start from 0 and go until unitIndex string
                let count;
                if (arrCount.length === 1) { // length defines how many els are there before unitIndex
                    count = eval(arrIng[0].replace('-', '+')); // Replace - with + and evalute numbers and do math
                } else {
                    count = eval(arrIng.slice(0, unitIndex).join('+')); // Start slice from pos 0 until unitIndex, join those strings and evaluate them
                }

                objIng = {
                    count: count, // Can be just count
                    unit: arrIng[unitIndex],
                    ingredient: arrIng.slice(unitIndex + 1).join(' ') // Slice starts right after unitIndex and goes to the end, and then joins the string
                };

            } else if (parseInt(arrIng[0], 10)) { // Converts first element in string (if its a string number) and parse/convert it to integer (number with base of 10)
                // There is no unit, but the 1st element is a number
                objIng = {
                    count: parseInt(arrIng[0], 10),
                    unit: '',
                    ingredient: arrIng.slice(1).join(' ') // Start from position 1 (array based) and go until the end of the string. Excluding first position which is parse(argIng[0], 10) case. Put numbers back to strings using Join method
                }
            } else if (unitIndex === -1) {
                // There is no unit and no number in 1st position (1st else if case)
                objIng = {
                    count: 1, // If its empty, shows 1
                    unit: '',
                    ingredient: ingredient // or just ingredient in obj
                }
            }
            return objIng;
        });
        this.ingredients = newIngredients;
    }
    updateServings(type) {
        // Servings
        const newServings = type === 'dec' ? this.servings -1 : this.servings + 1; // newServings will either get this.servings -1 or this.servings +1 value

        // Ingredients
        this.ingredients.forEach(ing => {
            ing.count *= (newServings / this.servings); // multiply ing.count by (parentheses values)
        });
        this.servings = newServings;
    }
};