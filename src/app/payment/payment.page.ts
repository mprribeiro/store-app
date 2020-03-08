import { NavController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { orderDTO } from 'src/models/order.dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {

  order: orderDTO;
  installments: number[] =  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  formGroup: FormGroup;

  constructor(public navCtrl: NavController,
    public formBuilder: FormBuilder,
    public router: Router) { 

      this.formGroup = this.formBuilder.group({
        installments: [1, Validators.required],
        "@type": ["paymentWithCard", Validators.required]
      });
    }

  ngOnInit() {
    this.order = history.state['order'];
  }

  nextPage() {
    this.order.payment = this.formGroup.value;
    this.router.navigateByUrl('/order-confirmation', {state: {order: this.order}});
  }

}
