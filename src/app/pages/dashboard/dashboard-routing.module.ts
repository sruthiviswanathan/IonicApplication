import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardPage } from './dashboard.page';
import { RecipeComponent } from './recipe/recipe.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { AddrecipeComponent } from './addrecipe/addrecipe.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardPage
  },
  {
    path: 'recipe',
    component: RecipeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'addrecipe',
    component: AddrecipeComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPageRoutingModule {}
