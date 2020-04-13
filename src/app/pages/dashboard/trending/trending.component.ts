import { Component, OnInit } from '@angular/core';
import { AddrecipeComponent } from '../addrecipe/addrecipe.component';
import { AngularFirestore } from 'angularfire2/firestore';
import { ModalController, IonItemSliding } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.scss'],
})
export class TrendingComponent implements OnInit {

  constructor(private router: Router,
    private modalController: ModalController,
    private firestore: AngularFirestore) { }
  
  listOfRecipes: Array<any> = [];
  finalListOfRecipes: Array<any> = [];

  ngOnInit() {
    this.getAllRecipes();
  }
  
  goToRecipePage(id: string, slidingItem: IonItemSliding) {
    slidingItem.close();
    this.router.navigate(['dashboard/recipe'], {queryParams: { id: id}});
  }

  getAllRecipes() {
    this.listOfRecipes = [];
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
