import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { CareManagerService } from 'src/app/shared/service/care-manager.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {
  patientProfile: any;
    patientDetails: any;
    rows: any;
    rowsS: any;
    dateValue = moment(new Date()).format("YYYY-MM-DD")
  patientid: any;
  constructor(private careService: CareManagerService,
    private activatedRoute: ActivatedRoute){
      this.activatedRoute.parent?.params.subscribe(params=>{
        console.log('activatedRoute', params);
        this.patientid = params['patienid']
        
      })
    this.taskFun()
  }
 
  
  
  taskFun(type?: any){
    if(type == -1){
      this.dateValue=moment(this.dateValue).subtract(1, 'day').format("YYYY-MM-DD")
    }
    else if(type == 1){
      this.dateValue = moment(this.dateValue).add(1, 'day').format("YYYY-MM-DD")
    }
    else{
      this.dateValue = moment(new Date()).format("YYYY-MM-DD")
    }
    const taskDate = 
    {
    "byUsername":"",
    "forUsername": this.patientid,
    "date": moment(new Date()).format('YYYY-MM-DD')
    }
    this.careService.getTaskForDateApi(taskDate).subscribe((data: any) =>{
      console.log('this is getTask API', data); 
      this.rows = data.list
      console.log("this value of get date API list******", this.rows);
      const listData = this.rows.map((value: any) =>{
        try {
          value.parseExtraData = JSON.parse(value.list);
        } catch(e) {
          value.parseExtraData = {};
        }
        return value;
      })
      this.rowsS = [...listData];  
      console.log("JSon parse list data@@@@@", this.rowsS);
      
    })
    const payload = {
      "assignedDateTo": moment(new Date()).format('YYYY-MM-DD'),
      "assignedDateFrom":moment(new Date()).format('YYYY-MM-DD'),
      "completedBy":this.patientid,
      "page":1,
      "count":200
    }
    const todayDate = payload.assignedDateFrom
    console.log('&&&&&&&', todayDate);
    
      this.careService.getTaskForCompletedDateApi(payload).subscribe((data)=>{
        console.log('this is completedTask API');     
      })
  }
  getDateValue(value: any){
    const time = moment(value,  'HH:mm:ss').format("hh:mm A")
    return time
  }
  }
