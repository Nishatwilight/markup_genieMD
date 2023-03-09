import { Component, Input, OnInit } from '@angular/core';
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
  
  @Input()
   get gettingPatientDetails(){
    return this.patientProfile
   }
   set gettingPatientDetails(value: any){
    if(value){
      this.PatientDetails = value
    }
     
   }

  constructor(private careService: CareManagerService){
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
      try {
        row.parseExtraData = JSON.parse(row.extraData);
      } catch(e) {
        row.parseExtraData = {};
      }
      return row;
    })
    this.rows = [...patient_details];
  })

  // this.careService.displayProfile(this.PatientDetails.patientID).subscribe((data)=> {
  //   console.log('The display profile Api in assesment component', data);
  
    
    
  // })
}
getValue(value: any){
  // console.log("&&&&&&&&&&&&", value);
  // let date = moment(value).format('YYYY-MM-DD')
  let date = moment(value).format('DD/MM/YYYY, hh:mm A'); // March 9th 2023, 9:43:14 am

  return date;
}
}
// this.careService.getAlertApi(data.patientID).subscribe((data: any) =>{
//   console.log('the getAlertApi API', data);