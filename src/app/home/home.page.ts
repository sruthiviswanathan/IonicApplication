import { Component } from '@angular/core';
import { AuthService } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";
import { Router } from '@angular/router';
import {AlertController} from '@ionic/angular';
import { VideoPlayer } from '@ionic-native/video-player/ngx';

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

  user:any

  constructor(private authService: AuthService,
    private router: Router, private alertController: AlertController,
    private videoPlayer: VideoPlayer) {}

  async signInWithGoogle() {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((response) => {
        this.user = response;
        localStorage.setItem('USER', JSON.stringify(this.user));
        // Hard Coded admin logic for development purpose
        if (this.user.firstName == 'Sruthi') {
          localStorage.setItem('ADMIN' , "true");
        }
        this.presentAlert();
    })
  }

  goToPage() {
    if(this.user) {
      this.router.navigateByUrl('dashboard');
    } else {
      this.signInWithGoogle();
      this.router.navigateByUrl('/');      
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
            this.router.navigateByUrl('dashboard');
          }
        }
      ]
    });

    await alert.present();
  }
}
