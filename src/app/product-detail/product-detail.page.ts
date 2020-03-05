import { ProductService } from './../../services/domain/product.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProductDTO } from 'src/models/product.dto';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage {

  item: ProductDTO;

  constructor(public activatedRoute: ActivatedRoute, public productService: ProductService) { }

  ionViewDidEnter() {
    let product_id = this.activatedRoute.snapshot.queryParams['id'];
    this.productService.findById(product_id)
      .subscribe(response => {
        this.item = response;
      },
        error => { });
  }

}
