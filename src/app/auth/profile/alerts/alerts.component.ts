import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { CareManagerService } from 'src/app/shared/service/care-manager.service';

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
  constructor(private careService: CareManagerService,
    private cd: ChangeDetectorRef,){}

  alertsclick(){  
    // console.log("The alertsclick FUNCTION", this.patientInfo);
    this.careService.getAlertApi(this.patientInfo?.patientID).subscribe((data: any) =>{
      this.rows = data.list;
      // console.log('the getAlertApi API', data);
      this.cd.detectChanges();
    })
  }
}
