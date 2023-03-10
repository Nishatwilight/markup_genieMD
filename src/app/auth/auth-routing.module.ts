import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileResolver } from '../shared/resolver/profile.resolver';
import { LogInComponent } from './log-in/log-in.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: "login",
    component: LogInComponent
  },
  {
    path: "profile/:idddddd",
    component: ProfileComponent,
    resolve: {
      profileData: ProfileResolver,
    }
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
