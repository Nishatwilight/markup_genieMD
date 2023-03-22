import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/shared/service/auth.service';
import { CareManagerService } from 'src/app/shared/service/care-manager.service';
import { ClinicService } from 'src/app/shared/service/clinic.service';

@Component({
  selector: 'app-iframe',
  templateUrl: './iframe.component.html',
  styleUrls: ['./iframe.component.scss']
})

export class IframeComponent implements OnInit {
  profile: any;
  encounterID: any;
  urlSafe:any
  url: string | any;


  constructor(
    private cs: ClinicService,
    private authService: AuthService,
    private routing: ActivatedRoute,
    public sanitizer: DomSanitizer
  ) {
    this.profile = this.authService.profile;
    this.routing.params.subscribe(params => {
      console.log('params--', params);
      this.encounterID = params['encounterId'];
    });

  }
  ngOnInit(): void {
    this.encounterIframes()
  }

  encounterIframes() {
    const payload = {
      userID: this.profile.userID,
      encounterID: this.encounterID,
    }
    console.log('payload--', payload);
    const url = `https://dev.geniemd.net/ivisit.ComV5.00/resources/Encounters/Details/${this.profile.userID}/${this.encounterID}/false`
    console.log('the given url in the iframe ', url);
     this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    this.cs.encountersIframe(payload).subscribe((res: any) => {
      console.log('checking the iframe ', res);

    }, (error) => {
      console.log('error exeption');
    });
  }
  }
