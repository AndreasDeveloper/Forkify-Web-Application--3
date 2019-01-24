/*
import str from './modules/Search'; // FIRST WAY OF IMPORTING
import { add as a, multiply, ID } from './views/searchView'; // SECOND WAY OF IMPORTING
import * as searchView from  './views/searchView'   // THIRD WAY OF IMPORTING | Importing everything from directory

//console.log(`Using imported functions! ${a(ID, 2)} and ${multiply(3, 5)}. ${str}.`);  // SECOND WAY OF USING IMPORTS
console.log(`Using imported functions! ${searchView.add(searchView.ID, 2)} and ${searchView.multiply(3, 5)}. ${str}.`);    // THIRD WAY OF USING IMPORTS
*/

// --- IMPORTING MODELS --- \\
import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Likes';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likesView from './views/likesView';
import { elements, renderLoader, clearLoader, elementStrings } from './views/base';

// Global State of the app 
// - search object
// - current recipe object
// - shopping list object
// - liked recipes
const state = {}; // Global state obj

// --------------------------------------------
//  SEARCH FUNCTION | ARCHITECTURE | CONTROLLER
// --------------------------------------------
// FUNCTION | - Search Function | SEARCH CONTROLLER
const controlSearch = async () => {
    // Get a query from the view
    const query = searchView.getInput(); // Getting input from search bar and seraching exact elements

    if (query) {
        // New Search object and add to the state
        state.search = new Search(query);
        
        // Prepare UI for results | pre-loader
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchResults); // elements.searchResult is a parent element for the loader

        try {
            // Search for recipes
            await state.search.getResults(); 

            // Render results on UI
            clearLoader();
            searchView.renderResults(state.search.recipes);
        } catch (error) {
            console.log(error);
            clearLoader();
        }
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

// --------------------------------------------
//  RECIPE FUNCTION | ARCHITECTURE | CONTROLLER
// --------------------------------------------
// FUNCTION | - Recipe Function | RECIPE CONTROLLER
const controlRecipe = async () => {
    // Get ID from url
    const id = window.location.hash.replace('#', ''); // Getting hash from url window (#NUMBERS)

    if (id) { // If id is showing in url/on window
        // Prepare UI for changes
        recipeView.clearRecipe();
        renderLoader(elements.recipe); // elements.recipe is a parent element for the loader

        // Higlight selected search item
        if (state.search) searchView.higlightSelected(id);

        // Create new recipe object
        state.recipe = new Recipe(id);

        try {
            // Get recipe data and parse ingredients
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();
            
            // Calculate time and servings
            state.recipe.calcTime();
            state.recipe.calcServings();
            
            // Render recipe
            clearLoader();
            recipeView.renderRecipe(state.recipe, state.likes.isLiked(id));

        } catch (error) {
            console.log(error);
        }
    }
};

// 2 EVENT LISTENERS | Changing the hash (URL HASH) and adding loader
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

// --------------------------------------------
//  LIST FUNCTION | ARCHITECTURE | CONTROLLER
// --------------------------------------------
const controlList = () => {
    // Create a new list if there is none yet
    if (!state.list) state.list = new List();
    
    // Add each ingredient to the list and UI
    state.recipe.ingredients.forEach(el => {
        const item = state.list.addItem(el.count, el.unit, el.ingredient); // Give each list item an unique id
        listView.renderItem(item);
    });
    // Rendering Delete All Items in list button after items were added to the list
    if (!elements.deleteBtnWrapper.firstElementChild) { // Checks if button is present
        listView.renderDeleteBtn();
    } 
};

// EVENT LISTENER | Restore list items from localStorage
window.addEventListener('load', () => {
    state.list = new List();
    // Restore list of items
    state.list.readStorage2();
    // Render the existing list items
    state.list.items.forEach(item => listView.renderItem(item));
    if (localStorage.getItem('list') === null || localStorage.getItem('list') === '[]') {
        return null;
    } else {
        if (!elements.deleteBtnWrapper.firstElementChild) { // Checks if button is present
            listView.renderDeleteBtn();
        } 
    }
});

// Event Listener | Add Custom Item
elements.addNewItemBtn.addEventListener('click', () => {
    if (!state.list) state.list = new List();
        // Checks if input fields are not empty
        if (elements.addItemUnit.value === '' || elements.addItemDescription.value === '') {
            return console.log('Error');
        } else {
            const itemI = state.list.addItem(0, elements.addItemUnit.value, elements.addItemDescription.value);
            listView.renderAddedInput(itemI);
            elements.addItemUnit.value = '';
            elements.addItemDescription.value = '';

            // Checks if button is present
            if (!elements.deleteBtnWrapper.firstElementChild) {
                listView.renderDeleteBtn();
            } 
        }
    // Rendering Delete All Items in list button after items were added to the list
    //listView.renderDeleteBtn();
}); 

// EVENT LISTENER | Handle delete and update list item events
elements.shopping.addEventListener('click', e => {
    const id = e.target.closest('.shopping__item').dataset.itemid;

    // Handle the delete button
    if (e.target.matches('.shopping__delete, .shopping__delete *')) {
        // Delete from the state
        state.list.deleteItem(id);

        // Delete from the UI
        listView.deleteItem(id);
    // Handle the count update
    } else if (e.target.matches('.shopping__count-value')) { // No need of selecting its children, there is none
        const val = parseFloat(e.target.value);
        state.list.updateCount(id, val);
    }
}); 

// EVENT LISTENER | Deletes all of the items inside of a list
elements.deleteBtnWrapper.addEventListener('click', event => {
    if (event.target.classList.contains('delete-list-btn')) {
        localStorage.removeItem('list'); // Removes the list from local storage
        listView.deleteItems();
        // Deletes button when items are deleted
        while (elements.deleteBtnWrapper.firstChild) {
            elements.deleteBtnWrapper.removeChild(elements.deleteBtnWrapper.firstChild);
        }
    }
});

// --------------------------------------------
//  LIKES FUNCTION | ARCHITECTURE | CONTROLLER
// --------------------------------------------
const controlLike = () => {
    if (!state.likes) state.likes = new Likes(); // If there is nothing in state.likes, create new Likes obj.

    const currentID = state.recipe.id;
    if (!state.likes.isLiked(currentID)) { // User has not yet liked current recipe
        // Add like to the state
        const newLike = state.likes.addLike(currentID, state.recipe.title, state.recipe.author, state.recipe.img); // Arguments!
        // Toggle the like button (full hearth if liked, empty hearth if not)
        likesView.toggleLikeBtn(true);
        // Add like to UI list
        likesView.renderLike(newLike);
    } else { // User has liked current recipe    
        // Remove like from the state
        state.likes.deleteLike(currentID);
        // Toggle the like button (-||-)
        likesView.toggleLikeBtn(false);
        // Remove like from UI
        likesView.deleteLike(currentID);
    }
    likesView.toggleLikeMenu(state.likes.getNumLikes());
};

// EVENT LISTENER | Restore liked recipes on page load
window.addEventListener('load', () => {
    state.likes = new Likes();
    // Restore likes
    state.likes.readStorage();
    // Toggle like menu button (if there are likes, display menu button)
    likesView.toggleLikeMenu(state.likes.getNumLikes());
    // Render the existing likes
    state.likes.likes.forEach(like => likesView.renderLike(like));
});


// --------------------------------------------
//  GLOBAL|MULTI EVENT LISTENER
// --------------------------------------------
// EVENT LISTENER | Handling recipe button clicks (servings, likes)
elements.recipe.addEventListener('click', e => {
    if (e.target.matches('.btn-decrease, .btn-decrease *')) { // Selecting any btn-decrease child (if clicking svg or use elements in html instead of button directly)
        // Decrease button is clicked
        if (state.recipe.servings > 1) {
            state.recipe.updateServings('dec');
            recipeView.updateServingsIngredients(state.recipe);
        }
    } else if (e.target.matches('.btn-increase, .btn-increase *')) {
        // Increase button is clicked
        state.recipe.updateServings('inc');
        recipeView.updateServingsIngredients(state.recipe);
    } else if (e.target.matches('.recipe__btn, .recipe__btn--add *')) {
        controlList();
    } else if (e.target.matches('.recipe__love, recipe__love *')) {
        // Like Controller
        controlLike();
    }
});