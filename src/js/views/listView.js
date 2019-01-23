// --- IMPORTING MODELS --- \\
import { elements } from './base';

// Render Item UI | Function Export
export const renderItem = item => {
    const markup = `
    <li class="shopping__item" data-itemid=${item.id}>
        <div class="shopping__count">
            <input type="number" value="${item.count}" step="${item.count}" class="shopping__count-value">
            <p>${item.unit}</p>
        </div>
        <p class="shopping__description">${item.ingredient}</p>
        <button class="shopping__delete btn-tiny">
            <svg>
                <use href="img/icons.svg#icon-circle-with-cross"></use>
            </svg>
        </button>
    </li>
    `;
    elements.shopping.insertAdjacentHTML('beforeend', markup); // beforeend - one el is added after the other in HTML
};

// Render Custom added items to the shopping list | Function Export
export const renderAddedInput = itemI => {
    const markup3 = `
    <li class="shopping__item" data-itemid=${itemI.id}>
        <div class="shopping__count">
            <input type="number" value="${itemI.count}" step="${itemI.count}" class="shopping__count-value">
            <p>${itemI.unit}</p>
        </div>
        <p class="shopping__description">${itemI.ingredient}</p>
        <button class="shopping__delete btn-tiny">
            <svg>
                <use href="img/icons.svg#icon-circle-with-cross"></use>
            </svg>
        </button>
    </li> 
    `;
    elements.shopping.insertAdjacentHTML('afterbegin', markup3);
};

// Rendering Delete All Button | Function Export
export const renderDeleteBtn = () => {
    const markup2 = `
    <button class="btn-small recipe__btn delete-list-btn" style="margin-top: 5rem;">
        <span>Delete All</span>
    </button>
    `;
    elements.deleteBtnWrapper.insertAdjacentHTML('afterbegin', markup2);
};

// Delete Item UI | Function Export
export const deleteItem = id => {
    const item = document.querySelector(`[data-itemid="${id}"]`);
    item.parentElement.removeChild(item);
};

// Delete all of the items inside of a ul on UI | Function Export
export const deleteItems = () => {
    const items = document.querySelector('.shopping__list');
    items.innerHTML = ''; 
}