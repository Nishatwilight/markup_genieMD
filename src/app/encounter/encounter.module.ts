import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EncounterRoutingModule } from './encounter-routing.module';
import { EncounterComponent } from './encounter/encounter.component';
import { NbActionsModule, NbButtonModule, NbCardModule, NbDatepickerModule, NbIconModule, NbInputModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { IndexComponent } from './index/index.component';
import { ReadComponent } from './read/read.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    EncounterComponent,
    IndexComponent,
    ReadComponent,
 
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
    NgxDatatableModule,
    NbDatepickerModule,
    FormsModule
  ]
})
export class EncounterModule { }
