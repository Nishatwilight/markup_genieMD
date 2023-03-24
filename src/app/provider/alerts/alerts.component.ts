import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  items = [{ title: 'Clear All Warnings' }, { title: 'Clear All Alerts' }];
  alertStatus: any;
  patientid: any

  constructor(
    private careService: CareManagerService,
    private cd: ChangeDetectorRef,
    private activateRoute: ActivatedRoute,
    private dialogService?: NbDialogService,
    ){
      this.activateRoute.parent?.params.subscribe(params =>{
        console.log('the value of Activated route', params);
        this.patientid = params['patientID']    
      })
      this.alertsclick()
    }

  alertsclick(){  
    console.log("The alertsclick FUNCTION", this.patientInfo);
    this.careService.getAlertApi(this.patientid).subscribe((data: any) =>{
      this.rows = data.list;
      console.log('the getAlertApi API', data);
      console.log('The getAlertApi API data.list', this.rows);  
      this.rows.map((value: any) =>{
        console.log("The get AlertAPI data.list MAP value", value);   
        this.alertStatus = value.alertStatus
      })
      this.cd.detectChanges();
    })
  }
  getAlertStatus(value: any){
    // console.log('*************', value);
    switch(value){
      case 0: value = 'New'; break;
      case 1: value = ' In Process'; break;
      case 2: value = 'Resolved'; break;
      default: value = "-";
    }
    return value;
  }
  getDateValue(value: any){
    let date_value = moment(value).format('YYYY-MM-DD')
    // console.log("this is getDateValue", date_value);
    return date_value;
  }
  viewNotes(data: any){
    console.log("The view Notes data", data); 
    // const id = data.id
    const modalRef: any = this.dialogService?.open(AlertNotesComponent);
    // console.log("viewNotes",modalRef);
    modalRef.componentRef.instance.alertData = data;
 
   
  }
}