import { paymentDTO } from './../../models/payment.dto';
import { ActivatedRoute } from '@angular/router';
import { NavController, NavParams } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { orderDTO } from 'src/models/order.dto';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage {

  order: orderDTO;
  installments: number[] =  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  formGroup: FormGroup;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public activatedRoute: ActivatedRoute) { 
      this.order = this.navParams.get('order');

      this.formGroup = this.formBuilder.group({
        installments: [1, Validators.required],
        "@type": ["paymentWithCard", Validators.required]
      })
    }

  ionViewDidEnter() {
    console.log(this.order);
  }

}
