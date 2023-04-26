import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LandingComponent } from './landing.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NB_MEDIA_BREAKPOINTS, NB_THEME_OPTIONS, NbLayoutModule, NbMediaBreakpointsService, NbSidebarService, NbThemeOptions, NbThemeService } from '@nebular/theme';
import { HttpClient } from '@angular/common/http';
import { InjectionToken } from '@angular/core';
import { NbMediaBreakpoint } from '@nebular/theme';





fdescribe('LandingComponent', () => {
  let component: LandingComponent;
  let fixture: ComponentFixture<LandingComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingComponent ],
      imports:[NbLayoutModule, HttpClientTestingModule],
      providers: [HttpClient, NbSidebarService, NbThemeService, NbMediaBreakpointsService,   
        {
          provide: NB_THEME_OPTIONS,
          useValue: {
            name: 'default',
          },
        },
        {
          provide: NB_MEDIA_BREAKPOINTS,
          useValue: {
            xs: { name: 'xs', width: 0 },
            sm: { name: 'sm', width: 576 },
            md: { name: 'md', width: 768 },
            lg: { name: 'lg', width: 992 },
            xl: { name: 'xl', width: 1200 },
            xxl: { name: 'xxl', width: 1600 },
          },
        },
    ]
    })

    .compileComponents();

    fixture = TestBed.createComponent(LandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
