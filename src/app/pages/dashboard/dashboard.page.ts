import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AddrecipeComponent } from './addrecipe/addrecipe.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  constructor(private router: Router, private modalController: ModalController) { }
  
  ngOnInit() {
  }
  goToRecipePage() {
    this.router.navigateByUrl('dashboard/recipe');
  }
  addNewRecipe() {
    this.modalController.create({component: AddrecipeComponent}).then((modalElement)=> {
      modalElement.present();
    })
  }
}
