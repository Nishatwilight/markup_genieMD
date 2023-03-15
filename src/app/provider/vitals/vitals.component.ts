import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import * as moment from 'moment';
import { CareManagerService } from 'src/app/shared/service/care-manager.service';


@Component({
  selector: 'app-vitals',
  templateUrl: './vitals.component.html',
  styleUrls: ['./vitals.component.scss']
})
export class VitalsComponent implements OnInit, AfterViewInit{
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
  name = 'Angular   6';
  canvas: any;
  ctx: any;
  xAxes: any
  @ViewChild('mychart') mychart: any;

  ngAfterViewInit() {
    this.canvas = this.mychart.nativeElement; 
    this.ctx = this.canvas.getContext('2d');

    let myChart = new Chart(this.ctx, {
      type: 'line',
      
      data: {
        datasets: [{
          label: 'Höhenlinie',
          backgroundColor: "rgba(255, 99, 132,0.4)",
          borderColor: "rgb(255, 99, 132)",
          fill: true,
          data: [
            { x: 1, y: 2 },
            { x: 2500, y: 2.5 },
            { x: 3000, y: 5 },
            { x: 3400, y: 4.75 },
            { x: 3600, y: 4.75 },
            { x: 5200, y: 6 },
            { x: 6000, y: 9 },
            { x: 7100, y: 6 },
          ],
        }]
      },
      // options: {
      //   responsive: true,
      //   title: {
      //     display: true,
      //     text: 'Höhenlinie'
      //   },
      //   scales: {
      //     xAxes: [{
      //       type: 'linear',
      //       position: 'bottom',
      //       ticks: {
      //         userCallback: function (tick: any) {
      //           if (tick >= 1000) {
      //             return (tick / 1000).toString() + 'km';
      //           }
      //           return tick.toString() + 'm';
      //         }
      //       },
      //       scaleLabel: {
      //         labelString: 'Länge',
      //         display: true,
      //       }
      //     }],
      //    yAxes: [{
      //       type: 'linear',
      //       ticks: {
      //         userCallback: function (tick: any) {
      //           return tick.toString() + 'm';
      //         }
      //       },
      //       scaleLabel: {
      //         labelString: 'Höhe',
      //         display: true
      //       }
      //     }]
      //   }
      // }
    });
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
