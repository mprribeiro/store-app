import { NavController } from '@ionic/angular';
import { CategoryDTO } from './../../models/category.dto';
import { CategoryService } from './../../services/domain/category.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage {

  items: CategoryDTO[];

  constructor(public categoryService: CategoryService, public navCtrl: NavController,
    public router: Router) { }

  ionViewWillEnter() {
    this.categoryService.findAll()
    .subscribe(response => {
      this.items = response;},
    error => {});
  }

  showProducts(category_id: string) {
    let data = JSON.stringify(category_id);
    this.router.navigate(['/products', data]);

  }

}
