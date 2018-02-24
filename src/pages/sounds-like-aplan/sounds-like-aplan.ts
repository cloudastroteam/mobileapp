import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MyBookingsPage } from '../my-bookings/my-bookings';

@Component({
  selector: 'page-sounds-like-aplan',
  templateUrl: 'sounds-like-aplan.html'
})

export class SoundsLikeAPlanPage {

  constructor(public navCtrl: NavController) {
  }

  
  goToPaymentOptions(params){

      let me = this;
      var options = {
        description: 'Payments',
        image: '',
        currency: 'INR',
        key: 'rzp_test_CF6GCl1hxBUwcr',
        amount: '17000',
        name: 'Book My Bucket',
        theme: {
          color: '#488aff'
        },
        modal: {
          ondismiss: function() {
            alert('dismissed')
          }
        }
      };
  
      var successCallback = function(payment_id) {
        me.navCtrl.push(MyBookingsPage);
      };
  
      var cancelCallback = function(error) {
        alert(error.description);
      };
  
      RazorpayCheckout.open(options, successCallback, cancelCallback);        
  }
}
