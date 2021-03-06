import { OrderService } from './../services/domain/order.service';
import { CartService } from './../services/domain/cart.service';
import { ProductService } from './../services/domain/product.service';
import { ClientService } from './../services/domain/client.service';
import { StorageService } from './../services/storage.service';
import { AuthService } from './../services/auth.service';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CategoryService } from 'src/services/domain/category.service';
import { ErrorInterceptorProvider } from 'src/interceptors/error-interceptor';
import { HttpModule } from '@angular/http';
import { AuthInterceptorProvider } from 'src/interceptors/auth-interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { Camera } from '@ionic-native/camera/ngx';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    CategoryService,
    StorageService,
    AuthService,
    ClientService,
    ProductService,
    CartService,
    OrderService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AuthInterceptorProvider,
    ErrorInterceptorProvider,
    Camera
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
