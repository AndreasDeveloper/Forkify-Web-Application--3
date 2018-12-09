import { elements } from './base';

// Exporting Function | Getting input from the search bar
export const getInput = () => elements.searchInput.value;   // returning dom element value (that user inputs)

// Exporting Function | Clearing input from the search bar
export const clearInput = () => {
     elements.searchInput.value = '';
};

// Exporting Function | Clearing HTML ul elements from the result bar
export const clearResults = () => {
    elements.searchResultList.innerHTML = '';
};

// Private Function | Reducing the title ti 17 words per ul element | ALGORITHM
const limitRecipeTitle = (title, limit = 17) => { // 17 is limit default
    const newTitle = []; // adding elements to const var arr is not actually mutating it
    if (title.length > limit) {
        title.split(' ').reduce((acc, cur) => { // acc = accumulator, cur = current
            if (acc + cur.length <= limit) {
                newTitle.push(cur);
            }
            return acc + cur.length;
        }, 0); // Initial value is 0
        // Return the result
        return `${newTitle.join(' ')} ...`;    // Opposite of split method. It will join words separated by spaces, making clear sentence again
    } 
    return title;
};


// Private Function | Getting markup ready with API data
const renderRecipe = recipe => { 
    const markup = `    
    <li>
    <a class="results__link" href="#${recipe.recipe_id}">
        <figure class="results__fig">
            <img src="${recipe.image_url}" alt="${recipe.title}">
        </figure>
        <div class="results__data">
            <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
            <p class="results__author">${recipe.publisher}</p>
        </div>
    </a>
    </li>
    `; // Generates markup that will be showing on UI
    elements.searchResultList.insertAdjacentHTML('beforeend', markup);  // Inserting markup to html main file
};

export const renderResults = recipes => {   // recipes is a parameter/arg
    recipes.forEach(renderRecipe);  // loop trough all 30 results and call renderRecipe function for each one of them
};