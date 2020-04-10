import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PhotoService } from '../../../services/photo.service';
import { ActionSheetController } from '@ionic/angular';
import { AngularFirestore } from 'angularfire2/firestore';

import { FileUploader, FileLikeObject } from 'ng2-file-upload';
import { NgForm } from '@angular/forms';
import { Recipe } from '../../../models/recipe';
import { ToastService } from '../../../shared/services/toast.service';

@Component({
  selector: 'app-addrecipe',
  templateUrl: './addrecipe.component.html',
  styleUrls: ['./addrecipe.component.scss'],
})
export class AddrecipeComponent implements OnInit {

  tagNames: string[];
  photos: any;
  uploader: FileUploader = new FileUploader({});
  public hasBaseDropZoneOver: boolean = false;

  constructor(private modalController: ModalController,
    public photoService: PhotoService,
    private actionSheetController: ActionSheetController,
    private fireStore: AngularFirestore,
    public toastService: ToastService) {}

  ngOnInit() {
    
  }

  closeModal() {
    this.modalController.dismiss();
  }
  
  addNewRecipe(form: NgForm) {
    const newRecipe: Recipe = new Recipe(form.value);
    this.fireStore.collection('recipes').add({...newRecipe}).then(response => {
      this.toastService.successToast('added your recipe');
      form.resetForm();
    }).catch(error => {
      this.toastService.errorToast(error.message);
    });
  }
  reset(form: NgForm) {
      form.resetForm();
  }
  takeAPicture() {
    this.photoService.takeNewPhotoAndAddToGallery();
  }

  tagNameCollector(eventValue: any) {
    let value = eventValue.target.value;
    this.tagNames = value.split(',');
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
