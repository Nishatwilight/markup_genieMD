import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './log-in/log-in.component';
import { FormArrayComponent } from './form-array/form-array.component';


const routes: Routes = [
  {
    path: "login",
    component: LogInComponent,
  },
  {
    path: "login/forms",
    component: FormArrayComponent,
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
