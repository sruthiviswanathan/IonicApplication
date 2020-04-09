import { Component, OnInit } from '@angular/core';
import { AuthService } from 'angularx-social-login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-commonheader',
  templateUrl: './commonheader.component.html',
  styleUrls: ['./commonheader.component.scss'],
})
export class CommonheaderComponent implements OnInit {

  userPhoto: any;
  userName: any;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.userPhoto = JSON.parse(localStorage.getItem('USER')).photoURL;
    this.userName = JSON.parse(localStorage.getItem('USER')).displayName;
  }

  signOut() {
    this.authService.signOut().then((response) => {
      localStorage.clear();
      this.router.navigateByUrl('/home');
    });
  }
}
