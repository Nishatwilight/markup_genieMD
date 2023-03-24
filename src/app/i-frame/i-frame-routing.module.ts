import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared/auth.guard';
import { IframeComponent } from './iframe/iframe.component';

const routes: Routes = [
  {
    path:':encounterId',
    component:IframeComponent,
    canActivate:[AuthGuard],

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IFrameRoutingModule { }
