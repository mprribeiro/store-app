import { NavController } from '@ionic/angular';
import { ProductService } from './../../services/domain/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductDTO } from './../../models/product.dto';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

  items: ProductDTO[];

  constructor(public activateRoute: ActivatedRoute, public productService: ProductService,
    public navCtrl: NavController, public router: Router) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    let category_id = this.activateRoute.snapshot.queryParams['id'];
    this.productService.findByCategory(category_id)
      .subscribe(response => {
        this.items = response['content'];
      },
        error => { });
  }
}
