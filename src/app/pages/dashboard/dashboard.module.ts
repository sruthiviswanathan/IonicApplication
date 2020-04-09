import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';
import { FileUploadModule } from 'ng2-file-upload';
import { AngularFirestore } from 'angularfire2/firestore';


import { DashboardPage } from './dashboard.page';
import {CommonheaderComponent} from '../../components/commonheader/commonheader.component';
import { RecipeComponent} from '../dashboard/recipe/recipe.component'
import { AddrecipeComponent } from './addrecipe/addrecipe.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardPageRoutingModule,
    FileUploadModule
  ],
  declarations: [
    DashboardPage,
    CommonheaderComponent,
    RecipeComponent,
    AddrecipeComponent
  ],
  providers: [
    AngularFirestore
  ]
})
export class DashboardPageModule {}
