import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss'],
})
export class AlertsComponent implements OnInit {

  constructor(private alertController: AlertController,
    private router: Router) { }

  ngOnInit() {}

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
