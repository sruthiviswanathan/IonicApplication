import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
 

  constructor(private toastController: ToastController) { }

  public async successToast(successMessage: string) {
    const toast = await this.toastController.create({
      message: successMessage,
      duration: 3000,
      position: 'top',
      buttons:[
        {
          icon: 'close',
          role: 'cancel',
          handler: () =>{
            // do nothing as of now..
          }
        }
      ]
    });
    toast.present();
  }

  public async errorToast(errorMessage: string) {
    const toast = await this.toastController.create({
      message: errorMessage,
      color: 'danger',
      duration: 3000,
      position: 'top',
      buttons:[
        {
          icon: 'close',
          role: 'cancel',
          handler: () =>{
            // do nothing as of now..
          }
        }
      ]
    });
    toast.present();
  }
}
