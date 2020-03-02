import { ClientService } from './../../services/domain/client.service';
import { ClientDTO } from './../../models/client.dto';
import { StorageService } from './../../services/storage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  client: ClientDTO;

  constructor(public storage: StorageService, public clientService: ClientService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      this.clientService.fiendByEmail(localUser.email)
      .subscribe(response => {
        this.client = response;
      },
      error => {})
    }
  }

}
