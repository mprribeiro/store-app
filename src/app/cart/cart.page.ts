import { CartService } from './../../services/domain/cart.service';
import { StorageService } from './../../services/storage.service';
import { CartItem } from './../../models/cart-item';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage {

  items: CartItem[];

  constructor(public cartService: CartService) { }

  ionViewDidEnter() {
    let cart = this.cartService.getCart();
    this.items = cart.items;
  }

}
