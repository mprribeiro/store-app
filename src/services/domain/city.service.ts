import { API_CONFIG } from './../../config/api.config';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CityDTO } from 'src/models/city.dto';


@Injectable()
export class CityService {

    constructor(public http: HttpClient) {
    }

    findAll(state_id : String) : Observable<CityDTO[]> {
        return this.http.get<CityDTO[]>(`${API_CONFIG.baseUrl}/states/${state_id}/cities`);
    }
}