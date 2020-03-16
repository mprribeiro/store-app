import { CartService } from './domain/cart.service';
import { AlertController, NavController } from '@ionic/angular';
import { StorageService } from './storage.service';
import { LocalUser } from './../models/local_user';
import { API_CONFIG } from './../config/api.config';
import { CredentialsDTO } from './../models/credentials.dto';
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class AuthService {

    jwtHelper: JwtHelper = new JwtHelper();

    constructor(
        public http: HttpClient, 
        public storage: StorageService, 
        public alertCtrl: AlertController,
        public navCtrl: NavController,
        public cartService: CartService) {
    }

    authenticate(creds: CredentialsDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/login`, 
            creds, 
            {
                observe: 'response',
                responseType: 'text'
            });
    }

    refreshToken() {
        return this.http.post(
            `${API_CONFIG.baseUrl}/auth/refresh_token`, 
            {},
            {
                observe: 'response',
                responseType: 'text'
            });
    }

    successfulLogin(authorizationValue: String) {
        let token = authorizationValue.substring(7);
        let user : LocalUser = {
            token: token,
            email: this.jwtHelper.decodeToken(token).sub
        };
        this.storage.setLocalUser(user);
        this.cartService.createOrClearCart();
    }

    async logout(page: string) {
        const alert = await this.alertCtrl.create({
            subHeader: 'Logout',
            message: 'Are you sure?',
            backdropDismiss: false,
            buttons: [
                {   text: 'Yes, I am.',
                    handler: () => {
                        this.storage.setLocalUser(null);
                        this.navCtrl.navigateRoot(page);
                    }
                },
                {
                    text: 'Cancel'
                }
            ]
        });
        await alert.present();
    }
}