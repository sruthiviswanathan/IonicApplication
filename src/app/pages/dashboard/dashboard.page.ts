import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AddrecipeComponent } from './addrecipe/addrecipe.component';
import { Recipe } from 'src/app/models/recipe';
import { AngularFirestore } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  constructor(private router: Router,
    private modalController: ModalController,
    private firestore: AngularFirestore) { }
  
  // listOfRecipes: Array<any> = [];

  ngOnInit() {
    // this.getAllRecipes();
  }
  
  // goToRecipePage(id: string) {
  //   this.router.navigate(['dashboard/recipe'], {queryParams: { id: id}});
  // }

  // addNewRecipe() {
  //   this.modalController.create({component: AddrecipeComponent}).then((modalElement)=> {
  //     modalElement.present();
  //   })
  // }

  // getAllRecipes() {
  //   this.firestore.collection('recipes').snapshotChanges()
  //   .subscribe(results => {
  //       results.map(result => {
  //         this.listOfRecipes.push(result.payload.doc.data());
  //       });
  //   });
    // console.log(this.listOfRecipes);
  // }
}
