import { Component, ViewChild} from '@angular/core';

import { Nav, Platform, NavController } from 'ionic-angular';
import { Page1 } from '../page1/page1';
import { Page2 } from '../page2/page2';
import { LoginPage } from '../login-page/login-page';

/*
  Generated class for the Sidepage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-sidepage',
  templateUrl: 'sidepage.html'
})
export class SidePage {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = Page1;
  pagesApp: Array<{title: string, component: any}>;	
  constructor(public navCtrl: NavController) {
	  
	 this.pagesApp = [
      { title: 'Frizerstvo', component: Page1 },
      { title: 'Masaže', component: Page2 }
    ];
  }

  ionViewDidLoad() {
    console.log('Hello SidepagePage Page');
  }
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

}
