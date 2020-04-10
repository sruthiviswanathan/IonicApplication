import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss'],
})
export class RecipeComponent implements OnInit {

  recipeId: any;
  fullRecipe: any = {};
  images: any;
  ingredients: string[] = [];
  method: any;
  isPageReady: boolean;

  constructor(private route: ActivatedRoute,
     private firestore: AngularFirestore) { }

  ngOnInit() {
    this.route.queryParams.subscribe(value => {
        this.recipeId = value.id;
        console.log(this.recipeId);
        this.getFullRecipeById();
    });
  }

  getFullRecipeById() {
    this.firestore.collection('recipes').doc(this.recipeId).ref.get()
    .then(value => {
        console.log(value.data());
        this.fullRecipe = value.data();
        this.images = this.fullRecipe.images;
        this.ingredients = this.fullRecipe.ingredients.split(',');
        this.method = this.fullRecipe.method;
        this.isPageReady = true;
    }).catch(function(error) {
      console.log(error);
    });
  }


}
