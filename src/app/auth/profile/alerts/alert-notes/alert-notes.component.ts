import { Component, OnInit, TemplateRef } from '@angular/core';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { CareManagerService } from 'src/app/shared/service/care-manager.service';

@Component({
  selector: 'app-alert-notes',
  templateUrl: './alert-notes.component.html',
  styleUrls: ['./alert-notes.component.scss']
})
export class AlertNotesComponent implements OnInit {
  alertsDataList: any
 constructor(private dialogService: NbDialogService, public dialog: NbDialogRef<AlertNotesComponent>, 
  private careService: CareManagerService,){}
  ngOnInit(): void {
    console.log('FFFFFFFFFFF', this.alertData);
    this.triggerApiCall();
  }
  triggerApiCall() {
     this.careService.alertActionApi(this.alertData.id).subscribe((data: any)=>{
      console.log("this is Alert Action API data", data);
      this.alertsDataList = data.list;      
    })
  }
  alertData: any;
}

// class Person {
//   age: any;
//   name: any;
//   constructor(name: any, age: any) {
//     this.age = age;
//     this.name = name
//   }
//  uniPlusName() {
//     return this.age + this.name;
//   }
// }

// const male1 = new Person('abc', 1)