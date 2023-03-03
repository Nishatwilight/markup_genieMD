import { Component, Input } from '@angular/core';
import { CareManagerService } from 'src/app/shared/service/care-manager.service';

@Component({
  selector: 'app-assessment',
  templateUrl: './assessment.component.html',
  styleUrls: ['./assessment.component.scss']
})
export class AssessmentComponent {
  patientProfile: any;
  PatientDetails: any;
  @Input()
   get gettingPatientDetails(){
    return this.patientProfile
   }
   set gettingPatientDetails(value: any){
    if(value){
      this.PatientDetails = value
    }
     console.log('this.gettingPatientDetails ', this.PatientDetails );
     
   }

  constructor(private careService: CareManagerService){
}
assessmentFun(){
  const payload =
  {
  "clinicID":this.PatientDetails.clinicID,
  "userID":this.PatientDetails.userID,
  "patientID":this.PatientDetails.patientID
  }
  this.careService.getAssessmentApi(payload).subscribe((data: any)=>{
    console.log("Getting Assessment API", data);    
  })
}
}
// this.careService.getAlertApi(data.patientID).subscribe((data: any) =>{
//   console.log('the getAlertApi API', data);