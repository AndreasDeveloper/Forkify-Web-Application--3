// --- IMPORTING MODELS | PACKAGES --- \\
import uniqid from 'uniqid';

// Export Class | Class that holds shopping list
export default class List {
    constructor() { // When we initialize new list, we don't need to pass into the constructor any value
        this.items = []; // But we have to include empty array
    }

    // Add Item Method
    addItem (count, unit, ingredient) {
        const item = {
            id: uniqid(),
            count, // same as count: count
            unit,
            ingredient
        }
        this.items.push(item);  // Push item to items array
        return item;
    }
    // Delete Item Method
    deleteItem (id) {
        const index = this.items.findIndex(el => el.id === id);
        this.items.splice(index, 1); // ex: arr=[2,4,8].splice(1,1) -> returns 4, original arr is [2,8]. slice(1,1) = 1 as position, also takes only 1 element
    }
    // Update the count
    updateCount(id, newCount) {
        this.items.find(el => el.id === id).count = newCount;
    }
};