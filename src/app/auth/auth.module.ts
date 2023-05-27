import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { LogInComponent } from './log-in/log-in.component';
import { NbActionsModule, NbAutocompleteModule, NbButtonGroupModule, NbButtonModule, NbCardModule, NbCheckboxModule, NbContextMenuModule, NbDatepickerModule, NbDialogContainerComponent, NbDialogModule, NbDialogService, NbFormFieldModule, NbIconModule, NbInputModule, NbLayoutModule, NbListModule, NbSelectModule, NbSidebarModule, NbSpinnerModule, NbTabsetModule, NbTooltipModule, NbUserModule,  } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// import { SnapshotComponent } from './profile/snapshot/snapshot.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgChartjsModule } from 'ng-chartjs';
import { FormArrayComponent } from './form-array/form-array.component';
// import momentDurationFormatSetup from "moment-duration-format";

// momentDurationFormatSetup(moment);







@NgModule({
  declarations: [
    LogInComponent,
    FormArrayComponent,


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
    NbContextMenuModule,
    NgChartjsModule,
  ]
})
export class AuthModule { }
