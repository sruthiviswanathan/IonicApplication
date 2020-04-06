import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PhotoService } from '../../../services/photo.service';
@Component({
  selector: 'app-addrecipe',
  templateUrl: './addrecipe.component.html',
  styleUrls: ['./addrecipe.component.scss'],
})
export class AddrecipeComponent implements OnInit {

  photos: any;

  constructor(private modalController: ModalController,
    public photoService: PhotoService) { }

  ngOnInit() {
    
  }

  closeModal() {
    this.modalController.dismiss();
  }
  addNewRecipe() {
    console.log('Inside add new recipe function');
    // fetch new recipe value.
  }
  reset() {
    console.log('Inside reset');
    // fetch new recipe value.
  }
  takeAPicture() {
    this.photoService.takeNewPhotoAndAddToGallery();
  }

}
