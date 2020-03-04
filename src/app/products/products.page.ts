import { ProductService } from './../../services/domain/product.service';
import { ActivatedRoute } from '@angular/router';
import { ProductDTO } from './../../models/product.dto';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

  items: ProductDTO[];

  constructor(public activateRoute: ActivatedRoute, public productService: ProductService) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    let category_id = this.activateRoute.snapshot.paramMap.get('data');
    this.productService.findByCategory(category_id)
      .subscribe(response => {
        this.items = response['content'];
      },
        error => { });
  }
}
