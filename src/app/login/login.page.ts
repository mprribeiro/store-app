import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public log: string;

  constructor(private activatedRoute: ActivatedRoute, public navCtrl: NavController) { }

  login() {
    this.navCtrl.navigateRoot('/categories');
  }
    
  ngOnInit() {
    this.log = this.activatedRoute.snapshot.paramMap.get('id');
  }

}
