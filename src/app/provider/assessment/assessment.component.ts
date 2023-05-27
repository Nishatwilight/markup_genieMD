import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { AuthService } from 'src/app/shared/service/auth.service';
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
  profile: any;
  patientid: any;
  userid: any;

  constructor(
    private careService: CareManagerService,
    private cd: ChangeDetectorRef,
    private authService: AuthService,
    private activateRoute: ActivatedRoute){
      this.activateRoute.parent?.params.subscribe(params =>{
        this.patientid = params['patientID']
        this.userid = params['id']
        console.log('****', this.patientid);       
      })
      this.assessmentFun()
}
ngOnInit(){
  this.profile = this.authService.profile
  console.log(' this.profile', this.profile);
  
}

assessmentFun(){
  
  const payload =
  // {
  // "clinicID":this.profile?.clinicID,
  // "userID":this.profile?.userID,
  // "patientID": this.patientid
  // }
  {
    "clinicID":"1000254",
    "userID":this.userid,
    "patientID": this.patientid
    }
  this.careService.getAssessmentApi(payload).subscribe((data: any)=>{
    console.log('the data value of getAssessment API', data);
    
    this.rows = data.encounterList;
    console.log(" The row value of getAssessment API ", this.rows);

    const patient_details = this.rows.map((row: any) => {
      console.log('The map function implemented', row);
      
      try {
        row.parseExtraData = JSON.parse(row.extraData);
      } catch(e) {
        row.parseExtraData = {};
      }
      return row;
    })
    this.rowss = [...patient_details]
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
