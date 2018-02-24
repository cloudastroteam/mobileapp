import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SoundsLikeAPlanPage } from '../sounds-like-aplan/sounds-like-aplan';
import { RestProvider } from '../../providers/rest/rest';
import {Globals} from '../../app/globals'


@Component({
  selector: 'page-buckets-for-you',
  templateUrl: 'buckets-for-you.html'
  
})
export class BucketsForYouPage {

  retrieveUserApiUrl: string = 'https://36stmzmpec.execute-api.ap-southeast-1.amazonaws.com/deploy/retrieveuser';
  restData = {
    mobile: '',
  };
  

  constructor(public navCtrl: NavController, private restProvider: RestProvider, public navParams: NavParams, private globals: Globals) {
    this.restData.mobile = navParams.get("mobile");
  }
  ngOnInit() {
    this.retrieveUser();  
  }

  retrieveUser() {
    console.log("restData: " + JSON.stringify(this.restData));
    this.restProvider.create(this.retrieveUserApiUrl, this.restData).then(result => {
      console.log("result: " + JSON.stringify(result));
      if (result['STATUS'] == 'SUCCESS') {
        this.globals.uname = result['UNAME'];
       console.log("uname: " + result['UNAME']);
      } else {
      }
    });
  }
  goToSoundsLikeAPlan(params){
    if (!params) params = {};
    this.navCtrl.push(SoundsLikeAPlanPage);
  }
}
