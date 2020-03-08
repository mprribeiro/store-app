import { Router } from '@angular/router';
import { CartService } from './../../services/domain/cart.service';
import { NavController } from '@ionic/angular';
import { StorageService } from './../../services/storage.service';
import { ClientService } from './../../services/domain/client.service';
import { AddressDTO } from './../../models/address.dto';
import { Component } from '@angular/core';
import { orderDTO } from 'src/models/order.dto';

@Component({
  selector: 'app-pick-address',
  templateUrl: './pick-address.page.html',
  styleUrls: ['./pick-address.page.scss'],
})
export class PickAddressPage {

  items: AddressDTO[];
  order: orderDTO;

  constructor(public clientService: ClientService, 
    public storage: StorageService, 
    public navCtrl: NavController,
    public cartService: CartService,
    public router: Router) { }

  ionViewDidEnter() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      this.clientService.fiendByEmail(localUser.email)
        .subscribe(response => {
          this.items = response['addresses'] ;

          let cart = this.cartService.getCart();

          this.order = {
            client: {id: response['id']},
            deliveryAddress: null,
            payment: null,
            items: cart.items.map(x => {return {quantity: x.quantity, product: {id: x.product.id}}})

          }
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

  nextPage(item: AddressDTO) {
    this.order.deliveryAddress = {id: item.id};
    this.router.navigateByUrl('/payment', {state: {order: this.order}});
  }

}
