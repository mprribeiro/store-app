import { NavController, LoadingController } from '@ionic/angular';
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

  items: ProductDTO[] = [];
  page: number = 0;

  constructor(public activateRoute: ActivatedRoute,
    public productService: ProductService,
    public navCtrl: NavController,
    public router: Router,
    public loadingController: LoadingController) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.loadData();
  }

  loadData() {
    let category_id = this.activateRoute.snapshot.queryParams['id'];
    let loader = this.presentLoading();
    this.productService.findByCategory(category_id, this.page, 10)
      .subscribe(response => {
        this.loaderDismiss(loader);
        this.items = this.items.concat(response['content']);
      },
        error => { });
  }

  async presentLoading() {
    let loader = await this.loadingController.create({
      message: "Please wait...",
      spinner: 'circles'
    });
    await loader.present();
    return loader;
  }

  async loaderDismiss(loader) {
    loader = await this.loadingController.dismiss();
    return loader;
  }

  doRefresh(event) {
    this.page = 0;
    this.items = [];
    this.loadData();
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

  doInfinity(event) {
    setTimeout(() => {
      event.target.complete();

      if (this.items.length == 1000) {
        event.target.disabled = true;
      }
    }, 500);
  }

}
