import { OrderService } from './../../services/domain/order.service';
import { StorageService } from './../../services/storage.service';
import { NavController } from '@ionic/angular';
import { ClientService } from './../../services/domain/client.service';
import { AddressDTO } from './../../models/address.dto';
import { ClientDTO } from './../../models/client.dto';
import { CartService } from './../../services/domain/cart.service';
import { CartItem } from './../../models/cart-item';
import { orderDTO } from 'src/models/order.dto';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.page.html',
  styleUrls: ['./order-confirmation.page.scss'],
})
export class OrderConfirmationPage implements OnInit {

  order: orderDTO;
  cartItems: CartItem[];
  client: ClientDTO;
  address: AddressDTO;
  orderCode: String;

  constructor(public cartService: CartService,
    public clientService: ClientService,
    public navCtrl: NavController,
    public storage: StorageService,
    public orderService: OrderService
    ) {}

    ngOnInit() {
      this.order = this.storage.getOrder();
      console.log(this.order);
    }

  ionViewDidEnter() {
    this.cartItems = this.cartService.getCart().items;
    this.clientService.findById(this.order.client.id).subscribe(response => {
      this.client = response as ClientDTO;
      this.address = this.findAddress(this.order.deliveryAddress.id, response['addresses']);
    },
    error => {
      this.navCtrl.navigateRoot("");
    })
  }

  private findAddress(id: String, list: AddressDTO[]): AddressDTO {
    let position = list.findIndex(x => x.id == id);
    return list[position];
  }

  totalValue() {
    return this.cartService.total();
  }

  checkout() {
    this.orderService.insert(this.order).subscribe(response => {
      this.cartService.createOrClearCart();
      this.orderCode = this.extractId(response.headers.get('location'));
    })
  }

  private extractId(location: String): String {
    let position = location.lastIndexOf('/');
    return location.substring(position + 1, location.length);
  }

}
