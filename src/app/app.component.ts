import { Component } from '@angular/core';
import { NbThemeService } from '@nebular/theme';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Task1';

  constructor(private themeService: NbThemeService){
    this.themeService.onThemeChange()
    .subscribe((theme: any) => {
      console.log(`Theme changed to ${theme.name}`);
    });
  }
}
