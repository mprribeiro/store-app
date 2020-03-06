import { NavController } from '@ionic/angular';
import { StorageService } from './../../services/storage.service';
import { ClientService } from './../../services/domain/client.service';
import { AddressDTO } from './../../models/address.dto';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pick-address',
  templateUrl: './pick-address.page.html',
  styleUrls: ['./pick-address.page.scss'],
})
export class PickAddressPage {

  items: AddressDTO[];

  constructor(public clientService: ClientService, public storage: StorageService, public navCtrl: NavController) { }

  ionViewDidEnter() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      this.clientService.fiendByEmail(localUser.email)
        .subscribe(response => {
          this.items = response['addresses'] ;
        },
          error => { 
            if (error.status == 403) {
              this.navCtrl.navigateRoot("");
            }
          })
    } else {
      this.navCtrl.navigateRoot("");
    }
  }

}
