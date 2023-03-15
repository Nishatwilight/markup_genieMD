import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EncounterComponent } from './encounter/encounter.component';

const routes: Routes = [
  {
    path: 'encounters',
    component: EncounterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EncounterRoutingModule { }
