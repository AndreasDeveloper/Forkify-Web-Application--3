// --- IMPORTING MODELS --- \\
import { elements } from './base';
import { limitRecipeTitle } from './searchView';

// Export Function | Toggle Like Button (Liked and Not liked state)
export const toggleLikeBtn = isLiked => { // isLiked variable, is boolean (true or false)
    const iconString = isLiked ? 'icon-heart' : 'icon-heart-outlined';
    document.querySelector('.recipe__love use').setAttribute('href', `img/icons.svg#${iconString}`);
};

// Export Function | Toggle Like menu if there are liked recipes, otherwise, hide it
export const toggleLikeMenu = numLikes => {
    elements.likesMenu.style.visibility = numLikes > 0 ? 'visible' : 'hidden';
};

// Export Function | Rendering Like List
export const renderLike = like => {
    const markup = `
    <li>
        <a class="likes__link" href="${like.id}">
            <figure class="likes__fig">
                <img src="${like.img}" alt="${like.title}">
            </figure>
            <div class="likes__data">
                <h4 class="likes__name">${limitRecipeTitle(like.title)}</h4>
                <p class="likes__author">${like.author}</p>
            </div>
        </a>
    </li>
    `;
    elements.likesList.insertAdjacentHTML('beforeend', markup);
};

// Export Function | Delete Like
export const deleteLike = id => {
    const el = document.querySelector(`.likes__link[href*="${id}"]`).parentElement; // Select all the links with likes__link class'
    if (el) el.parentElement.removeChild(el);
};