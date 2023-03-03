import { Component, Input } from '@angular/core';
import { CareManagerService } from 'src/app/shared/service/care-manager.service';
import * as moment from 'moment';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {
patientProfile: any;
  patientDetails: any;
  dateValue = ''
  todayDate: any
constructor(private careService: CareManagerService){}
@Input()
get gettingPatientDetails(){
  return this.patientProfile
}
set gettingPatientDetails(value: any){
if(value){
this.patientDetails = value
}
}
getTaskFun(){

}
completedTaskFun(){

}
today(){
  const taskDate = 
  {
  "byUsername":"",
  "forUsername": this.patientDetails.patientID,
  "date": moment(new Date()).format('YYYY-MM-DD')
  }
  this.careService.getTaskForDateApi(taskDate).subscribe((data: any) =>{
    console.log('this is getTask API', data);    
  })
  const payload = {
    "assignedDateTo": moment(new Date()).format('YYYY-MM-DD'),
    "assignedDateFrom":moment(new Date()).format('YYYY-MM-DD'),
    "completedBy":this.patientDetails.patientID,
    "page":1,
    "count":200
  }
  const todayDate = payload.assignedDateFrom
  console.log('&&&&&&&', todayDate);
  
    this.careService.getTaskForCompletedDateApi(payload).subscribe((data)=>{
      console.log('this is completedTask API');     
    })
}

}
