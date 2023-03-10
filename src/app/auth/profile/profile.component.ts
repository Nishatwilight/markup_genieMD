import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbDialogRef, NbDialogService, NbThemeService } from '@nebular/theme';
import { AuthService } from 'src/app/shared/service/auth.service';
import { CareManagerService } from 'src/app/shared/service/care-manager.service';
import { ClinicService } from 'src/app/shared/service/clinic.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class ProfileComponent implements OnInit {
  profileId: string | any;
  profile: any;
  patientName: string | any;
  patientID: any;
  patient: any;
  loading = false;
  singleSelectGroupValue = [];
  patientSearch = '';
  searchvalues : [] | any;
  selectedGender : any;
  caps = false
  lower= false;
  number= false;
  special= false;
  showbtn= false;
  theAddPatient =""
  firstName =''
  lastName = ''
  users : [] | any;
  value= ''
  selectedItemNgModel = ''
  enrollValue = -1;
  getDisplayProfile = ''
  // mainProfile: [] | any;
  names: string[] = [];
  patientProfile: any;
  // ----
  vitalList: any;
  patientVitalList: any = [];
  vitalsOriginal: any[] = [];
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
  // height = '';

  constructor(
    private cd: ChangeDetectorRef, 
    private authService: AuthService,
    private dialogService: NbDialogService,
    private careService: CareManagerService,
    private cs: ClinicService,
    private activatedRoute: ActivatedRoute) 
  {
    this.vitalList = this.cs.getVitals();
    console.log("this.vitalList", this.vitalList);
  }

  // getDisplayProfile(){
  // }
  
  ngOnInit() { 
    this.windowHeight()
    this.profile = this.authService.profile;
    console.log('this.authService.profile', this.profile);  
    this.searchPatient();
  }
  windowHeight(){
    const vh = (window.innerHeight - 150)* 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }

  updateSingleSelectGroupValue(value: any): void {
    this.singleSelectGroupValue = value;
    this.cd.markForCheck();
  }
  updateGenderValue(value: any){
    console.log(value)
    this.selectedGender = value[0]   
    console.log("updateGenderValueWWWWWWWWWWWWW", this.selectedGender);    
  }
  updateEnrollValue(value: any){
    console.log("updateEnrollValue", value);
   this.enrollValue = value[0]

  }
  searchPatient(search?: any) {
    console.log('the selected value is', this.selectedGender); 
    // this.loading = true;
    // console.log("VALLLLLUEEE", valuee);
    console.log('the patientSearch', this.patientSearch);
    console.log('the entered firstname value is', this.firstName );
    console.log('the entered lastname value is', this.lastName);
    console.log("BINDINGGGG", this.selectedItemNgModel);


    const payload = {
      "userID": this.profile?.userID,
      "clinicID": this.profile?.clinicID,
      "firstName": "",
      "lastName": "",
      "dob": "",
      "gender": "",
      "pageNumber": 1,
      "count": 25, 
      "monitored": this.enrollValue,
      "morbidity": -1,
      "providerID": this.profile?.profileId,
      "alarm": -1,
      "careManagerID": this.selectedItemNgModel,
      "term": this.patientSearch
    };
    if(search){
      console.log('SelectedGender---', this.selectedGender );  
      payload.gender = this.selectedGender
      payload.firstName = this.firstName 
      console.log('FirstName----', this.firstName);
      payload.lastName = this.lastName;
      console.log('LastName---', this.lastName);     
    }
    console.log("RRRuserID", this.profile?.userID,  "RRRclinicID", this.profile?.clinicID, "RRRproviderID", this.profile.userName, "RRRterm", this.patientSearch,  "RRRGENDER", this.profile?.gender,);
    this.authService.search(payload).subscribe((data: any) => {
      console.log('data.clinicPatientList', data.clinicPatientList);
      this.searchvalues = data.clinicPatientList || [];
      console.log( "this.searchvalues this.searchvalues", this.searchvalues); 
      this.cd.detectChanges();
      this.loading = false;
    }, error => {
      this.cd.detectChanges();
      this.loading = false;
      throw error;
    });
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
  open(template: TemplateRef<any>) {
    // console.log("CARE PAYLOAD DATAASS",  this.users?.name, this.users?.providerID);  
    this.careService.careManager().subscribe((data: any) => {
      console.log("The CareManager API", data);
      this.users = data.clinicProviderList || [];
      console.log("this.users VARIABLE Value", this.users);
      this.dialogService.open(template);
      
    })
  }  


  valuechange(value: any){
    console.log("theAddPatient", this.theAddPatient);  
    console.log('valuechange FUNCTION', value);
    if(value.length>1){
      console.log('value.length', value.length);
      const upperCase = "^(?=.*[A-Z])" ;
      if(value.match(upperCase)){
        this.caps = true
      }
      else{
        this.caps = false
      }
      const lowerCase = "^(?=.*[a-z])";
      if(value.match(lowerCase)){
        this.lower = true
      }
      else{
        this.lower = false
      }
      const number = "^(?=.*\\d)";
      if(value.match(number)){
        this.number = true
      } 
      else{
        this.number = false
      }
      const special = "^(?=.*[-+_!@#$%^&*., ?])";
      if(value.match(special)){
        this.special = true
      }
      else{
        this.special = false
      }
    }
    
  }



  refreshData(){
    window.location.reload();
    // this.loading = true;
    // this.cd.detectChanges();
    // this.searchPatient();  
    // if(this.searchvalues){
    //   this.loading = false;
  //   }
  }
  onChangeTab(event: any) {
    if (event.tabTitle === 'VITALS') {
    }
    if (event.tabTitle === 'ALERTS') {
    }
  }
}
