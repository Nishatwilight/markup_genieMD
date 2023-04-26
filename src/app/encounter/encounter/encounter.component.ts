import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { AuthService } from 'src/app/shared/service/auth.service';
import { ClinicService } from 'src/app/shared/service/clinic.service';

@Component({
  selector: 'app-encounter',
  templateUrl: './encounter.component.html',
  styleUrls: ['./encounter.component.scss']
})
export class EncounterComponent {
  profile: any;
  values: any;
  rows: any;
  additionalData: any;
  noOfDays: any;
  autoDate: { fromDate: number; endDate: number; } = {
    fromDate: 0,
    endDate: 0,
  };
  encounterBuckets: any;
  dateValue = moment(new Date()).format('YYYY-MM-DD');
  searchValues = ""

  constructor(private authService: AuthService,
    public cs: ClinicService,
    public routing: Router,
    public route: ActivatedRoute,
  ) {
    this.profile = this.authService.profile;
    this.encounterBuckets = this.route.snapshot.params['buckets'];
    console.log("this.encounterBuckets",this.encounterBuckets);
    
    if (this.encounterBuckets === 'scheduled') {
      this.getdate(1);
    } else {
      this.bucket(this.encounterBuckets)
    }
    this.route.params.subscribe((params: any) => {
      console.log('params -------->', params)
      console.log('params -------->', params.buckets)
      this.encounterBuckets = params.buckets;
      if (this.encounterBuckets === 'scheduled') {
        this.getdate(1);
      } else {
        this.bucket(this.encounterBuckets)
      }
    })
  }
  ngOnInit() {

  }
  
  gettingDateValues(type?: any) {
    // if (type == -1) {
    //   this.dateValue = moment(this.dateValue).subtract(1, 'day').format("YYYY-MM-DD")
    // }
    // else if (type == 1) {
    //   this.dateValue = moment(this.dateValue).add(1, 'day').format("YYYY-MM-DD")
    // }
    // else {
    //   this.dateValue = moment(new Date()).format("YYYY-MM-DD")
    // }
  }
  getdate(event: any) {
    let startDate = moment().valueOf();
    let toDate = moment().valueOf();
    this.noOfDays = event;
    if (event == 1) {
      startDate = moment().startOf('day').valueOf();
      toDate = moment().endOf('day').valueOf();
    } else if (event == 7) {
      startDate = moment().startOf('isoWeek').valueOf();
      toDate = moment().endOf('isoWeek').valueOf();
    } else if (event == 31) {
      startDate = moment().startOf('month').valueOf();
      toDate = moment().endOf('month').valueOf()
    }
    this.autoDate = {
      fromDate: new Date(startDate).getTime(),
      endDate: new Date(toDate).getTime()
    }
    if (event == -1) {
      this.dateValue = moment(this.dateValue).subtract(1, 'day').format("YYYY-MM-DD")
    }
    else if (event == 1) {
      this.dateValue = moment(this.dateValue).add(1, 'day').format("YYYY-MM-DD")
    }
    else if (event == 10) {
      this.dateValue = moment(new Date()).format("YYYY-MM-DD")
    }
    this.bucket('scheduled')
    console.log(this.searchValues);

  }
  bucket(type: any, sort?: { sortBy: number, sortDirection: number })  {




    let payload: any = {
      "clinicID": this.profile.clinicID,
      "providerID": this.profile.userName,
      "userID": this.profile.userID,
      "pageNumber": 1,
      "name": this.searchValues,
      "pageSize": 25,
    }
    switch (type) {
      case 6:
      case 'waitingroom':
        if (!sort) {
          sort = { sortBy: 0, sortDirection: 0 };
        }
        payload = {
          ...payload,
          "providerOnly": false,
          "sortBy": sort.sortBy,
          "status": [0, 1, 4],
          "type": 6,
          'sortDirection':sort.sortDirection
        }
        break
      case 1:
      case 'scheduled':
        if (!sort) {
          sort = { sortBy: 0, sortDirection: 0 };
        }
        payload = {
          ...payload,
          "providerOnly": true,
          "sortBy": sort.sortBy,
          "status": [0, 1, 4],
          "type": 1,
          "sortDirection": sort.sortDirection,
          "start": this.autoDate.fromDate,
          "end": this.autoDate.endDate,
        }
        break
      case 0:
      case 'asynchronous':
        if (!sort) {
          sort = { sortBy: 0, sortDirection: 0 };
        }
        payload = {
          ...payload,
          "providerOnly": false,
          "sortBy": sort.sortBy,
          "sortDirection": sort.sortDirection,
          "status": [0, 1],
          "type": 0
        }
        break
      case 3:
      case 'callback':
        if (!sort) {
          sort = { sortBy: 0, sortDirection: 0 };
        }
        payload =
        {
          ...payload,
          "providerOnly": false,
          "sortBy": sort.sortBy,
          "status": [0, 1],
          "type": 3,
          "sortDirection": sort.sortDirection,
        }
        break
      case -2:
      case 'followup':
        if (!sort) {
          sort = { sortBy: 0, sortDirection: 0 };
        }
        payload =

        {
          ...payload,
          "providerOnly": true,
          "sortBy": sort.sortBy,
          "status": [7],
          "type": -2,
          "sortDirection": sort.sortDirection,
        }
        break
      case 2:
      case 'completed':
        if (!sort) {
          sort = { sortBy: 0, sortDirection: 0 };
        }
        payload = {
          ...payload,
          "providerOnly": true,
          "sortBy": sort.sortBy,
          "status": [2],
          "type": -2,
          "sortDirection": sort.sortDirection,
        }
    }
    this.cs.encounterApi(payload).subscribe((data) => {
      console.log(' The value of Encounter API', data);
      this.rows = data.encounterList
      console.log('the EncounterAPI', this.rows);
      this.additionalData = this.rows.map((value: any) => {
        console.log('The map value of EncounterAPI', value);
        try {
          value.parseExtraData = JSON.parse(value.extraData);
          console.log("The Patch value in UI", value.parseExtraData);
        } catch (e) {
          value.parseExtraData = value.extraData;
        }
        return value;
      })
    })

  }
  getvalue(values: any) {
    // console.log("EEEEEEEE", values);
    let dateTime;
    if (values == "" || values == 'invalid date') {
      dateTime = "-";
    } else if (values) {
      dateTime = moment(values).format('DD/MM/YYYY hh:mm A');
    }
    return dateTime
  }
  onActivate(event: any) {
    console.log('onActivate,', event);
    if (event.type === 'click') {
      this.routing.navigate(['provider', this.profile.userID, 'dashboard', 'iframe', event.row.encounterID])
    }
  }
  onSort(event: any) {
    console.log('event', event);
    const cloumn = event.column.name
    if (cloumn === 'Reported' || cloumn === 'Status') {
      console.log('column', cloumn);
      let sortBy = 0;
      let sortDirection = 0;
      if (event.newValue == 'asc') {
        sortDirection = 0;
      }
      else {
        sortDirection = 1;
      }
      switch (cloumn) {
        case 'Reported':
          sortBy = 0;
          break;
        case 'Status':
          sortBy = 4;
          break;
      }
      this.bucket(this.encounterBuckets, { sortBy, sortDirection })
      console.log('ccheckijjjjj', this.encounterBuckets);
    }
  }
}
