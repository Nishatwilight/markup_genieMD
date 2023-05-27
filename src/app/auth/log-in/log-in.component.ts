import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/service/auth.service';
import { GuardService } from 'src/app/shared/service/guard.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})

export class LogInComponent implements OnInit {
  formControl!: FormControl<string | null>;
  router(router: any, arg1: string) {
    throw new Error('Method not implemented.');
  }
  registrationForm: FormGroup | any;
  showPassword = false;
  password: any;
  userName: string | any;
  loading = false;
  
constructor(
  
  private authService :AuthService,
  public routing:Router,
  public guardService: GuardService){ 
    console.log('constructore called');

}


  ngOnInit(): void {
    console.log('ngOnInit called');
    this.registrationForm = new FormGroup({
      userName: new FormControl("" , [Validators.required, Validators.minLength(4)]),
      password: new FormControl("" , [Validators.required, Validators.minLength(8)]), 
    });
    console.log("Final Value",this.registrationForm, this.registrationForm.get('password'))
  }
  ngOnChanges(){
    console.log('ngOnChanges Called');
    
  }
  getInputType() {
    if (!this.showPassword) {
      return 'text';
    }
    return 'password';
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }
  clickFunction(event?: any) { 
    this.loading = true;
    console.log('Log UserName',this.registrationForm.value.userName)
    console.log('Log password',this.registrationForm.value.password) 
    const payloads  = {"email": this.registrationForm.value.userName, "password":this.registrationForm.value.password}
    // localStorage.setItem('userData', JSON.stringify(payloads))
    sessionStorage.setItem('userData', JSON.stringify(payloads))
    console.log('Log the time is given as1:', new Date().getMilliseconds());
    console.log("Log payload", payloads );
    
  
    this.authService.login(payloads).subscribe(data => {
      console.log("Log profileDataAAAAAAAAAAAAAA",data, "Log profileDataUserID", data.userID);

      let userID = data.userID;
      console.log('Log the time is given as2:', new Date().getMilliseconds());
      this.routing.navigate([`/provider/${userID}/dashboard/patient`]); 
    })
    console.log('Log the time is given as3:', new Date().getMilliseconds());
  }
  formArray(){
    this.routing.navigate([`/auth/login/forms`]); 

  }
  
}

