import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import * as moment from 'moment';
import { CareManagerService } from 'src/app/shared/service/care-manager.service';
import { AlertNotesComponent } from './alert-notes/alert-notes.component';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent {
  patientProfile: any;
  patientInfo: any;
rows: any;

  @Input()
  get gettingPatientDetails(){
    return this.patientProfile
  }
  set gettingPatientDetails(value: any){
    if(value){
      this.patientInfo = value
      console.log('the Alert Patient Details', this.patientInfo);   
    }
  }
  constructor(
    private careService: CareManagerService,
    private cd: ChangeDetectorRef,
    private dialogService?: NbDialogService){}

  alertsclick(){  
    console.log("The alertsclick FUNCTION", this.patientInfo);
    this.careService.getAlertApi(this.patientInfo?.patientID).subscribe((data: any) =>{
      this.rows = data.list;
      console.log('the getAlertApi API', data);
      console.log('The getAlertApi API data.list', this.rows);
      
      this.cd.detectChanges();
    })
  }
  getDateValue(value: any){
    let date_value = moment(value).format('YYYY-MM-DD')
    // console.log("this is getDateValue", date_value);
    return date_value;
  }
  viewNotes(data: any){
    console.log("The view Notes data", data); 
    const id = data.id
    const modalRef: any = this.dialogService?.open(AlertNotesComponent);
    console.log("viewNotes",modalRef);
    modalRef.componentRef.instance.alertData = data;

    this.careService.alertActionApi(data.id).subscribe((data: any)=>{
      console.log("this is Alert Action API data", data);
      
    })
  }
}
