import { FieldMessage } from './../models/fieldmessage';
import { StorageService } from './../services/storage.service';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { catchError } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(public storage: StorageService, public alertCtrl: AlertController) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        return next.handle(req)
                .pipe(
                    catchError(error => {
                        let errorObj = error;
                        if (errorObj.error) {
                            errorObj = errorObj.error;
                        }
                        if (!errorObj.status) {
                            errorObj = JSON.parse(errorObj);
                        }

                        switch(errorObj.status){
                            case 403: 
                            this.handle403();
                            break;

                            case 401: 
                            this.handle401();
                            break;

                            case 422:
                            this.handle422(errorObj);
                            break;

                            default:
                            this.handleDefaultError(errorObj);
                        }
 
                        return Observable.throw(errorObj);
                    })) as any;
    }

    async handle401() {
        const alert = await this.alertCtrl.create({
            subHeader: 'Error 401: Authentication Failure',
            message: 'Email or password incorrect',
            backdropDismiss: false,
            buttons: ['Ok']
        });
        await alert.present();
    }

    handle403() {
        this.storage.setLocalUser(null);
    }

    async handle422(errorObj) {
        const alert = await this.alertCtrl.create({
            subHeader: 'Error 422: Validation Error',
            message: this.listErrors(errorObj.error),
            backdropDismiss: false,
            buttons: ['Ok']
        });
        await alert.present();
    }

    async handleDefaultError(errorObj) {
        let alert = await this.alertCtrl.create({
            header: 'Erro ' + errorObj.status + ': ' + errorObj.error,
            message: errorObj.message,
            backdropDismiss: false,
            buttons: [
                {
                    text: 'Ok'
                }
            ]
        });
        await alert.present();        
    }

    private listErrors(messages: FieldMessage[]): string {
        let s: string = '';
        for (var i=0; i<messages.length; i++) {
            s = s + '<p><strong>' + messages[i].fieldName + "</strong>: " + messages[i].message + '</p>';     
        }
        return s;
    }

}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};