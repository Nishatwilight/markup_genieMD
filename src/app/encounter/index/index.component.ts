import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { AuthService } from 'src/app/shared/service/auth.service';
import { ClinicService } from 'src/app/shared/service/clinic.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent {
  profile: any;
  values: any;
  rows: any;
  rowss: any;
  additionalData: any;
  item: any;
  btnValues: any[] = [];
  btndata: any;
  type: any;
  types: any;
  noOfDays: Event | undefined;
  autoDate: any;
  // ColumnMode = this.ColumnMode;

  constructor(private authService: AuthService,
    public cs: ClinicService,
    public routing: Router
  ) { }
  ngOnInit() {
    this.profile = this.authService.profile;
    this.getStart()
    // this.bucket(6)

  }

  getStart() {

    const payload: any =
    {
      "clinicID": this.profile.clinicID,
      "providerID": this.profile.providerId,
      "types":
        [
          { "type": 6, "providerOnly": false, "status": [0, 1, 4] },
          { "type": 0, "providerOnly": false, "status": [0, 1] },
          { "type": 3, "providerOnly": false, "status": [0, 1] },
          { "type": 4, "providerOnly": true, "status": [7] },
          { "type": 7, "providerOnly": true, "status": [2] },
          { "type": 1, "providerOnly": true, "status": [0, 1, 4] }
        ],
      "userID": this.profile.userID
    }
    this.cs.getstarts(payload).subscribe((data: any) => {
      console.log('The value of Getstart API', data);
      console.log('The value of Getstart API', data.types);
      this.btnValues = data.types
    })

  }
  btnBadge(type: any) {
    let count = '0';
    this.btnValues.map((status: any) => {
      if (status.type === type) {
        count = status.count.toString();
      }
    });
    return count;
  }

  bucket(type: any) {
  this.getStart()
   this.routing.navigate([`/provider/${this.profile.userID}/dashboard/encounters/${type}`])
  }

}