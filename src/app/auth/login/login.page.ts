import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user: any;
  showLoader: boolean;
  constructor(private authf: AngularFireAuth, private router: Router,
    private alertController: AlertController, private loadingController: LoadingController) { }

  ngOnInit() {
  }

 async login(form: NgForm) {
   this.showLoader= true;
    this.authf.auth.signInWithEmailAndPassword(form.value.email, form.value.password)
    .then((response) => {
      this.user = response.user;
      localStorage.setItem('USER', JSON.stringify(this.user));
      this.successAlert();
    }).catch((error) => {
      this.errorAlert(error.code, error.message);
    });
  }

  async successAlert() {
    const alert = await this.alertController.create({
      header: 'Welcome to Pinch of Yum!',
      subHeader: 'Continue as ' + JSON.parse(localStorage.getItem('USER')).displayName,
      message: 'Explore easy and tasty recipes!!!',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.router.navigateByUrl('dashboard');
          }
        }
      ]
    });
    await alert.present();
  }

  async errorAlert(code: string, errorMessage: string) {
    const alert = await this.alertController.create({
      header: 'OOPS Something went wrong!',
      subHeader: code,
      message: errorMessage,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.router.navigateByUrl('/login');
          }
        }
      ]
    });
    await alert.present();
  }

}
