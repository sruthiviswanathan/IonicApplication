import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireList } from 'angularfire2/database';
import { IonItemSliding } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {

  recipeList: AngularFireList<any>;
  ifSearchResultsReady: boolean;
  filteredResults: Array<any> = [];
  constructor(private firestore: AngularFirestore, private router: Router) {}

  ngOnInit() {}

  async onEnterEventHandler(event: any) {
      // on enter
      if(event.keyCode === 13) {
        this.filteredResults = [];
        this.fetchRecipesBasedOnInput(event.target.value);
      }
  }

  fetchRecipesBasedOnInput(query:any) {
        this.firestore.collection('recipes', ref => ref.where('recipe', '==', query)).valueChanges()
        .subscribe(value => {
          value.forEach(val => {
            this.filteredResults.push(val);
          })
        });

        this.firestore.collection('recipes', ref => ref.where('tags', 'array-contains', query))
        .valueChanges()
        .subscribe(value => {
          value.forEach(val => {
            this.filteredResults.push(val);
          });
          this.ifSearchResultsReady = true;
        });
    }

    goToRecipePage(id: string, slidingItem: IonItemSliding) {
      slidingItem.close();
      this.router.navigate(['dashboard/recipe'], {queryParams: { id: id}});
    }
}