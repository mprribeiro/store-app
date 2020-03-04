import { ProductDTO } from './../../models/product.dto';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

  items: ProductDTO[];

  constructor() { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.items = [
      {
        id: "1",
        name: "Mouse",
        price: 80.99
      },
      {
        id: "2",
        name: "Teclado",
        price: 100.00
      }
    ]
  };

}
