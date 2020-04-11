import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { PhotoService } from '../../../services/photo.service';
import { ActionSheetController } from '@ionic/angular';

import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireStorage, AngularFireUploadTask, AngularFireStorageReference } from 'angularfire2/storage';
import { FileUploader, FileLikeObject } from 'ng2-file-upload';
import { NgForm } from '@angular/forms';
import { Recipe } from '../../../models/recipe';
import { ToastService } from '../../../shared/services/toast.service';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

@Component({
  selector: 'app-addrecipe',
  templateUrl: './addrecipe.component.html',
  styleUrls: ['./addrecipe.component.scss'],
})
export class AddrecipeComponent implements OnInit {

  recipeImages: string[] = [];
  tagNames: string[];
  photos: any;
  showProgress: boolean;
  uploader: FileUploader = new FileUploader({});
  public hasBaseDropZoneOver: boolean = false;

  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  downloadUrl: Observable<string>;
  uploadProgress: number;

  constructor(private modalController: ModalController,
    public photoService: PhotoService,
    private alertController: AlertController,
    private fireStore: AngularFirestore,
    public toastService: ToastService,
    private storage: AngularFireStorage) {}

  ngOnInit() {
    
  }

  closeModal() {
    this.modalController.dismiss();
  }
  
  async addNewRecipe(form: NgForm) {
    if (form.valid) {
      if (this.recipeImages.length != 0) {
        let finalTags: Array<any> = [];
        for(let i=0; i< this.tagNames.length ; i++) {
          finalTags.push(this.tagNames[i].trim().toLowerCase());
        } 
        const newRecipe: Recipe = new Recipe(form.value, this.recipeImages, finalTags);
        this.fireStore.collection('recipes').doc(newRecipe.id).set({...newRecipe})
        .then(response => {
          this.toastService.successToast('Successfully added your recipe!!');
          this.tagNames = [];
          this.recipeImages = [];
          form.resetForm();
        }).catch(error => {
          this.toastService.errorToast(error.message);
        });
      } else {
          this.alertPopUp('OOPS! Something went wrong', 'Upload at least one image');
      }
    } else {
      this.alertPopUp('OOPS! Something went wrong','Please fill out all the fields');
    }
  }


  async uploadImage() {
    this.showProgress = true; 
    const file = this.getFiles()[0].rawFile;
    const id = Math.random().toString(36).substring(2);
    this.ref = this.storage.ref(id);
    this.task = this.ref.put(file);
    this.task.percentageChanges().subscribe(value => {
      this.uploadProgress = value * 0.01;
    });
    this.task.snapshotChanges().pipe(
      finalize(() =>{
        this.downloadUrl = this.ref.getDownloadURL();
        this.downloadUrl.subscribe(url => {
          console.log(url);
          this.recipeImages.push(url);
          this.showProgress = false;
        });
      })).subscribe();
  }

  reset(form: NgForm) {
      this.tagNames = [];
      this.recipeImages = [];
      form.resetForm();
  }

  tagNameCollector(eventValue: any) {
    let value = eventValue.target.value;
    this.tagNames = value.split(',');
  }

  getFiles(): FileLikeObject[] {
    return this.uploader.queue.map((fileItem) => {
      return fileItem.file;
    });
  }

  fileOverBase(ev): void {
    this.hasBaseDropZoneOver = ev;
  }

  remove(fileName) {
    let index = this.uploader.queue.indexOf(this.uploader.queue.find(fileItem => fileItem.file.name === fileName));
    if(index > -1){
      this.uploader.queue.splice(index, 1);
    }
  }

  async alertPopUp(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            // do nothing
          }
        }
      ]
    });
    await alert.present();
  }

}
