import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing/landing.component';
import { ProfileComponent } from './profile/profile.component';
import { NbActionsModule, NbAutocompleteModule, NbButtonGroupModule, NbButtonModule, NbCardModule, NbCheckboxModule, NbContextMenuModule, NbDatepickerModule, NbDialogModule, NbFormFieldModule, NbIconModule, NbInputModule, NbLayoutModule, NbListModule, NbMenuItem, NbMenuModule, NbRouteTabsetModule, NbSelectModule, NbSidebarModule, NbSpinnerModule, NbTabsetModule, NbTooltipModule, NbUserModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgChartjsModule } from 'ng-chartjs';
import { SnapshotComponent } from './snapshot/snapshot.component';
import { AlertsComponent } from './alerts/alerts.component';
import { AssessmentComponent } from './assessment/assessment.component';
import { DocumentsComponent } from './documents/documents.component';
import { AlertNotesComponent } from './alerts/alert-notes/alert-notes.component';
import { HistoryComponent } from './history/history.component';
import { TaskComponent } from './task/task.component';
import { VitalsComponent } from './vitals/vitals.component';
import { ProviderRoutingModule } from './provider-routing.module';
import { PatientComponent } from './patient/patient.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';



@NgModule({
  declarations: [
    LandingComponent,
    ProfileComponent,
    SnapshotComponent,
    AlertsComponent,
    AssessmentComponent,
    DocumentsComponent,
    AlertNotesComponent,
    HistoryComponent,
    TaskComponent,
    VitalsComponent,
    PatientComponent,
    
  ],
  imports: [
    CommonModule,
    ProviderRoutingModule,
    NbInputModule,
    NbCardModule,
    NbButtonModule,
    NbFormFieldModule,
    NbIconModule,
    FormsModule,
    ReactiveFormsModule,
    NbLayoutModule,
    NbSidebarModule,
    NbListModule,
    NbUserModule,
    NbButtonGroupModule,
    NbTooltipModule,
    NbSpinnerModule,
    NbDialogModule.forRoot(),
    NbSidebarModule.forRoot(),
    NbTabsetModule,
    NbCheckboxModule,
    NbAutocompleteModule,
    NbSelectModule,
    NbDatepickerModule,
    NbActionsModule,
    NgxDatatableModule,
    NbContextMenuModule,
    NgChartjsModule,
    NbSidebarModule,
    NbMenuModule.forRoot(),
    NbMenuModule,
    Ng2SearchPipeModule,
    NbRouteTabsetModule
    
    
  ]
})
export class ProviderModule { }
