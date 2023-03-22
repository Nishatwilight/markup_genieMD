import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileResolver } from '../shared/resolver/profile.resolver';
import { LandingComponent } from './landing/landing.component';
import { PatientComponent } from './patient/patient.component';
import { ProfileComponent } from './profile/profile.component';

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
        path: ':id/dashboard/patient',
        component: PatientComponent,
        resolve: {
          profileData: ProfileResolver
        }
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
