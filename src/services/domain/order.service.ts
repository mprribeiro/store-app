import { API_CONFIG } from './../../config/api.config';
import { orderDTO } from './../../models/order.dto';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class OrderService {

    constructor(public http: HttpClient) {}

    insert(order: orderDTO) {
        return this.http.post(`${API_CONFIG.baseUrl}/orders`, order, 
        {
            observe: 'response',
            responseType: 'text'
        });
    }
}