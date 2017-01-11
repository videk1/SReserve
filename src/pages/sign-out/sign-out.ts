import { Component } from '@angular/core';
import { NavController, MenuController, AlertController } from 'ionic-angular';
import {LoginPage} from '../login-page/login-page';

/*
  Generated class for the SignOut page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-sign-out',
  templateUrl: 'sign-out.html'
})
export class SignOutPage {

  constructor(public navCtrl: NavController) {
    this.navCtrl.push(LoginPage);
  }

  ionViewDidLoad() {
    
  }

}
