// Export Class | Class that holds like system
export default class Likes {
    constructor() {
        this.likes = [];
    }

    // Add Like Method
    addLike(id, title, author, img) {
        const like = { id, title, author, img };
        this.likes.push(like);
        return like;
    }
    // Delete Like Method
    deleteLike(id) {
        const index = this.likes.findIndex(el => el.id === id);
        this.likes.splice(index, 1); 
    }
    // Check and displays in UI if recipe is liked or not (hearth button)
    isLiked(id) {
        return this.likes.findIndex(el => el.id === id) !== -1; // Checks if el is different to -1 | IF -1 THAN its false (and recipe is not liked)
    }
    // Shows Numbers of Likes
    getNumLikes() {
        return this.likes.length;
    }
}