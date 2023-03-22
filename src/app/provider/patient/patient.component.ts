import { Component } from '@angular/core';
import * as moment from 'moment';
import { AuthService } from 'src/app/shared/service/auth.service';
import { CareManagerService } from 'src/app/shared/service/care-manager.service';

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
  constructor(
    public careService: CareManagerService,
    private authService: AuthService,) {

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
      console.log('=========>', this.rows);
    })
  }
  getDate(value: any, types: any) {
    let dateValue
    if ((value === '') || (value === 'Invalid date') || (value === 0)) {
      value = '-';
    } else {
      if (types = 1) {
        dateValue = moment(value).format('DD-MM-YYYY')
      } else if (types = 2) {
        dateValue = moment(value).format('DD-MM-YYYY')
      }
    }
    return dateValue
  }
}
