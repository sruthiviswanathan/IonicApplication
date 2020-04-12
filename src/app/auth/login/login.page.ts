import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AlertsComponent } from '../alerts/alerts.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user: any;
  showLoader: boolean;
  constructor(private authf: AngularFireAuth, private router: Router,
    private alertController: AlertController, private alertComponent: AlertsComponent) { }

  ngOnInit() {
  }

 async login(form: NgForm) {
    if(form.valid) {
      this.showLoader= true;
      this.authf.auth.signInWithEmailAndPassword(form.value.email, form.value.password)
      .then((response) => {
        this.user = response.user;
        localStorage.setItem('USER', JSON.stringify(this.user));
        this.alertComponent.successAlert(this.user.displayName);
      }).catch((error) => {
        this.alertComponent.errorAlert(error.code, error.message, '/login');
      });
    } else {
        this.alertComponent.errorAlert('Missing fields', 'Please fill out email and password', '/login');
    }
 }
}
