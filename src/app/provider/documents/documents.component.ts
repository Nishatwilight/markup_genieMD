import { Component, Input } from '@angular/core';
import { CareManagerService } from 'src/app/shared/service/care-manager.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent {
  patientDetails: any;
  patientDetail: any;
  @Input()
  get gettingPatientDetails(){
    return this.patientDetails
  }
  set gettingPatientDetails(value: any){
    if(value){
      this.patientDetail = value
      console.log('this is patientDetails', this.patientDetail);
      
    }
  }
constructor(private careService: CareManagerService){}
documentsFun(){
  this.careService.getDocumentsApi(this.patientDetail.userID).subscribe((data: any) =>{
    console.log('this is document API patient data', data);  
  })
}
}
