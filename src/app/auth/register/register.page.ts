import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { AlertsComponent } from '../alerts/alerts.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private authf: AngularFireAuth, private router: Router,
    public alertComponent: AlertsComponent) { }
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
        this.user = JSON.stringify(response.user);
         localStorage.setItem('USER', this.user);
         this.alertComponent.successAlert(form.value.name);
       }).catch((error) => {
        console.log(error);
        this.alertComponent.errorAlert(error.code, error.message);
       });
    }).catch((error) => {
      this.alertComponent.errorAlert(error.code, error.message);
    });
  }
}
