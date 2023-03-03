import { Component, Input } from '@angular/core';
import { CareManagerService } from 'src/app/shared/service/care-manager.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent {
  patientProfile: any;
  details: any;
  @Input()
  get gettingPatientDetails(){
    return this.patientProfile
  }
  set gettingPatientDetails(value: any){
    if(value){
      this.details = value
    }
  }
constructor(private careService: CareManagerService){}

historyFun(){
  this.careService.getHistoryApi(this.details.patientID).subscribe((data)=>{
    console.log('This is HistoryFun API', data);
    
  })
}
}
