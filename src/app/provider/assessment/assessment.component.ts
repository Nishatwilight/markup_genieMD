import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { CareManagerService } from 'src/app/shared/service/care-manager.service';

@Component({
  selector: 'app-assessment',
  templateUrl: './assessment.component.html',
  styleUrls: ['./assessment.component.scss']
})
export class AssessmentComponent implements OnInit {
  patientProfile: any;
  PatientDetails: any;
  rows: any;
  rowss:any
  
  @Input()
   get gettingPatientDetails(){
    return this.patientProfile
   }
   set gettingPatientDetails(value: any){
    if(value){
      this.PatientDetails = value
    }
     
   }

  constructor(
    private careService: CareManagerService,
    private cd: ChangeDetectorRef){
}
ngOnInit(){
}

assessmentFun(){
  
  const payload =
  {
  "clinicID":this.PatientDetails.clinicID,
  "userID":this.PatientDetails.userID,
  "patientID":this.PatientDetails.patientID
  }
  this.careService.getAssessmentApi(payload).subscribe((data: any)=>{
    console.log('the data value of getAssessment API', data);
    
    this.rows = data.encounterList;
    console.log(" The row value of getAssessment API ", this.rows);

    const patient_details = this.rows.map((row: any) => {
      console.log('The map function implemented', row);
      
      try {   // Doubt
        row.parseExtraData = JSON.parse(row.extraData);
      } catch(e) {   // Doubt
        row.parseExtraData = {};
      }
      return row;
    })
    this.rowss = [...patient_details];  // Doubt
    console.log('the value of the rows data in assessment component', this.rowss);
    
    this.cd.detectChanges();

  })
}
getValue(value: any){
  // console.log("&&&&&&&&&&&&", value);

  let date = moment(value).format('DD/MM/YYYY, hh:mm A');

  return date;
}
}
