import { ProductDTO } from './../../models/product.dto';
import { API_CONFIG } from './../../config/api.config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ProductService {
    
    constructor(public http: HttpClient) {
    }

    findByCategory(category_id: string, page: number = 0, linesPerPage: number = 24) {
        return this.http.get(`${API_CONFIG.baseUrl}/products?categories=${category_id}&page${page}&linesPerPage=${linesPerPage}`);
    }

    findById(product_id: number) {
        return this.http.get<ProductDTO>(`${API_CONFIG.baseUrl}/products/${product_id}`);
    }

}