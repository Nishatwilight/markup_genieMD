import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Chart from 'chart.js/auto';
import * as moment from 'moment';
import { AuthService } from 'src/app/shared/service/auth.service';
import { CareManagerService } from 'src/app/shared/service/care-manager.service';


@Component({
  selector: 'app-vitals',
  templateUrl: './vitals.component.html',
  styleUrls: ['./vitals.component.scss']
})
export class VitalsComponent implements OnInit, AfterViewInit{
  name = 'Angular   6';
  canvas: any;
  ctx: any;
  xAxes: any
  @ViewChild('mychart') mychart: any;
  profile: any;
  patientid: any;
  patientProfile: any;
  noOfDays = -1;
  vitalslist: any;
  selectedDateRange = {
    start: new Date('1900-02-01'),
    end: new Date()
  };
  constructor(
    private careService: CareManagerService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) {
    console.log("+++++>>", this.activatedRoute.parent?.params);   
    this.activatedRoute.parent?.params.subscribe(params =>{
      console.log('Checking patient id is available',params);
      this.patientid = params['patientID']
      console.log("((((()))))", this.patientid);
      
    })
    this.getvitalsList()
  }
  
  ngOnInit(): void {
    this.profile = this.authService.profile;
    console.log('this is authService profile values', this.profile);   
    console.log("+++++>>", this.activatedRoute.snapshot.params['patientID']); 
    this.getList(-1)
  }

  ngAfterViewInit() {
    this.canvas = this.mychart.nativeElement; 
    this.ctx = this.canvas.getContext('2d');
    console.log("+++++>> aftrer", this.activatedRoute.snapshot.params['patientID']); 

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
    });
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
        "username":this.patientid
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
