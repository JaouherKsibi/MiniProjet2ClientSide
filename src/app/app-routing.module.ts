import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'accueil',
    loadChildren: () => import('./accueil/accueil.module').then( m => m.AccueilPageModule)
  },
  {
    path: 'show-detail',
    loadChildren: () => import('./show-detail/show-detail.module').then( m => m.ShowDetailPageModule)
  },
  {
    path: 'show-product-infos',
    loadChildren: () => import('./show-product-infos/show-product-infos.module').then( m => m.ShowProductInfosPageModule)
  },
  {
    path: 'update-personal-infos',
    loadChildren: () => import('./update-personal-infos/update-personal-infos.module').then( m => m.UpdatePersonalInfosPageModule)
  },
  {
    path: 'show-products-by-category',
    loadChildren: () => import('./show-products-by-category/show-products-by-category.module').then( m => m.ShowProductsByCategoryPageModule)
  },
  {
    path: 'my-rents',
    loadChildren: () => import('./my-rents/my-rents.module').then( m => m.MyRentsPageModule)
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./sign-up/sign-up.module').then( m => m.SignUpPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
