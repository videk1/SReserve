import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { LoginPage } from '../pages/login-page/login-page';
import {ListPage} from '../pages/list/list';
import {UsersPage} from '../pages/users/users';
import {SignOutPage} from '../pages/sign-out/sign-out';




@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pagesApp: Array<{title: string, component: any}>;
  pagesLogin: Array<{title: string, component: any}>;
  
  

  constructor(public platform: Platform) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pagesApp = [
      { title: 'Domača stran', component: ListPage },
      { title: 'Frizerstvo', component: Page1 },
      { title: 'Pridruži se', component: UsersPage},
      {title: 'Odjava', component: SignOutPage},
    ];
	
	this.pagesLogin = [
      { title: 'Login', component: LoginPage }
    ];
	

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  

}
