import { ChangeDetectorRef, Component, Input } from '@angular/core';
import * as moment from 'moment';
import { CareManagerService } from 'src/app/shared/service/care-manager.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent {
  patientProfile: any;
  details: any;
  row: any;
  @Input()
  get gettingPatientDetails(){
    return this.patientProfile
  }
  set gettingPatientDetails(value: any){
    if(value){
      this.details = value
    }
  }
constructor(
  private careService: CareManagerService,
  private cd: ChangeDetectorRef
  ){}

historyFun(){
  this.careService.getHistoryApi(this.details.patientID).subscribe((data)=>{
    console.log('This is HistoryFun API', data);
    this.row =data.list
    this.cd.detectChanges()

    console.log('checking the date and time',data.list);   
  })
}
getDateValue(value: any){
  let date = moment(value).format("DD/MM/YYYY hh:mm A")
  return date;
}
getDuration(value:any){

  // const format = value => `0${Math.floor(value)}`.slice(-2)
  const hour = "0" + Math.floor(value / 3600);        
  const minutes = "0" + Math.floor((value % 3600) / 60);
  const seconds = "0" + Math.floor(value % 60);
   return hour.slice(-2)+":"+minutes.slice(-2) + ":" + seconds.slice(-2);
    // let durations = moment(value, "hh:mm:ss")

  // let durations = moment.utc(duration.as('milliseconds')).format('HH:mm:ss')
  // return durations

}

}
