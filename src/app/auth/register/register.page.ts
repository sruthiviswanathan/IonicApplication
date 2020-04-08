import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private authf: AngularFireAuth, private router: Router) { }
  user: any;

  ngOnInit() {
  }

  async register(form: NgForm) {
    await this.authf.auth.createUserWithEmailAndPassword(form.value.email, form.value.password)
    .then((response) => {
      this.user = response.user;
      localStorage.setItem('USER', this.user);
      this.router.navigateByUrl('/dashboard');
    }).catch((error) => {
      // console.log(error);
      this.router.navigateByUrl('/');
    });
  }

}
