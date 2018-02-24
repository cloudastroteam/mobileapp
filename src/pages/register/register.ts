import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { VerifyPage } from '../verify/verify';
import { RestProvider } from '../../providers/rest/rest';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingController } from 'ionic-angular';


@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  registerUserApiUrl: string = 'https://36stmzmpec.execute-api.ap-southeast-1.amazonaws.com/deploy/registeruser';
  checkUserApiUrl: string = 'https://36stmzmpec.execute-api.ap-southeast-1.amazonaws.com/deploy/checkuser';

  errMsg: string;
  registerForm : FormGroup;
  restData = {
    name: '',
    email: '',
    mobile: '+91',
    password: ''
  };

  
  constructor(public navCtrl: NavController,private restProvider: RestProvider, formBuilder: FormBuilder, public loadingCtrl: LoadingController) {
    this.registerForm = formBuilder.group({
      'name' : [null, Validators.required],
      'email': [null, [Validators.required,Validators.email]],
      'mobile' : [null, [Validators.required,Validators.minLength(13),
        Validators.maxLength(13)]],
      'password' : [null, Validators.required]
    });
  }

  
  goToVerify(params){
    console.log("restData: " + JSON.stringify(this.restData));
    this.checkUser();
  }

  registerUser(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.restProvider.create(this.registerUserApiUrl, this.restData).then(result => {
      loading.dismiss();
      console.log("result: " + JSON.stringify(result));
      if (result['STATUS'] == 'SUCCESS') {
        this.navCtrl.push(VerifyPage,{
          mobile: this.restData.mobile
        });
      } else {
        this.errMsg = "We're sorry. Something went wrong with your request. Please try again later";
        console.log("this.errMsg: " + this.errMsg);
      }
    });
  }

  checkUser(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    console.log("restData: " + JSON.stringify(this.restData));
    this.restProvider.create(this.checkUserApiUrl, this.restData).then(result => {
      loading.dismiss();
      console.log("result: " + JSON.stringify(result));
      if (result['STATUS'] == 'SUCCESS') {
        if(result['ISEXISTS'] == 'false'){
          this.registerUser();
        }else{
          this.errMsg = "Mobile number is already registered";
          console.log("this.errMsg: " + this.errMsg);
        }
      } else {
        this.errMsg = "We're sorry. Something went wrong with your request. Please try again later";
        console.log("this.errMsg: " + this.errMsg);
      }
    });
  }
}
