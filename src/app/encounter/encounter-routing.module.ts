import { Call } from '@angular/compiler';
import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EncounterComponent } from './encounter/encounter.component';
import { IndexComponent } from './index/index.component';
import { ReadComponent } from './read/read.component';


const routes: Routes = [
  {
    path: 'encounters',
    component:IndexComponent,
    children:[
      {
        path: '',
        redirectTo: 'waitingroom',
        pathMatch: 'full'
      },
      {
        path: ':buckets',
        component: EncounterComponent
      }
    ]
  }  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EncounterRoutingModule { }
