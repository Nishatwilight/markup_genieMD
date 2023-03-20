import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EncounterComponent } from '../encounter/encounter/encounter.component';
// import { DispayResolver } from '../shared/resolver/dispay.resolver';
import { ProfileResolver } from '../shared/resolver/profile.resolver';
import { LandingComponent } from './landing/landing.component';
import { ProfileComponent } from './profile/profile.component';
import { SnapshotComponent } from './snapshot/snapshot.component';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
    children: [
      {
        path: ':id',
        component: ProfileComponent,
        resolve: {
          profileData: ProfileResolver
        }
      },
      {
        path: 'snapshot',
        component: SnapshotComponent,
        // resolve: {
        //   profileData: ProfileResolver
        // }
      },
      {

        path: ':id/dashboard',
        loadChildren: () => import('../encounter/encounter.module').then(m => m.EncounterModule),
        resolve: {
          profileData: ProfileResolver
        }
      },


    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class ProviderRoutingModule { }
