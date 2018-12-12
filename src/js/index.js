/*
import str from './modules/Search'; // FIRST WAY OF IMPORTING
import { add as a, multiply, ID } from './views/searchView'; // SECOND WAY OF IMPORTING
import * as searchView from  './views/searchView'   // THIRD WAY OF IMPORTING | Importing everything from directory

//console.log(`Using imported functions! ${a(ID, 2)} and ${multiply(3, 5)}. ${str}.`);  // SECOND WAY OF USING IMPORTS
console.log(`Using imported functions! ${searchView.add(searchView.ID, 2)} and ${searchView.multiply(3, 5)}. ${str}.`);    // THIRD WAY OF USING IMPORTS
*/

// --- IMPORTING MODELS --- \\
import Search from './models/Search';
import * as searchView from './views/searchView';
import { elements, renderLoader, clearLoader } from './views/base';

// Global State of the app 
// - search object
// - current recipe object
// - shopping list object
// - liked recipes
const state = {};

// FUNCTION | - Search Function
const controlSearch = async () => {
    // Get a query from the view
    const query = searchView.getInput(); // Getting input from search bar and seraching exact elements

    if (query) {
        // New Search object and add to the state
        state.search = new Search(query);

        // Prepare UI for results | pre-loader
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchResults);

        // Search for recipes
        await state.search.getResults(); 

        // Render results on UI
        clearLoader();
        searchView.renderResults(state.search.recipes);
    }
}

// -- EVENT LISTENER -- | Search Form
elements.searchForm.addEventListener('submit', e => {
    e.preventDefault(); // Prevents page from reloading each time when we click element(e)
    controlSearch();
});

// -- EVENT LISTENER -- | Button Pagination | Next and Prev
elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline'); // Find the closest element to the button inline
    if (btn) { // if we have a button showing
        const goToPage = parseInt(btn.dataset.goto, 10); // accessing button data (page num in this case) | 10 is a base (0 - 9), if we insert 2, we are using binary base (0,1)
        searchView.clearResults();
        searchView.renderResults(state.search.recipes, goToPage);
    }
});