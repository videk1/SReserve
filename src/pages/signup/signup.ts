import { Component, ViewChild } from '@angular/core';

import { Nav, Platform, NavController, MenuController, AlertController } from 'ionic-angular';
import { LoginPage } from '../login-page/login-page';
import { SreserveService } from '../../providers/sreserve-service';
/*

  Generated class for the Signup page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
  providers: [SreserveService]
})
export class SignUp {
  eV: boolean;
  id: any;
  dob: Date;
  gender: string;
  signuppage: any = { username: "", password1: "", password2: "", email: "", validData: false, first: true, getFromSignup: false, name: "", address: "", number: 0 };
  public dataAPi: any;
  constructor(public navCtrl: NavController, public menu: MenuController, public alertCtrl: AlertController, public api: SreserveService) {
    this.menu.swipeEnable(false);
  }
  isEmailValid() {
    this.api.validEmail(this.signuppage.email)
      .then(data => {
        this.dataAPi = data;
        console.log("Tuki sm!");
        if (this.dataAPi.customer.records.length === 0) {
          this.eV = true;
        }
        else {
          this.eV = false;
        }
      });
  }
  ionViewDidLoad() {
    console.log('Hello SignupPage Page');
  }
  goToLogin() {
    if (this.signuppage.first) {
      this.signuppage.first = false;
    }
    if (this.signuppage.password1.length < 5 || this.signuppage.password2.length < 5) {
      this.signuppage.validData = false;
      this.signuppage.password1 = "";
      this.signuppage.password2 = "";
      return;
    }
    if (this.signuppage.password1 != this.signuppage.password2) {
      this.signuppage.validData = false;
      return;
    }
    if (!this.eV) {
      this.signuppage.validData = false;
      return;
    }
    this.api.addAddress(this.signuppage.address, this.signuppage.address, "Ljubljana", 1000, "Slovenija").then(data => {
      this.id = data;
      console.log("Neki blabla");
      this.api.signUp(this.signuppage.name, this.signuppage.email, this.signuppage.password1, this.signuppage.number, 0, this.dob, this.gender === "f" ? 0 : 1, this.id).then(data => {
        var check = data;
        this.signuppage.validData = true;
        this.signuppage.getFromSignup = true;
        this.showAlert();
        this.navCtrl.push(LoginPage);
      })
    });

  }
  getUsername() {
    return this.signuppage.username;
  }
  getfromSignup() {
    return this.signuppage.getFromSignup;
  }
  showAlert() {
    let alert = this.alertCtrl.create({
      title: "Uspešno si naredil račun!",
      subTitle: 'E-mail: ' + this.signuppage.email + "\n Username: " + this.signuppage.username + "\n",
      buttons: ['OK']
    });
    alert.present();
  }

}
