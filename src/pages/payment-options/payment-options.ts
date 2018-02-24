import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MyBookingsPage } from '../my-bookings/my-bookings';


@Component({
  selector: 'page-payment-options',
  templateUrl: 'payment-options.html'
})
export class PaymentOptionsPage {

  constructor(public navCtrl: NavController) {
  }
  goToMyBookings(params){
    if (!params) params = {};
    this.navCtrl.push(MyBookingsPage);
  }
}
