import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'


  },
  {
    path:'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },

  {
    path:'provider',
    loadChildren: () => import('./provider/provider.module').then(m => m.ProviderModule)
  },
  // {-
  
  //   path:'iframe',
  //   loadChildren: () => import('./i-frame/i-frame.module').then(m => m.IFrameModule)
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
