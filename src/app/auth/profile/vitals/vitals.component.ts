import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CareManagerService } from 'src/app/shared/service/care-manager.service';
import * as moment from 'moment';

@Component({
  selector: 'app-vitals',
  templateUrl: './vitals.component.html',
  styleUrls: ['./vitals.component.scss']
})
export class VitalsComponent implements OnInit {
  @Input() 
  get getPatientDetails() {
    return this.patientProfile;
  }
  set getPatientDetails(value: any) {
    if (value) {
      this.patientProfile = value;
      console.log('this is vitals patient profile',value);
      const aaa = value.patientID
      console.log('this is viral patient id', value.patientID);
      
    }
  }

  patientProfile: any;
  noOfDays = -1;
  vitalslist: any;
  selectedDateRange = {
    start: new Date('1900-02-01'),
    end: new Date()
  };
  constructor(
    private careService: CareManagerService,
  ) {}

  ngOnInit(): void {
    this.getList(-1)
  }
  getvitalsList(){
    console.log("checking the getvitallist",this.getvitalsList);
    const fromDates = new Date(this.selectedDateRange.start).getTime();
    const toDates = new Date(this.selectedDateRange.end).getTime();
      const payload =
      {
        "vitalTypeID":20,
        startDate: moment(fromDates).format('YYYY-MM-DD'),
        endDate: moment(toDates).format('YYYY-MM-DD'),
        "username":"dasfdasf2344"
      }
      this.careService.gettingViratalsApi(payload).subscribe((data: any) => {
        console.log("the given lis offf", data);
        
      })

  }
  getList(item: number) {
    this.noOfDays = item;
    let fromDate = moment().add(-118, 'years').valueOf();
    const toDate = moment().valueOf();
    let unit;
    switch (item) {
      case -1: fromDate = moment('1900-02-01').startOf('day').valueOf(); unit = 'month'; break;
      case 7: fromDate = moment().add(-7,'days').startOf('day').valueOf(); unit = 'day'; break;
      case 14: fromDate = moment().add(-14, 'days').startOf('day').valueOf(); unit = 'day'; break;
      case 31: fromDate = moment().add(-1, 'months').startOf('day').valueOf(); unit = 'day'; break;
      case 90: fromDate = moment().add(-3, 'months').startOf('day').valueOf(); unit = 'month'; break;
      case 180: fromDate = moment().add(-6, 'months').startOf('day').valueOf(); unit = 'month'; break;
      case 365: fromDate = moment().add(-1, 'years').startOf('day').valueOf(); unit = 'month'; break;
      default: fromDate = moment().add(-118, 'years').startOf('day').valueOf(); unit = 'month';
    }
    this.selectedDateRange = {
      start: new Date(fromDate),
      end: new Date(toDate)
    };
    this.getvitalsList();
  }
  selectedDate(event: any) {
    const ranges = event;
    if (ranges.start && ranges.end) {
      ranges.start = new Date(moment(ranges.start).startOf('day').valueOf());
      ranges.end = new Date(moment(ranges.end).endOf('day').valueOf());
      const days = moment(ranges.end).diff(moment(ranges.start), 'days');
      this.selectedDateRange.start = new Date(moment(ranges.start).startOf('day').valueOf());
      this.selectedDateRange.end = new Date(moment(ranges.end).endOf('day').valueOf());

      this.getvitalsList();
    }
  }
}