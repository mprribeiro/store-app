import { NavController } from '@ionic/angular';
import { ClientService } from './../../services/domain/client.service';
import { ClientDTO } from './../../models/client.dto';
import { StorageService } from './../../services/storage.service';
import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {

  options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

  client: ClientDTO;
  picture: String;
  cameraOn: boolean = false;

  constructor(public storage: StorageService,
    public clientService: ClientService,
    public navCtrl: NavController,
    private camera: Camera) { }

  ionViewWillEnter() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      this.clientService.findByEmail(localUser.email)
        .subscribe(response => {
          this.client = response as ClientDTO;
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

  getCameraPicture() {
    this.cameraOn = true;
    console.log('entrei 1');

    this.camera.getPicture(this.options).then((imageData) => {
      this.picture = 'data:image/jpeg;base64,' + imageData;
      this.cameraOn = false;
      console.log('entrei 2');
    }, (error) => {});

    /*this.camera.getPicture(this.options).then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.picture = base64Image;
      this.cameraOn = false;
      console.log('entrei 2');
    }, (error) => {
    });*/
  }
}
