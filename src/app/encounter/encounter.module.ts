import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EncounterRoutingModule } from './encounter-routing.module';
import { EncounterComponent } from './encounter/encounter.component';
import { NbActionsModule, NbButtonModule, NbCardModule, NbIconModule, NbInputModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


@NgModule({
  declarations: [
    EncounterComponent
  ],
  imports: [
    CommonModule,
    EncounterRoutingModule,
    NbButtonModule,
    NbCardModule,
    NbIconModule,
    NbEvaIconsModule,
    NbInputModule,
    NbActionsModule,
    NgxDatatableModule
  ]
})
export class EncounterModule { }
