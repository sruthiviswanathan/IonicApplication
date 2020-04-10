import {v4 as uuidv4 } from 'uuid'; 
export class Recipe {
    id: string;
    recipe: string;
    description: string;
    ingredients: string;
    method: string;
    tags: Array<string>;
    images: Array<string>;

    constructor(recipe: Recipe, images: Array<string>, tagNames: Array<string>) {
        this.id = uuidv4();
        this.recipe = recipe.recipe;
        this.description = recipe.description;
        this.ingredients = recipe.ingredients;
        this.method = recipe.method;
        this.images = images;
        this.tags = tagNames;
    }
}