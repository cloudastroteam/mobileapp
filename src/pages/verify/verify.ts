import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BucketsForYouPage } from '../buckets-for-you/buckets-for-you';
import { RestProvider } from '../../providers/rest/rest';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-verify',
  templateUrl: 'verify.html',
  providers: [RestProvider]
})
export class VerifyPage {

  activateUserApiUrl: string = 'https://36stmzmpec.execute-api.ap-southeast-1.amazonaws.com/deploy/activateuser';
  verifyForm : FormGroup;
  errMsg: string;

  restData = {
    mobile: '',
    otp:'',
  };

  constructor(public navCtrl: NavController, private restProvider: RestProvider, public navParams: NavParams, formBuilder: FormBuilder,  public loadingCtrl: LoadingController) {
    this.restData.mobile = navParams.get("mobile");
    this.verifyForm = formBuilder.group({
      'otp' : [null, Validators.required]
    });
    
  }
  goToBucketsForYou(params){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    console.log("restData: " + JSON.stringify(this.restData));
    this.restProvider.create(this.activateUserApiUrl, this.restData).then(result => {
      loading.dismiss();
      console.log("result: " + JSON.stringify(result));
      if (result['STATUS'] == 'SUCCESS') {
        if (result['OTPVALID'] == 'true') {
          this.navCtrl.push(BucketsForYouPage,{
            mobile: this.restData.mobile
          });
          } else {
          this.errMsg = "Invalid OTP";
          console.log("this.errMsg: " + this.errMsg);
        }        
      } else {
        this.errMsg = "We're sorry. Something went wrong with your request. Please try again later";
        console.log("this.errMsg: " + this.errMsg);
      }
    });
  }
}
