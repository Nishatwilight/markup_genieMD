import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/shared/service/auth.service';
import { CareManagerService } from 'src/app/shared/service/care-manager.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent {
  patientDetails: any;
  patientDetail: any;
  profile: any;
  userid: any;
  rows: any;

constructor(private careService: CareManagerService,
  private activeRoute: ActivatedRoute,
  private cd: ChangeDetectorRef){
  this.documentsFun()
  this.activeRoute.parent?.params.subscribe(params=>{
  console.log("'''''''''''", params);
  this.userid = params['id']


  })
}
ngOnInit(){
}
documentsFun(){
  this.careService.getDocumentsApi(this.userid).subscribe((data: any) =>{
    console.log('this is document API patient data', data);  
    this.rows = data.medicalRecordsList
    this.cd.detectChanges()
    console.log("document API", this.rows);
    
  })
}
}
