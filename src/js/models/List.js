// --- IMPORTING MODELS | PACKAGES --- \\
import uniqid from 'uniqid'; // Unique ID

// Export Class | Class that holds shopping list
export default class List {
    constructor() { // When we initialize new list, we don't need to pass into the constructor any value
        this.items = []; // But we have to include empty array
    }

    // Add Item Method
    addItem (count, unit, ingredient) {
        const item = {
            id: uniqid(),
            count, // same as count: count -||-
            unit,
            ingredient
        }
        this.items.push(item);  // Push item to items array
        this.persistData2();
        return item;
    }
    // Delete Item Method
    deleteItem (id) {
        const index = this.items.findIndex(el => el.id === id);
        this.items.splice(index, 1); // ex: arr=[2,4,8].splice(1,1) -> returns 4, original arr is [2,8]. splice(1,1) = 1 as position, also takes only 1 element
        this.persistData2();
    }
    // Update the count
    updateCount(id, newCount) {
        this.items.find(el => el.id === id).count = newCount;
    }
    // Persist Data (localStorage)
    persistData2() {
        localStorage.setItem('list', JSON.stringify(this.items)); // Set Likes to localStorage and convert it to string using JSON.stringify
    }
    // Reading storage (localStorage - read)
    readStorage2() {
        const storage = JSON.parse(localStorage.getItem('list')); // Convert everything back to the original type (likes element from string to object)

        // Restoring likes from the localStorage
        if (storage) this.items = storage;
    }
};