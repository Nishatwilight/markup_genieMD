import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NbContextMenuModule, NbDatepickerModule, NbLayoutModule, NbMenuModule, NbThemeModule, NbUserModule } from '@nebular/theme';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorInterceptor } from './shared/interceptor/interceptor.interceptor';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AuthService } from './shared/service/auth.service';
import { NgChartjsModule } from 'ng-chartjs';


@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NbLayoutModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbEvaIconsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NbDatepickerModule.forRoot(),
    NbUserModule,
    NbMenuModule.forRoot(),
    // NgChartjsModule.registerPlugin([...]),


  ], 
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorInterceptor,
      multi: true,
    },
  
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
