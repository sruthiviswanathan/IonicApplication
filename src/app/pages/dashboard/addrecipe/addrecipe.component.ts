import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PhotoService } from '../../../services/photo.service';
import { ActionSheetController } from '@ionic/angular';

import { FileUploader, FileLikeObject } from 'ng2-file-upload';
import * as firebase from 'firebase';

@Component({
  selector: 'app-addrecipe',
  templateUrl: './addrecipe.component.html',
  styleUrls: ['./addrecipe.component.scss'],
})
export class AddrecipeComponent implements OnInit {

  photos: any;
  uploader: FileUploader = new FileUploader({});
  public hasBaseDropZoneOver: boolean = false;

  constructor(private modalController: ModalController,
    public photoService: PhotoService, private actionSheetController: ActionSheetController) { }

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

  public async showActionSheet(photo, position) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Photos',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.photoService.deletePicture(photo, position);
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          // Nothing to do, action sheet is automatically closed
          }
      }]
    });
    await actionSheet.present();
  }

  getFiles(): FileLikeObject[] {
    return this.uploader.queue.map((fileItem) => {
      return fileItem.file;
    });
  }

  fileOverBase(ev): void {
    this.hasBaseDropZoneOver = ev;
  }

  reorderFiles(reorderEvent: CustomEvent): void {
    let element = this.uploader.queue.splice(reorderEvent.detail.from, 1)[0];
    this.uploader.queue.splice(reorderEvent.detail.to, 0, element);
  }

}
