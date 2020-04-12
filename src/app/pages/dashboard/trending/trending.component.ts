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
        });
    });
    this.listOfRecipes = [...new Set(this.listOfRecipes)];
  }
}
