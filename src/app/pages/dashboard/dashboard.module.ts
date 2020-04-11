import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';
import { FileUploadModule } from 'ng2-file-upload';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';

import { DashboardPage } from './dashboard.page';
import {CommonheaderComponent} from '../../shared/commonheader/commonheader.component';
import { RecipeComponent} from '../dashboard/recipe/recipe.component'
import { AddrecipeComponent } from './addrecipe/addrecipe.component';
import { RecipeCardsComponent } from '../dashboard/recipe-cards/recipe-cards.component';
import { TrendingComponent } from '../dashboard/trending/trending.component';
import { SearchComponent } from '../dashboard/search/search.component';

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
    AddrecipeComponent,
    RecipeCardsComponent,
    TrendingComponent,
    SearchComponent
  ],
  providers: [
    AngularFirestore,
    AngularFireStorage
  ]
})
export class DashboardPageModule {}
