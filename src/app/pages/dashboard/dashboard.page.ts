import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {CommonheaderComponent} from '../../components/commonheader/commonheader.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  constructor(private router: Router) { }
  
  ngOnInit() {
  }
  goToRecipePage() {
    this.router.navigateByUrl('dashboard/recipe')
  }
}
