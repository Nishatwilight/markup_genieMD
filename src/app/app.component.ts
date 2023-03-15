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
  constructor(){
    
  }
  ngOnInit() { 
    
  }
}
