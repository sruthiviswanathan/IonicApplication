import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireList } from 'angularfire2/database';
import { IonItemSliding } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {

  searchValue: string;
  searchByKeyword: string;
  recipeList: AngularFireList<any>;
  ifSearchResultsReady: boolean;
  filteredResults: Array<any> = [];
  constructor(private firestore: AngularFirestore, private router: Router,
    private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(value => {
      this.searchByKeyword = value.keyword;
      console.log(this.searchByKeyword);
      this.searchValue = this.searchByKeyword;
      this.fetchRecipesBasedOnInput(this.searchByKeyword);
  });
  }

  async onEnterEventHandler(event: any) {
      // on enter
      if(event.keyCode === 13) {
        this.filteredResults = [];
        this.fetchRecipesBasedOnInput(event.target.value);
      }
  }

  fetchRecipesBasedOnInput(keyword:any) {
        this.filteredResults = [];
        let query = keyword.toLowerCase();
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