import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CareManagerService {
  patientProfile: any;

  constructor(private http: HttpClient,
    private authService :AuthService,
    ) { }
    getHeaders() {
      const userID = this.authService.profile.userID;
      let httpHeaders = new HttpHeaders();
      httpHeaders = httpHeaders.set('token', userID);
      return httpHeaders;
    }
  careManager(): Observable<any>{
    return this.http.get(`Clinics/Providers/List/1000254`)
  }
  displayProfile(patientID: any): Observable<any>{
    return this.http.get(`Clinics/ClinicPatient/${this.authService.profile.userID}/${this.authService.profile.clinicID}/${patientID}`)
  }
  snapshot(user: any): Observable<any>{
    return this.http.get(`Vitals/List/Top/${user}`)
  }
  gettingViratalsApi(payload: any): Observable<any>{
    return this.http.post(`Vitals/Search`,  payload, { headers: this.getHeaders() })
  }
  getAlertApi(patientID: any): Observable<any>{
    return this.http.get(`Alerts/List/${this.authService.profile.clinicID}/${patientID}`, { headers: this.getHeaders() })
  }
  // Request URL: http://localhost:59097/ivisit.ComV5.00/resources/Vitals/Search
  getAssessmentApi(payload: any): Observable<any>{
    return this.http.post(`Encounters/PatientEncounters`, payload)
  }
  getDocumentsApi(userID: any): Observable<any>{
    return this.http.get(`MedicalRecords/RecordsList/${userID}`)
  }
  getHistoryApi(patientID: any): Observable<any>{
    return this.http.get(`Audits/GetAudits/${this.authService.profile.userID}/${patientID}`)
  }
  getTaskForDateApi(taskDate: any):Observable<any>{
    return this.http.post(`CarePlan/GetTaskForDate`, taskDate, { headers: this.getHeaders() })
  }
  getTaskForCompletedDateApi(completeDate: any):Observable<any>{
    return this.http.post(`CarePlan/GetCompletedTasks`, completeDate, { headers: this.getHeaders() })
  }
}
