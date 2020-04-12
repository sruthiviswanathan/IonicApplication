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
    if (form.valid) {
        if (form.value.password && form.value.confirm) {
      await this.authf.auth.createUserWithEmailAndPassword(form.value.email, form.value.password)
      .then((response) => {
        return response.user.updateProfile({
          displayName: form.value.name,
          // hardcoded photo url for development purpose.
          photoURL: "https://cdn3.iconfinder.com/data/icons/vector-icons-6/96/256-512.png"
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
      } else {
        this.alertComponent.errorAlert('Password Mismatch', 'Make sure password and confirm password matches');        
      }
    } else {
      this.alertComponent.errorAlert('Missing Fields', 'Please fill out all the fields');
    }
  }
}
