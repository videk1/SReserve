import { Component, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from 'ionic-native';
import { NavController, MenuController } from 'ionic-angular';
import { RezervirajPage } from '../rezerviraj/rezerviraj';
import { Http } from '@angular/http'
import {SreserveService} from '../../providers/sreserve-service';
declare var google;

@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html',
  providers: [SreserveService]
})
export class Page1 {
  dataAPI: any;
  frizerstva = [];
  constructor(public navCtrl: NavController, public menu: MenuController, public api: SreserveService) {
  this.menu.swipeEnable(true);
  ///this.frizerstva = null;
  //[new Frizerstvo("Frizerstvo Lasek","assets/images/Rdec_Logo.png",10, "Rafolče 36b", 8.8, 11, 1,  ["mosko strizenje", "zensko striženje", "barvanje"]), new Frizerstvo("Frizerstvo Las","assets/images/Rdec_Logo.png",5, "Lukovica 36", 7, 12, 1, ["mosko strizenje", "zensko striženje", "barvanje"]),new Frizerstvo("Frizerstvo IN", "assets/images/Rdec_Logo.png",22,"Večna pot 113", 5.5, 22, 1, ["mosko strizenje", "zensko striženje", "barvanje"]),new Frizerstvo("Frizerstvo Mateja", "assets/images/Rdec_Logo.png",222,"Koper", 5, 60, 1, ["mosko strizenje", "zensko striženje", "barvanje"])];
  }
 ionViewDidLoad(){ 
   this.api.getFrizerstva()
   .then(data => {
     this.dataAPI = data;
     console.log(data);
     this.dataAPI.company.records.forEach(element => {
       var neki = new Frizerstvo(element[1], "http://89.212.245.13/"+element[5], 0, "Ljubljana", 10, 0, 60, ["mosko strizenje, zensko strizenje"], element[0]);
       this.frizerstva.push(neki);
     });
   }); 
  }
  rezerviraj(frizerstvo){
    this.navCtrl.push(RezervirajPage, {param: frizerstvo});
  }
  
}
export class Frizerstvo{
  ime: string;
  imgsrc: string;
  cena: any;
  googleMaps: string;
  http: any;
  rating: number;
  dist: number;
  dolzinaTermina: number;
  usluge: Array<string>;
  id: number;
  constructor(name: string, imgsrc: string, cost: any, gm: string, rating: number, dist: number, dt: number, usluge: Array<string>, ID: number){
    this.http = Http;
    this.ime = name;
    this.imgsrc = imgsrc;
    this.cena = cost;
    this.googleMaps = gm;
    this.rating = rating;
    this.dist = dist;
    this.dolzinaTermina = dt;
    this.usluge = usluge;
    this.id = ID;
    ///this.getDistance();
  }
  /*getDistance(){
    Geolocation.getCurrentPosition().then((position) => {
      let long = position.coords.longitude.toString();
      let lati = position.coords.latitude.toString();
      let apicall = "https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=46.050272299999996,%2014.468890700000001&destinations=Ljubljana&key=AIzaSyBXsj7xQkgfO8BC1r-K7seRe7gZoeZgYsY";
      let rez = this.http.get(apicall).map(res => res.json());
    }, (err) => {
      console.log(err);
  });
}*/
}
//API KEY:    AIzaSyBXsj7xQkgfO8BC1r-K7seRe7gZoeZgYsY
