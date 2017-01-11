import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Frizerstvo } from "../page1/page1";
import { Employee } from "../rezerviraj/rezerviraj";
import { LoginPage } from "../login-page/login-page";
import { Account } from "../login-page/login-page";
import {SreserveService} from '../../providers/sreserve-service';
import {global} from '../../app/global';
import {ListPage} from '../list/list';
/*
  Generated class for the PotrdiRezervacijo page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-potrdi-rezervacijo',
  templateUrl: 'potrdi-rezervacijo.html',
  providers: [SreserveService]
})
export class PotrdiRezervacijoPage { 
  employee: Employee;
  frizerstvo: Frizerstvo;
  date: Date;
  day: Date;
  account: Account; 
  note: string;
  dataAPI: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public api: SreserveService) {
    this.employee = navParams.get("param1");
    this.frizerstvo = navParams.get("param2");
    this.day = navParams.get("param3");
    this.account = global.getAcc()
  }

  ionViewDidLoad() {
    console.log('Hello PotrdiRezervacijoPage Page');
  }
  makeReservation(){
    var neki = this.day.toString().substring(0, 15);
    var d = new Date(this.day).setHours(parseInt(this.date.toString().substring(0,2)),parseInt(this.date.toString().substring(3,5)));
    var start = new Date(neki+" "+this.date+":00");
    var bal = parseInt(this.date.toString().substring(0,2))+1;
    var end = new Date(neki+" "+bal.toString()+":"+this.date.toString().substring(3,5)+":00");

/*    let start = new Date().setDate(this.day.);
    ///start.setMinutes(this.date);
    let end = (<any>this).day.setHours(this.date.getHours()+1);
    end.setMinutes(this.date.getMinutes());
    end.set*/
    this.api.makeReservation(this.note, start, end, this.employee.id, 1, this.account.id).then(data => {
        this.dataAPI = data;
        console.log("POST finnished!!!!!!");
        this.navCtrl.push(ListPage);
    });
  }


}
