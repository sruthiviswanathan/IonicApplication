import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { AddrecipeComponent } from '../addrecipe/addrecipe.component';

@Component({
  selector: 'app-recipe-cards',
  templateUrl: './recipe-cards.component.html',
  styleUrls: ['./recipe-cards.component.scss'],
})
export class RecipeCardsComponent implements OnInit {

  constructor(private router: Router,
    private modalController: ModalController,
    private firestore: AngularFirestore) { }
  
  listOfRecipes: Array<any> = [];
  finalListOfRecipes: Array<any> = [];

  ngOnInit() {
    this.getAllRecipes();
  }
  
  goToRecipePage(id: string) {
    this.router.navigate(['dashboard/recipe'], {queryParams: { id: id}});
  }

  addNewRecipe() {
    this.modalController.create({component: AddrecipeComponent}).then((modalElement)=> {
      modalElement.present();
    });
  }

  getAllRecipes() {
    this.firestore.collection('recipes').snapshotChanges()
    .subscribe(results => {
        results.map(result => {
          this.listOfRecipes.push(result.payload.doc.data());

          // making the list unique
          let mymap = new Map();
          let unique = this.listOfRecipes.filter(el => { 
              const val = mymap.get(el.recipe); 
              if(val) { 
                  if(el.id < val) { 
                      mymap.delete(el.recipe); 
                      mymap.set(el.recipe, el.id); 
                      return true; 
                  } else { 
                      return false; 
                  } 
              } 
              mymap.set(el.recipe, el.id); 
              return true; 
          });
          this.finalListOfRecipes = unique;
        });
    });
  }

}
