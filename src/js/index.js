/*
import str from './modules/Search'; // FIRST WAY OF IMPORTING
import { add as a, multiply, ID } from './views/searchView'; // SECOND WAY OF IMPORTING
import * as searchView from  './views/searchView'   // THIRD WAY OF IMPORTING | Importing everything from directory

//console.log(`Using imported functions! ${a(ID, 2)} and ${multiply(3, 5)}. ${str}.`);  // SECOND WAY OF USING IMPORTS
console.log(`Using imported functions! ${searchView.add(searchView.ID, 2)} and ${searchView.multiply(3, 5)}. ${str}.`);    // THIRD WAY OF USING IMPORTS
*/


// --- IMPORTING MODELS --- \\
import Search from './models/Search';

// Global State of the app 
// - search object
// - current recipe object
// - shopping list object
// - liked recipes
const state = {};

// FUNCTION
const controlSearch = async () => {
    // Get a query from the view
    const query = 'pizza' // TODO

    if (query) {
        // New Search object and add to the state
        state.search = new Search(query);

        // Prepare UI for results

        // Search for recipes
        await state.search.getResults(); 

        // Render results on UI
        console.log(state.search.recipes);
    }
}


// -- EVENT LISTENER -- | Search Form
document.querySelector('.search').addEventListener('submit', e => {
    e.preventDefault(); // Prevents page from reloading each time when we click element(e)
    controlSearch();
});