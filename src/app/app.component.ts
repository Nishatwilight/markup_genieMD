import { Component } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { AuthService } from './shared/service/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Task1';
  profile: any;
  constructor(public authService: AuthService ){
    
  }
  ngOnInit() { 
    this.profile = this.authService.profile;
    
    console.log('this.authService.profile APP component', this.profile);  
  }
}
