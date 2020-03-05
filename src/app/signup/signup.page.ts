import { AlertController, NavController } from '@ionic/angular';
import { ClientService } from './../../services/domain/client.service';
import { CityDTO } from './../../models/city.dto';
import { StateDTO } from './../../models/state.dto';
import { StateService } from './../../services/domain/state.service';
import { CityService } from './../../services/domain/city.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  formGroup: FormGroup;
  states: StateDTO[];
  cities: CityDTO[];

  constructor(public formBuilder: FormBuilder,
    public cityService: CityService,
    public stateService: StateService,
    public clientService: ClientService,
    public alertCtrl: AlertController,
    public navCtrl: NavController) { 
    this.formGroup = this.formBuilder.group({
      name: ['Thomas' , [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
      email: ['thomas@gmail.com', [Validators.required, Validators.email]],
      type : ['1', [Validators.required]],
      register : ['06134596280', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
      password : ['123', [Validators.required]],
      street : ['Rua Via', [Validators.required]],
      number : ['25', [Validators.required]],
      complement : ['Apto 3', []],
      neighborhood : ['Copacabana', []],
      cep : ['10828333', [Validators.required]],
      phone1 : ['977261827', [Validators.required]],
      phone2 : ['', []],
      phone3 : ['', []],
      stateId : [null, [Validators.required]],
      cityId : [null, [Validators.required]]      
    });
  }

  ngOnInit() {
  }

  signupUser() {
    this.clientService.insert(this.formGroup.value).subscribe(response => {
      this.showInsertOk();
    })
  }

  ionViewDidEnter() {
    this.stateService.findAll()
    .subscribe(response => {
      this.states = response;
    },
    error => {})
  }

  updateCities() {
    let state_id = this.formGroup.value.stateId;
    this.cityService.findAll(state_id).subscribe(response => {
      this.cities = response;
      this.formGroup.controls.cityId.setValue(null);
    },
    error => {})
  }

  async showInsertOk() {
    const alert = await this.alertCtrl.create({
        subHeader: 'Success',
        message: 'Registered with success!',
        backdropDismiss: false,
        buttons: [
            {   text: 'Ok',
                handler: () => {
                  this.navCtrl.pop();
                }
            }
        ]
    });
    await alert.present();
}

}
