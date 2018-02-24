import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { BucketsForYouPage } from '../pages/buckets-for-you/buckets-for-you';
import { MyBookingsPage } from '../pages/my-bookings/my-bookings';
import { SoundsLikeAPlanPage } from '../pages/sounds-like-aplan/sounds-like-aplan';
import { BookMyBucketPage } from '../pages/book-my-bucket/book-my-bucket';
import { RegisterPage } from '../pages/register/register';
import { VerifyPage } from '../pages/verify/verify';
import { LoginPage } from '../pages/login/login';
import { PaymentOptionsPage } from '../pages/payment-options/payment-options';
import { HttpModule } from '@angular/http';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RestProvider } from '../providers/rest/rest';
import {Globals} from './globals'

@NgModule({
  declarations: [
    MyApp,
    BucketsForYouPage,
    MyBookingsPage,
    SoundsLikeAPlanPage,
    BookMyBucketPage,
    RegisterPage,
    VerifyPage,
    LoginPage,
    PaymentOptionsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    BucketsForYouPage,
    MyBookingsPage,
    SoundsLikeAPlanPage,
    BookMyBucketPage,
    RegisterPage,
    VerifyPage,
    LoginPage,
    PaymentOptionsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestProvider,
    Globals
  ]
})
export class AppModule {}