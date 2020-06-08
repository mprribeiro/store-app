import { NavController } from '@ionic/angular';
import { ClientService } from './../../services/domain/client.service';
import { ClientDTO } from './../../models/client.dto';
import { StorageService } from './../../services/storage.service';
import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {

  client: ClientDTO;
  picture: String;
  cameraOn: boolean = false;

  constructor(public storage: StorageService,
    public clientService: ClientService,
    public navCtrl: NavController,
    private camera: Camera,
    private sanitizer: DomSanitizer) { }

  ionViewWillEnter() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      this.clientService.findByEmail(localUser.email)
        .subscribe(response => {
          this.client = response as ClientDTO;
          this.picture = 'data:image/png;base64,' + this.client.clientImg;
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

    const options: CameraOptions = {
      quality: 30,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      this.picture = 'data:image/png;base64,' + imageData;
      let formData = new FormData();
      const byteCharacters = atob(imageData);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], {type: 'image/png'});
      formData.append("file", blob, `client_${this.client.id}.png`);
      this.clientService.updateImg(formData, this.client.id).subscribe(response => {
        console.log(response);
      })
      this.cameraOn = false;
    }, (error) => {
      this.cameraOn = false;
    });
  }

  getGalleryPicture() {
    this.cameraOn = true;

    const options: CameraOptions = {
      quality: 30,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      this.picture = 'data:image/png;base64,' + imageData;
      let formData = new FormData();
      const byteCharacters = atob(imageData);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], {type: 'image/png'});
      formData.append("file", blob, `client_${this.client.id}.png`);
      this.clientService.updateImg(formData, this.client.id).subscribe(response => {
        console.log(response);
      })
      this.cameraOn = false;
    }, (error) => {
      this.cameraOn = false;
    });
  }



}
