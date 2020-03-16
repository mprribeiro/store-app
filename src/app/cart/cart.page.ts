import { ProductDTO } from './../../models/product.dto';
import { CartService } from './../../services/domain/cart.service';
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

  remove(product: ProductDTO) {
    this.items = this.cartService.removeProduct(product).items;
  }

  increase(product: ProductDTO) {
    this.items = this.cartService.increaseQuantity(product).items;
  }

  decrease(product: ProductDTO) {
    this.items = this.cartService.decreaseQuantity(product).items;
  }

  total(): number {
    return this.cartService.total();
  }

}
