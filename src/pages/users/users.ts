import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';



/*
  Generated class for the Users page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-users',
  templateUrl: 'users.html'
})
export class UsersPage {
	
	
  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, public menu: MenuController) {
	  this.menu.swipeEnable(true);
  }

  
   showToast(position: string) {
    let toast = this.toastCtrl.create({
      message: 'Sporočilo je poslano',
      duration: 2000,
      position: position
    });
	

    toast.present(toast);
  }
  

  
}
