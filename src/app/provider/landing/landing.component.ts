import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NbMenuItem, NbSidebarService } from '@nebular/theme';
import { AuthService } from 'src/app/shared/service/auth.service';
import { CareManagerService } from 'src/app/shared/service/care-manager.service';
import { ClinicService } from 'src/app/shared/service/clinic.service';
import { GuardService } from 'src/app/shared/service/guard.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {
  profile: any;
  values: any;
  items: NbMenuItem[] = []
  constructor( private authService: AuthService,
    private sidebarService: NbSidebarService,
    public cs: ClinicService,
    private guardService: GuardService,
    public routing: Router){}
  ngOnInit(){
    this.profile = this.authService.profile;
    console.log('this.authService.profile APP component', this.profile); 
    this.items = [
      
      {
        title: 'Encounters',
        icon: 'book-outline',  
        link: `/provider/${this.profile.userID}/dashboard/encounters/waitingroom`,
      },
    
      {
        title: 'Patients',
        icon: 'people-outline',
        link: `/provider/${this.profile.userID}`
        // link: `/provider/${this.profile.userID}/patient`,

      },
      {
        title: 'Chat',
          icon: 'message-circle-outline',
      },
      {
        title: 'MyTasks',
        icon: 'layers-outline',
      },
      {
        title: 'Escalations',
        icon: 'alert-circle-outline',
      },
      {
        title: 'Laboratory',
          icon: 'cube-outline',
      },
      {
        title: 'Reports',
        icon: 'file-text-outline',
      },
     
      {
        title: 'Help',
          icon: 'book-open-outline',
      },
      {
        title: 'Logout',
        icon: 'power-outline',
        link: `/auth/login`,
       
      },
    
    ];  
  }
  logout(){
    // this.guardService.clearAuthToken();
    this.routing.navigate([`/auth/login`]);

  }  
 
  toggle() {
    console.log("Toggle works");
    this.sidebarService.toggle(false, 'left');
  }

  route(event?:any) {
    this.routing.navigate([`provider/${this.profile.userID}/dashboard/patient`]);
  }
}
