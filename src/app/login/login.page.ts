import { AuthService } from './../../services/auth.service';
import { CredentialsDTO } from './../../models/credentials.dto';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public log: string;
  
  creds: CredentialsDTO = {
    email: "",
    password: ""
  };

  constructor(
    private activatedRoute: ActivatedRoute, 
    public menu: MenuController, 
    public auth: AuthService,
    public navCtrl: NavController) { }

  ngOnInit() {
    this.log = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ionViewWillEnter() {
    this.menu.swipeGesture(false);
  }

  ionViewDidLeave() {
    this.menu.swipeGesture(true);
  }

  login() {
    this.auth.authenticate(this.creds).subscribe(response => {
      this.auth.successfilLogin(response.headers.get('Authorization'));
      this.navCtrl.navigateRoot('/categories');
    },
    error => {})
  }

}
