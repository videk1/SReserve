import { Component, trigger, state, style, transition, animate, keyframes } from '@angular/core';
import { NavController, MenuController, AlertController } from 'ionic-angular';



import { SidePage } from '../sidepage/sidepage';
import { SignUp } from '../signup/signup';
import { Page1 } from '../page1/page1';
import { MyApp } from '../app/app.component';
import { ListPage } from '../list/list';
import { UsersPage } from '../users/users';
import {SreserveService} from '../../providers/sreserve-service';
import {SignOutPage} from '../sign-out/sign-out';
import {global} from '../../app/global';



/*
  Generated class for the LoginPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login-page',
  templateUrl: 'login-page.html',
  providers: [SreserveService],
  animations: [
 
    //For the logo
    trigger('flyInBottomSlow', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('void => *', [
        style({transform: 'translate3d(0,2000px,0'}),
        animate('2000ms ease-in-out')
      ])
    ]),
 
    //For the background detail
    trigger('flyInBottomFast', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('void => *', [
        style({transform: 'translate3d(0,2000px,0)'}),
        animate('1000ms ease-in-out')
      ])
    ]),
 
    //For the login form
    trigger('bounceInBottom', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('void => *', [
        animate('2000ms 200ms ease-in', keyframes([
          style({transform: 'translate3d(0,2000px,0)', offset: 0}),
          style({transform: 'translate3d(0,-20px,0)', offset: 0.9}),
          style({transform: 'translate3d(0,0,0)', offset: 1}) 
        ]))
      ])
    ]),
 
    //For login button
    trigger('fadeIn', [
      state('in', style({
        opacity: 1
      })),
      transition('void => *', [
        style({opacity: 0}),
        animate('1000ms 2000ms ease-in')
      ])
    ])
  ],
})
export class LoginPage {
  properties: any;
  logoState: any = "in";
  cloudState: any = "in";
  loginState: any = "in";
  formState: any = "in";
  dataAPi: any;
  mainAccount: Account;
  loginpage: any = {username: "", password: "", validData: false, first: true};
  
  loggedin: boolean;
 
  constructor(public navCtrl: NavController, public menu: MenuController, public api: SreserveService) {
	 this.menu.swipeEnable(false);
  }
  
  ionViewDidLoad() {
    
  }
  canLogin(){
    this.api.login(this.loginpage.username, this.loginpage.password)
      .then(data => {
        this.dataAPi = data;
        console.log("Tuki sm!");
        if(this.dataAPi.customer.records.length === 0){
         this.loggedin = false;
        }
        else{
          this.loggedin = true;
          this.dataAPi.customer.records.forEach(element => {
            this.mainAccount = new Account(element[0], element[1], element[2], element[3], element[4], element[5], element[6], element[7], element[8]);
            this.api.setAcc(this.mainAccount);
            global.setAcc(this.mainAccount);
          });
        }
      });
  }
  verifyData(){
  ///this.canLogin()
	if(this.loginpage.first){
		this.loginpage.first = false;
	}  
	if(this.loginpage.username.length > 4 && this.loginpage.password.length > 4){
    
    if(this.loggedin){
		this.loginpage.validData = true;
		
		this.navCtrl.push(ListPage);
    return;}
    else{
      	this.loginpage.validData = false;
	      this.loginpage.password = "";
        return;
    }
	}
	this.loginpage.validData = false;
	this.loginpage.password = "";
  }
  gotoSignUp() {
	  this.navCtrl.push(SignUp);
  }

  
}
export class Account{
  id: number;
  name: string;
  email: string;
  password: string;
  phoneNum: number;
  badapp: number;
  dob: Date;
  gender: number;
  idAddress: number;
  constructor(id: number,
  name: string,
  email: string,
  password: string,
  phoneNum: number,
  badapp: number,
  dob: Date,
  gender: number,
idAddress: number){
  this.id = id;
  this.name = name;
  this.email = email;
  this.password = password;
  this.phoneNum = phoneNum;
  this.badapp = badapp;
  this.dob = dob;
  this.gender = gender;
  this.idAddress = idAddress;

}
}
