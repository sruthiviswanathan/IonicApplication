import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user: any;
  constructor(private authf: AngularFireAuth, private router: Router) { }

  ngOnInit() {
  }

 async login(form: NgForm) {
    this.authf.auth.signInWithEmailAndPassword(form.value.email, form.value.password)
    .then((response) => {
      this.user = response.user;
      this.router.navigateByUrl('dashboard');
    }).catch((error) => {
      console.log(error.message);
      this.router.navigateByUrl('/');
    });
  }

}
