import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IFrameRoutingModule } from './i-frame-routing.module';
import { IframeComponent } from './iframe/iframe.component';
import { NbCardModule, NbIconModule } from '@nebular/theme';


@NgModule({
  declarations: [
    IframeComponent
  ],
  imports: [
    CommonModule,
    IFrameRoutingModule,
    NbCardModule,
    NbIconModule
  ]
})
export class IFrameModule { }
