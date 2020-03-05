import { ProductDTO } from './../../models/product.dto';
import { API_CONFIG } from './../../config/api.config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ProductService {
    
    constructor(public http: HttpClient) {
    }

    findByCategory(category_id: string) {
        return this.http.get(`${API_CONFIG.baseUrl}/products?categories=${category_id}`);
    }

    findById(product_id: number) {
        return this.http.get<ProductDTO>(`${API_CONFIG.baseUrl}/products/${product_id}`);
    }

}