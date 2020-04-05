import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { DashboardPage } from './dashboard.page';
import {CommonheaderComponent} from '../../components/commonheader/commonheader.component';
import { RecipeComponent} from '../dashboard/recipe/recipe.component'
import { AddrecipeComponent } from './addrecipe/addrecipe.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardPageRoutingModule
  ],
  declarations: [
    DashboardPage,
    CommonheaderComponent,
    RecipeComponent,
    AddrecipeComponent
  ]
})
export class DashboardPageModule {}
