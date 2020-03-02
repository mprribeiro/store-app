import { StorageService } from './../storage.service';
import { API_CONFIG } from './../../config/api.config';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClientDTO } from 'src/models/client.dto';

@Injectable()
export class ClientService {
    
    constructor(public http: HttpClient, public storage: StorageService) {
    }

    fiendByEmail(email: String): Observable<ClientDTO> {   
        return this.http.get<ClientDTO>(`${API_CONFIG.baseUrl}/clients/email?value=${email}`);
    }
}
