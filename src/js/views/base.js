// --- CONTAINS ALL DOM ELEMENTS --- \\
export const elements = {
    searchForm: document.querySelector('.search'),
    searchInput: document.querySelector('.search__field'),
    searchResultList: document.querySelector('.results__list'),
    searchResults: document.querySelector('.results'),
    searchResPages: document.querySelector('.results__pages'),
    recipe: document.querySelector('.recipe'),
    shopping: document.querySelector('.shopping__list'),
    likesMenu: document.querySelector('.likes__field'),
    likesList: document.querySelector('.likes__list'),
    deleteBtnWrapper: document.querySelector('.deleteBtn-wrapper'),
    deleteAllBtn: document.querySelector('.delete-list-btn'),
    addNewItemBtn: document.querySelector('.add-btn'),
    addItemUnit: document.querySelector('.add-item__unit'),
    addItemDescription: document.querySelector('.add-item__description')
};

export const elementStrings = {
    loader: 'loader'    // Class name | connecting with css
};

// --- EXPORTING FUNCTION | - Loader Function --- \\
export const renderLoader = parent => {
    const loader = `
        <div class="${elementStrings.loader}">
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `;
    parent.insertAdjacentHTML('afterbegin', loader);
};

// --- EXPORTING FUNCTION | - Clearing Loader Function --- \\
export const clearLoader = () => {
    const loader = document.querySelector(`.${elementStrings.loader}`);
    if (loader) {
        loader.parentElement.removeChild(loader);
    }
};