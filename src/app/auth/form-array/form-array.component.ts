import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormControlName, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-array',
  templateUrl: './form-array.component.html',
  styleUrls: ['./form-array.component.scss']
})
// export class FormArrayComponent implements OnInit {
//   demoForm!: FormGroup;
//   constructor(private fb: FormBuilder) {
//     this.demoForm = this.fb.group({
//       formArray1: this.fb.array([]),
//     })
//   }
//   ngOnInit() {
//   }
//   get formArray1(){
//     return this.demoForm.get('formArray1') as FormArray
// }
//   formgrp(): FormGroup{
//     return this.fb.group({
//       fname:'',
//       lname:'',
//       phNumber:'', 
//       formArray2: this.fb.array([])
//     })
//   }

//   overAll(){
//     this.formArray1.push(this.formgrp)
//     console.log(this.formArray1.push(this.formgrp)
//     ); 
//   }

//   get formArray2(){
//     return this.demoForm.get('formArray2') as FormArray
//   }
//   qualification(): FormGroup{
//     return this.fb.group({
//       qualify: ''
//     })
//   }
//   addQualification(i: number){
//     this.details(i).push(this.qualification())
//   }
//   remove(i : number){
//     this.formArray1.removeAt(i)

//   }
//   details(i:number): FormArray{
// return this.formArray1.at(i).get('formArray2') as FormArray
//   }
//   insideRemove(i: number, x:number){
//     this.details(i).removeAt(x)
//   }

// }
export class FormArrayComponent implements OnInit {
  demoForm: FormGroup = this.fb.group({});

  constructor(private fb: FormBuilder,) {}
  ngOnInit() {
    this.demoForm = this.fb.group({
      name: '',
      mobile: '',
      sdf:'',
      rows: this.fb.array([]),
    })

    // console.log('this demoform', this.demoForm);
  }
  get formArray1() {
    return (this.demoForm.get('rows') as FormArray)
  }
  formgrp(): FormGroup {
    return this.fb.group({
      firstName: '',
      lastName: '',
      password: '',
      formArray2: this.fb.array([])
    });

  }
  overAll() {
    // console.log(this.formArray1);
    this.formArray1.push(this.formgrp());
    // console.log(this.formgrp());
    // console.log('this demoform', this.demoForm);
  }
  remove(i: number) {
    this.formArray1.removeAt(i);
  }

  details(i: number): FormArray {
    return this.formArray1.at(i).get("formArray2") as FormArray;
  }

  newgrp(): FormGroup {
    return this.fb.group({
      age: "",
      gender: ""
    })
  }

  addQualification(i: number) {
    this.details(i).push(this.newgrp());
  }
  
  insideRemove(i: number, x: number) {
    this.details(i).removeAt(x);
  }
}
