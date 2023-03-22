import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClinicService {

  constructor(private http: HttpClient,) { }
  getVitals() {
    return [
      {
        "id": 1,
        "localizedValue": "kBloodPressure",
        "name": "Blood Pressure",
        "displayName": "Blood Pressure",
        "vitalType": 1,
        "min": 60,
        "max": 200
      },
      {
        "id": 2,
        "localizedValue": "kSPO2",
        "name": "SPO2",
        "displayName": "SPO2",
        "vitalType": 13,
        "min": 10,
        "max": 100
      },
      {
        "id": 3,
        "localizedValue": "kGulcose",
        "name": "Glucose",
        "displayName": "Glucose",
        "vitalType": 2,
        "min": 100,
        "max": 200
      },
      {
        "id": 4,
        "localizedValue": "kWeight",
        "name": "Weight",
        "displayName": "Weight",
        "vitalType": 6,
        "min": 50,
        "max": 200
      },
      {
        "id": 5,
        "localizedValue": "kWeightGain",
        "name": "Weight Gain",
        "displayName": "Weight Gain",
        "vitalType": 32,
        "min": 50,
        "max": 200
      },
      {
        "id": 6,
        "localizedValue": "kTemperature",
        "name": "Temperature",
        "displayName": "Temperature",
        "vitalType": 14,
        "min": -20,
        "max": 80
      },
      {
        "id": 7,
        "localizedValue": "kEcg",
        "name": "ECG",
        "displayName": "ECG",
        "vitalType": 21,
        "min": 0,
        "max": 200
      },
      {
        "id": 8,
        "localizedValue": "kPainLevel",
        "name": "Pain Level",
        "displayName": "Pain Level",
        "vitalType": 30,
        "min": 0,
        "max": 10
      },
      {
        "id": 9,
        "localizedValue": "kPeakFlow",
        "name": "Peak Flow",
        "displayName": "Peak Flow",
        "vitalType": 31,
        "min": 20,
        "max": 1000
      },
      {
        "id": 10,
        "localizedValue": "kHeight",
        "name": "Height",
        "displayName": "Height",
        "vitalType": 7,
        "min": 20,
        "max": 1000
      },
      {
        "id": 11,
        "localizedValue": "kPHQ9",
        "name": "PHQ9",
        "displayName": "PHQ9",
        "vitalType": 55,
        "min": 20,
        "max": 1000
      },
      {
        "id": 12,
        "localizedValue": "kMedicationAdherence",
        "name": "Medication Adherence",
        "displayName": "Medication Adherence",
        "vitalType": 20,
        "min": 20,
        "max": 1000
      }
    ]
  }
  getstarts(payload:any):(Observable<any>){
    return this.http.post(`Encounters/GetStats`, payload)
  }
  encounterApi(payload:any):(Observable<any>){
    return this.http.post(`Encounters/List/Encounters`, payload)
  }
  encountersIframe(payload:any):Observable<any>{
    return this.http.get(`Encounters/Encounter/${payload.userID}/${payload.encounterID}`)
  }
}
