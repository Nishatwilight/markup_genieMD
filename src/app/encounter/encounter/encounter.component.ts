import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/service/auth.service';
import { ClinicService } from 'src/app/shared/service/clinic.service';

@Component({
  selector: 'app-encounter',
  templateUrl: './encounter.component.html',
  styleUrls: ['./encounter.component.scss']
})
export class EncounterComponent {
  profile: any;
    values: any;
    rows = [];
    // ColumnMode = this.ColumnMode;

  constructor(private authService: AuthService,
    public cs: ClinicService,
    ){}
  ngOnInit(){
    this.profile = this.authService.profile;
   this.encounter()
  }
  encounter(){
    const payload =
    {
    "clinicID":this.profile.clinicID,
    "providerID":this.profile.providerId,
    "types":
    [
    {"type":6,"providerOnly":false,"status":[0,1,4]},
    {"type":0,"providerOnly":false,"status":[0,1]},
    {"type":3,"providerOnly":false,"status":[0,1]},
    {"type":4,"providerOnly":true,"status":[7]},
    {"type":7,"providerOnly":true,"status":[2]},
    {"type":1,"providerOnly":true,"status":[0,1,4]}
    ],
    "userID":this.profile.userID}
    this.cs.getstarts(payload).subscribe((data:any)=> {
      console.log('The value of Getstart API',data);  
    })
   
    const payloads = 
    {
      "clinicID": this.profile.clinicID,
      "name":"",
      "pageNumber":1,
      "pageSize":25,
      "providerID": this.profile.userName,
      "userID": this.profile.userID,
      "providerOnly":false,
      "sortBy":0,
      "status":[0,1,4],
      "type":6
    }
    this.cs.encounterApi(payloads).subscribe((data )=>{
      console.log(' The value of Encounter API', data);
      this.values = data.encounterList
      console.log('the EncounterAPI', this.values);
      
    })
  }
  }
