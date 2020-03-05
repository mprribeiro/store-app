import { ProductDTO } from './../../models/product.dto';
import { StorageService } from './../storage.service';
import { Injectable } from "@angular/core";
import { Cart } from 'src/models/cart';

@Injectable()
export class CartService {

    constructor(public storage: StorageService) {
    }

    createOrClearCart(): Cart {
        let cart: Cart = {items: []};
        this.storage.setCart(cart);
        return cart;
    }

    getCart(): Cart {
        let cart: Cart = this.storage.getCart();
        if (cart == null) {
            this.storage.setCart(cart);
        }
        return cart;
    }

    addProduct(product: ProductDTO): Cart {
        let cart: Cart = this.getCart();
        let position = cart.items.findIndex(x => x.product.id == product.id);
        if (position == -1) {
            cart.items.push({quantity:1, product: product});
        }
        this.storage.setCart(cart);
        return cart;
    }
}