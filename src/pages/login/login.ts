import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BucketsForYouPage } from '../buckets-for-you/buckets-for-you';
import { RestProvider } from '../../providers/rest/rest';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [RestProvider]
})
export class LoginPage {

  validateUserApiUrl: string = ' https://36stmzmpec.execute-api.ap-southeast-1.amazonaws.com/deploy/validateuser';
  validateUserForm: FormGroup;
  errMsg: string;

  restData = {
    mobile: '+91',
    password: ''
  };

  constructor(public navCtrl: NavController, private restProvider: RestProvider, formBuilder: FormBuilder, public loadingCtrl: LoadingController) {
    this.validateUserForm = formBuilder.group({
      'mobile': [null, [Validators.required, Validators.minLength(13),
      Validators.maxLength(13)]],
      'password': [null, Validators.required]
    });

  }
  goToBucketsForYou(params) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    console.log("restData: " + JSON.stringify(this.restData));
    this.restProvider.create(this.validateUserApiUrl, this.restData).then(result => {
      loading.dismiss();
      console.log("result: " + JSON.stringify(result));
      if (result['STATUS'] == 'SUCCESS') {
        if (result['USERVALID'] == 'true') {
          this.navCtrl.push(BucketsForYouPage,{
            mobile: this.restData.mobile
          });
          } else {
          this.errMsg = "Invalid mobile or password";
          console.log("this.errMsg: " + this.errMsg);
        }        
      } else {
        this.errMsg = "We're sorry. Something went wrong with your request. Please try again later";
        console.log("this.errMsg: " + this.errMsg);
      }
    });
  }
}
