import { CategoryDTO } from './../../models/category.dto';
import { CategoryService } from './../../services/domain/category.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage {

  items: CategoryDTO[];

  constructor(public categoryService: CategoryService) { }

  ionViewWillEnter() {
    this.categoryService.findAll()
    .subscribe(response => {
      this.items = response;},
    error => {
      console.log(error)});
  }

}
