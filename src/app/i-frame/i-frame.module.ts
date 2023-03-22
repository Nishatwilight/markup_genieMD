import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IFrameRoutingModule } from './i-frame-routing.module';
import { IframeComponent } from './iframe/iframe.component';


@NgModule({
  declarations: [
    IframeComponent
  ],
  imports: [
    CommonModule,
    IFrameRoutingModule
  ]
})
export class IFrameModule { }
