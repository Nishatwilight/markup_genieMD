import { Component, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { AuthService } from 'src/app/shared/service/auth.service';
import { CareManagerService } from 'src/app/shared/service/care-manager.service';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { NbDialogService } from '@nebular/theme';



@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent {
  profile: any;
  rows: any;
  value: any
  types: any
  allData: any;
  allData_list: any;
  ColumnMode = ColumnMode;
  columns = [];
  name: any
  searching = ''
  patientid: any;
  patientidd: any;

  constructor(
    public careService: CareManagerService,
    private authService: AuthService,
    private routing: Router,
    private dialogService: NbDialogService,
    private activatedRoute: ActivatedRoute,

    ) {
      this.patientidd = this.activatedRoute.snapshot.params['patientID'];
      console.log("====>>>>",this.patientidd);
    }
  ngOnInit() {
    this.getValue()  
  }

  getValue(){
    this.profile = this.authService.profile
    console.log('this.authService.profile in Patient Component', this.profile);
    const payload =
    {
      "clinicID": this.profile.clinicID
      , "firstName": "",
      "lastName": "",
      "term": "",
      "gender": "",
      "dob": "",
      "page": 2,
      "count": 25,
      "providerID": this.profile.providerID,
      "careManagerID": "",
      "monitored": -1, 
      "sortColumn": "",
      "sortDirection": 0
    }
    this.careService.patientList(payload).subscribe((data: any) => {
      console.log('the data value of getAssessment API', data);
      this.allData = data
      this.rows = data.list
      this.rows.forEach((names: any) =>{
        // console.log('((((((***)))))))', names);
        names.fullName = names.firstName +" "+ names.lastName
        // console.log(')))))))))***((((((((((', this.name);   
      })
      // console.log('=========>', this.rows);
    })
  }
  getDate(value: any, types: any) {
    let dateValue
    if ((value === ' ') || (value === 'Invalid date') || (value === 0)) {
      value = '-';
    } else {
      if (types === '1') {
        dateValue = moment(value).format('DD-MM-YYYY')
      } else if (types === '2') {
        dateValue = moment(value).format("DD-MM-YYYY hh:mm A")
      }
    }
    return dateValue
  }
  onActivate(data: any){
    // console.log('++++++++++', data.row.patientID);
    this.patientid = data.row.patientID;
      console.log("this.patientid",this.patientid);
    if(data.type == 'click'){
      this.routing.navigate(['provider', this.profile.userID,'dashboard','patient', this.patientid ])
    }
   
  }
  viewConsent(data: any){
    let viewURL = data.consent
        console.log("jhhhhhhh", viewURL );

  }
  open(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog);
  }
}
