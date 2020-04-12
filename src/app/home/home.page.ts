import { Component } from '@angular/core';
import { AuthService } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  slideOpts = {
    initialSlide: 1,
    speed: 400
  };

  localStorage = localStorage;
  user:any
  sweetRecipes: Array<any> = [];
  breakfastRecipes: Array<any> = [];

  constructor(private authService: AuthService,
    private router: Router, private alertController: AlertController,
    private authf: AngularFireAuth, private firestore: AngularFirestore) {}

  ngOnInit() {
    this.user = localStorage.getItem('USER');
  }

  async signInWithGoogle() {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((response) => {
        this.user = response;
        localStorage.setItem('USER', JSON.stringify(this.user));
        this.presentAlert();
    });
  }

  signInWithPinchOfYum() {
    this.router.navigateByUrl('register');
  }

  login() {
    this.router.navigateByUrl('login');
  }

  search(keyword: string) {
    if (localStorage.getItem('USER')) {
    this.router.navigate(['dashboard/search'], {queryParams: { keyword: keyword}});
    } else {
      this.router.navigateByUrl('login');
    }
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Welcome to Pinch of Yum!',
      subHeader: 'Continue as ' + this.user.firstName,
      message: `<ion-list><ion-item><ion-avatar slot="start"><ion-img src="${this.user.photoUrl}" alt="userpic" style="border-radius: 2px"></ion-img></ion-avatar><ion-label><p>${this.user.firstName}${" "}${this.user.lastName}</p></ion-label></ion-item></ion-list>`,
      buttons: [
        {
          text: 'CANCEL',
          role: 'cancel',
          cssClass: 'danger',
          handler: () => {
            console.log('Confirm Cancel!!');
          }
        }, {
          text: 'OK',
          handler: () => {
            console.log('Confirm OK!!');
            this.router.navigateByUrl('dashboard/main');
          }
        }
      ]
    });

    await alert.present();
  }
}
