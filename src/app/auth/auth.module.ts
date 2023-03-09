import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { LogInComponent } from './log-in/log-in.component';
import { NbActionsModule, NbAutocompleteModule, NbButtonGroupModule, NbButtonModule, NbCardModule, NbCheckboxModule, NbContextMenuModule, NbDatepickerModule, NbDialogContainerComponent, NbDialogModule, NbDialogService, NbFormFieldModule, NbIconModule, NbInputModule, NbLayoutModule, NbListModule, NbSelectModule, NbSidebarModule, NbSpinnerModule, NbTabsetModule, NbTooltipModule, NbUserModule,  } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { VitalsComponent } from './profile/vitals/vitals.component';
import { AssessmentComponent } from './profile/assessment/assessment.component';
import { DocumentsComponent } from './profile/documents/documents.component';
import { HistoryComponent } from './profile/history/history.component';
import { TaskComponent } from './profile/task/task.component';
import { AlertsComponent } from './profile/alerts/alerts.component';
// import { SnapshotComponent } from './profile/snapshot/snapshot.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AlertNotesComponent } from './profile/alerts/alert-notes/alert-notes.component';






@NgModule({
  declarations: [
    LogInComponent,
    ProfileComponent,
    VitalsComponent,
    AssessmentComponent,
    DocumentsComponent,
    HistoryComponent,
    TaskComponent,
    AlertsComponent,
    AlertNotesComponent,
    // SnapshotComponent,

  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
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
    NbTabsetModule,
    NbCheckboxModule,
    NbAutocompleteModule,
    NbSelectModule,
    NbDatepickerModule,
    NbActionsModule,
    NgxDatatableModule,
    NbContextMenuModule

    

  ]
})
export class AuthModule { }
