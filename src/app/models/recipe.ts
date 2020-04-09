export class Recipe {
    recipe: string;
    ingredients: string;
    method: string;

    constructor(recipe: Recipe) {
        this.recipe = recipe.recipe;
        this.ingredients = recipe.ingredients;
        this.method = recipe.method;
    }
}