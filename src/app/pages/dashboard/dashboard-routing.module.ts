import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardPage } from './dashboard.page';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { AddrecipeComponent } from './addrecipe/addrecipe.component';
import { RecipeCardsComponent } from './recipe-cards/recipe-cards.component';
import { RecipeComponent } from './recipe/recipe.component';
import { TrendingComponent } from './trending/trending.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardPage,
    children: [
      { path: 'trending', children: [
        {
          path: '',
          component: TrendingComponent,
          canActivate: [AuthGuard]
        }
      ] },
      { path: 'main', children: [
        {
          path: '',
          component: RecipeCardsComponent,
          canActivate: [AuthGuard]
        }
      ] },
      { 
          path: '',
          component: RecipeCardsComponent,
          canActivate: [AuthGuard]
      }
    ]
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
