import { TestBed } from '@angular/core/testing';
import { CareManagerService } from './care-manager.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

fdescribe('CareManagerService', () => {
  let service: CareManagerService;
  let url = `http://localhost:9876/#/ivisit.ComV5.00/resources/`;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CareManagerService]
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(CareManagerService);
  });

  // it('should be created', () => {
  //   expect(service).toBeTruthy();
  // });

  it('should create the post getAssessmentApi', (done) => {

    let apiResponse = {
      "encounter":"",
      "employeeCode":"",
      "companyCode":"",
      "pharmacyCode":"",
      "promoCode":"",
      "referralCode":"",
      "icd10":"",
      "cptCode":"",
      "snomed":""
    }
    const payloads = {
      'clinicID': "1000254",
      'patientID': "h2",
      'userID': "001bb4bffb6b4f22910df57a118cff90"
    }
    service.getAssessmentApi(payloads).subscribe((data: any) => {
      console.log('data', data)
      expect(data).equal(apiResponse);
      done();
    });
    const req = httpTestingController.expectOne({
      method: 'POST', 
   });
   console.log('the req is givne as:', req);
   
    // const testRequest = httpTestingController.expectOne(`${url}Encounters/PatientEncounters`);
    expect(req.request.url.endsWith("Encounters/PatientEncounters")).equal(true);
    req.flush(apiResponse);
  });
  
});
