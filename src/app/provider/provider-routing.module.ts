import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared/auth.guard';
import { ProfileResolver } from '../shared/resolver/profile.resolver';
import { AlertsComponent } from './alerts/alerts.component';
import { AssessmentComponent } from './assessment/assessment.component';
import { DocumentsComponent } from './documents/documents.component';
import { HistoryComponent } from './history/history.component';
import { LandingComponent } from './landing/landing.component';
import { PatientComponent } from './patient/patient.component';
import { ProfileComponent } from './profile/profile.component';
import { SnapshotComponent } from './snapshot/snapshot.component';
import { TaskComponent } from './task/task.component';
import { VitalsComponent } from './vitals/vitals.component';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
    children: [
      {
        path: `:id/dashboard/patient`,
        component: PatientComponent,
        resolve: {
          profileData: ProfileResolver
        },
        canActivate: [AuthGuard]
      },
      {
        path: ':id/dashboard/patient/:patientID',
        component: ProfileComponent,
        resolve: {
          profileData: ProfileResolver
        },
        canActivate: [AuthGuard],
        children: [
          {
            path: 'snapshot',
            component: SnapshotComponent,
          }, {
            path: 'vitals',
            component: VitalsComponent,
          },{
            path: 'alerts',
            component: AlertsComponent,
          },{
            path: 'encounter',
            component: AssessmentComponent,
          },{
            path: 'document',
            component:DocumentsComponent,
          },{
            path: 'history',
            component:HistoryComponent,
          },{
            path: 'task',
            component:TaskComponent,
          }
        ]
      },
     

      {

        path: ':id/dashboard',
        loadChildren: () => import('../encounter/encounter.module').then(m => m.EncounterModule),
        resolve: {
          profileData: ProfileResolver
        },
        // canActivate: [AuthGuard]

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
