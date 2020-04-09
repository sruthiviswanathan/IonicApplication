import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private authf: AngularFireAuth, private router: Router,
    private alertController: AlertController) { }
  user: any;

  ngOnInit() {
  }

  async register(form: NgForm) {
    await this.authf.auth.createUserWithEmailAndPassword(form.value.email, form.value.password)
    .then((response) => {
       return response.user.updateProfile({
         displayName: form.value.name,
         // hardcoded photo url for development purpose.
         photoURL: "https://cdn.iconscout.com/icon/free/png-256/avatar-372-456324.png"
       }).then((result) => {
         this.user = JSON.stringify(response);
         localStorage.setItem('USER', this.user);
         this.successAlert(form.value.name);
       }).catch((error) => {
        console.log(error);
        this.errorAlert(error.code, error.message);
       });
    }).catch((error) => {
      this.errorAlert(error.code, error.message);
    });
  }

  async successAlert(userName: string) {
    const alert = await this.alertController.create({
      header: 'Welcome to Pinch of Yum!',
      subHeader: 'Continue as ' + userName,
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
            this.router.navigateByUrl('/register');
          }
        }
      ]
    });
    await alert.present();
  }

}
