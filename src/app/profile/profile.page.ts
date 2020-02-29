import { StorageService } from './../../services/storage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  email: String;

  constructor(public storage: StorageService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      this.email = localUser.email;
    }
  }

}
