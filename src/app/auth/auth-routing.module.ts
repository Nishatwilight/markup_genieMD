import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared/auth.guard';
import { LogInComponent } from './log-in/log-in.component';


const routes: Routes = [
  {
    path: "login",
    component: LogInComponent,

  },
  // {
  //   path: "profile/:id",
  //   component: ProfileComponent,
  //   resolve: {
  //     profileData: ProfileResolver,
  //   }
  // },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
