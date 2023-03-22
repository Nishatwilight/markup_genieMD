import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IframeComponent } from './iframe/iframe.component';

const routes: Routes = [
  {
    path:':encounterId',
    component:IframeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IFrameRoutingModule { }
