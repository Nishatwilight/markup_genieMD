import { Component, TemplateRef } from '@angular/core';
import { NbDialogRef, NbDialogService } from '@nebular/theme';

@Component({
  selector: 'app-alert-notes',
  templateUrl: './alert-notes.component.html',
  styleUrls: ['./alert-notes.component.scss']
})
export class AlertNotesComponent {
 constructor(private dialogService: NbDialogService, public dialog: NbDialogRef<AlertNotesComponent>){}
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