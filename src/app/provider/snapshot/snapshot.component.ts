import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { CareManagerService } from 'src/app/shared/service/care-manager.service';
import { ClinicService } from 'src/app/shared/service/clinic.service';

@Component({
  selector: 'app-snapshot',
  templateUrl: './snapshot.component.html',
  styleUrls: ['./snapshot.component.scss']
})
export class SnapshotComponent {
  patientVitalList: any = [];
  bloodPressure = '';
  spo2 = '';
  glucose = '';
  weight = '';
  temperature ='';
  ecg = '';
  painLevel = '';
  height = '';
  phq9 = '';
  peakFlow = "";
  patientProfile: any;
  vitalList: any;
  details: any;
  patientDetails: any;
constructor( 
  private cd: ChangeDetectorRef,
  private careService: CareManagerService,
  private cs: ClinicService,

  ){
    this.vitalList = this.cs.getVitals();
  }

@Input()
get patientDetailss(){
  return this.details
}
set patientDetailss(value: any){
  if (value){
    console.log('this is SnapShot PatientDetails', value);
    this.getDisplayProfiless(value)
    this.patientVitalList = value
    
  }
}


getDisplayProfiless(data: any){
  console.log("-----------------------", data);
  this.careService.displayProfile(data.patientID).subscribe((res: any) => {
    this.patientProfile = res;
    console.log("The displayProfile API", res);
    this.careService.snapshot(res.userID).subscribe((data: any) => {
      console.log("The SnapShort API", data);
      this.patientVitalList = data.vitalsList;
      console.log('this is patientVitallist VARIABLE', this.patientVitalList);
      const patientVitalList = this.patientVitalList.map((list: any) => {
        console.log("list - C", list);
        
        const vitalName = this.vitalList.find((datas: any) => {
          console.log("This is VitalName VARIABLE", datas);
          
          if (datas.vitalType === list.vitalTypeID) {
            return data;
          } else {
            return '';
          }
        });
        list.vitalName = vitalName?.name;
        console.log("list.VitalNAME VARIABLE Value", list.vitalName);
        
        try {
          list.vitalData = JSON.parse(list.vitalData);
          console.log("list.VitalDATA VARIABLE value", list.vitalData);

        } catch {
          list.vitalData = {};

        }
        return list;
      })
      
      this.patientVitalList = patientVitalList;
      console.log("this.patientVitalList VARIABLE Value", this.patientVitalList);  
      this.aranageVitals()
    })
  })
}
aranageVitals() {

  this.patientVitalList.map((list: any) => {
    if (list.vitalName === "Blood Pressure") {
      const payload = {
        name: 'Blood Pressure',
        time: list.vitalDate,
        value: list.vitalData.S + '/' + list.vitalData.D + '-' + list.vitalData.R
      };
      this.bloodPressure = payload.value;
      this.cd.detectChanges();      
    }
      else if(list.vitalName === "SPO2"){
        const payload = {
          name: 'SPO2',
          value:list.vitalData.O + ' %' + ' - ' +list.vitalData.R
        };
        this.spo2 = payload.value;
        this.cd.detectChanges();
      }
      else if(list.vitalName === 'Glucose'){
        const payload = {
          name: 'Glucose',
          value: list.vitalData.V + list.vitalData.U
        }
        this.glucose = payload.value;
        this.cd.detectChanges()
      }
      else if (list.vitalName === "Weight"){
        const payload = {
          name: 'Weight',
          value: list.vitalData.W + list.vitalData.U
        }
        this.weight = payload.value;
        this.cd.detectChanges()
      }
      else if(list.vitalName === 'Temperature'){
        const payload = {
          name: 'Temperature',
          value: list.vitalData.T
        }
        this.temperature = payload.value;
        this.cd.detectChanges()
      }
      else if(list.vitalName === 'ECG'){
        const payload = {
          name: 'ECG',
          value: list.vitalData.T
        }
        this.ecg = payload.value;
        this.cd.detectChanges()
      }
      else if(list.vitalName === "Pain Level"){
        const payload = {
          name: "Pain Level",
          value: list.vitalData.L
        }
        this.painLevel = payload.value;
        this.cd.detectChanges()
      }
      else if(list.vitalName === "Peak Flow"){
        const payload = {
          name: "Peak Flow",
          value: list.vitalData.PEF + "- " + list.vitalData.FEV1 + " - " + list.vitalData.FVC
        }
        this.peakFlow = payload.value;
        this.cd.detectChanges()
      }
      else if(list.vitalName === "Height"){
        const payload = {
          name: "Height",
          value: list.vitalData.H
        }
        this.height = payload.value;
        this.cd.detectChanges()
      }
      else if(list.vitalName === "PHQ9"){
        const payload = {
          name: "PHQ9",
          value: list.vitalData.Q
        }
        this.phq9 = payload.value;
        this.cd.detectChanges()
      }
  });
}
refreshData(){
//   this.getDisplayProfiless();
  }
}
