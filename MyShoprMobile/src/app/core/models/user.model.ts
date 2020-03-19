export class User {
    displayName?: string;
    email: string;
    password: string;
    shoppingLists: Array<ShoppingList>;
    recipeList: Array<Recipe>;
}

export class ShoppingList {
    _id: string;
    name: string;
    items: Array<string>;
}

export class Recipe {
    _id: string;
    name: string;
    ingredients: Array<string>;
    instructions: Array<string>;
}