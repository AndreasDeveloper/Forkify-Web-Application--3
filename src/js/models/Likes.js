// Export Class | Class that holds like system
export default class Likes {
    constructor() {
        this.likes = [];
    }

    // Add Like Method
    addLike(id, title, author, img) {
        const like = { id, title, author, img };
        this.likes.push(like);

        // Persist data in localStorage
        this.persistData();

        return like;
    }
    // Delete Like Method
    deleteLike(id) {
        const index = this.likes.findIndex(el => el.id === id);
        this.likes.splice(index, 1); 

        // Persist data in localStorage
        this.persistData();
    }
    // Check and displays in UI if recipe is liked or not (hearth button)
    isLiked(id) {
        return this.likes.findIndex(el => el.id === id) !== -1; // Checks if el is different to -1 | IF -1 THAN its false (and recipe is not liked)
    }
    // Shows Numbers of Likes
    getNumLikes() {
        return this.likes.length;
    }
    // Persist Data (localStorage)
    persistData() {
        localStorage.setItem('likes', JSON.stringify(this.likes)); // Set Likes to localStorage and convert it to string using JSON.stringify
    }
    readStorage() {
        const storage = JSON.parse(localStorage.getItem('likes')); // Convert everything back to the original type (likes element from string to object)

        // Restoring likes from the localStorage
        if (storage) this.likes = storage;
    }
}