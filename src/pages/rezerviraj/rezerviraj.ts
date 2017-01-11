import { Component, ViewChild, ElementRef } from '@angular/core';
import { Geolocation, Toast } from 'ionic-native';
import { NavController, NavParams  } from 'ionic-angular';
import { Frizerstvo } from '../page1/page1';
import {SreserveService} from '../../providers/sreserve-service';
import { PotrdiRezervacijoPage } from '../potrdi-rezervacijo/potrdi-rezervacijo';

declare var google;
declare var odpri: "7.00";
declare var zapri: "18:00";
declare var defaultDuration: 60;
/*
  Generated class for the Rezerviraj page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-rezerviraj',
  templateUrl: 'rezerviraj.html',
  providers: [SreserveService]
})
export class RezervirajPage {

  @ViewChild('map') mapElement: ElementRef;
  firstDay: string;
  secondDay: string;
  thirdDay: string;
  dayCounter: number = 0;
  map: any;
  lastDate: Date = new Date();
  usluzbenci = [];
  dataAPI: any;
  dataAPI2: any;
  events = [];
  selectedSegment: any;
  public frizerstvo: Frizerstvo;
  constructor(public navCtrl: NavController, public params:NavParams, public api: SreserveService) {
    this.frizerstvo = params.get("param");
  
  }

  ionViewDidLoad() {
    this.loadMap();
    this.dobiUsluzbence();
  }
  dobiUsluzbence(){
    this.api.getEmployees(this.frizerstvo.id)
      .then(data => {
        this.dataAPI = data;
        console.log("Tuki sm!");
        this.dataAPI.employee.records.forEach(element => {
          this.usluzbenci.push(new Employee(element[0], element[1]));
        });
      }).then(()=>{
        this.getPlanData(this.lastDate);
      });
  }
  loadMap(){
    Geolocation.getCurrentPosition().then((position) => {
	  let directionsService = new google.maps.DirectionsService();
      let directionsDisplay = new google.maps.DirectionsRenderer();
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
		
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
 
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
	  directionsDisplay.setMap(this.map);
	  this.calculateAndDisplayRoute(directionsService, directionsDisplay, latLng)
    }, (err) => {
      console.log(err);
    });
 
  }

  addMarker(){
 
  let marker = new google.maps.Marker({
    map: this.map,
    animation: google.maps.Animation.DROP,
    position: this.map.getCenter()
  });
 
  let content = "<h4>Information!</h4>";          
 
  this.addInfoWindow(marker, content);
 
}
addInfoWindow(marker, content){
 
  let infoWindow = new google.maps.InfoWindow({
    content: content
  });
 
  google.maps.event.addListener(marker, 'click', () => {
    infoWindow.open(this.map, marker);
  });
 
}
calculateAndDisplayRoute(directionsService, directionsDisplay, latLng) {
        directionsService.route({
          origin: latLng,
          destination: this.frizerstvo.googleMaps,
          travelMode: 'DRIVING'
        }, function(response, status) {
          if (status === 'OK') {
            directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      }
generateFreeDay(day, employee: Employee){
   var weekday = new Array(7);
  weekday[0] = "Ned";
  weekday[1] = "Pon";
  weekday[2] = "Tor";
  weekday[3] = "Sre";
  weekday[4] = "Čet";
  weekday[5] = "Pet";
  weekday[6] = "Sob";
  let freeday = new Day(day, weekday[day], null);
  freeday.isFreeAllDay = true;
  return freeday
}
olepsaj(d: Date){
  return d.toISOString().substring(11,16);
}
getPlanData(from: Date){
             var weekday = new Array(7);
            weekday[0] = "Ned";
            weekday[1] = "Pon";
            weekday[2] = "Tor";
            weekday[3] = "Sre";
            weekday[4] = "Čet";
            weekday[5] = "Pet";
            weekday[6] = "Sob";
  var first = from;
  var second =  this.addDays(from, 1);
  var third =  this.addDays(from, 2);
  this.firstDay = weekday[first.getDay()];
  this.secondDay = weekday[second.getDay()];
  this.thirdDay = weekday[third.getDay()];
  
  this.usluzbenci.forEach(element => {
    this.api.getPlanForEmployee(first.toISOString().substring(0,10), third.toISOString().substring(0,10), element.id)
    .then(data => {
        this.dataAPI2 = data;
        console.log("Tuki smbreeee!");
        console.log(data);
        if(this.dataAPI2.event.records.length === 0){
          element.firstDay = this.generateFreeDay(first.getDay(), element);
          element.secondDay = this.generateFreeDay(second.getDay(), element);
          element.thirdDay = this.generateFreeDay(third.getDay(), element);
        }
        else{
          var allEvents = [];
          this.dataAPI2.event.records.forEach(element2 => {
            this.events.push(new Event(element2[0], element2[1], new Date(element2[2]), new Date(element2[3]), element2[4], element, element2[6]));
        });
           var weekday = new Array(7);
            weekday[0] = "Ned";
            weekday[1] = "Pon";
            weekday[2] = "Tor";
            weekday[3] = "Sre";
            weekday[4] = "Čet";
            weekday[5] = "Pet";
            weekday[6] = "Sob";
        element.firstDay = new Day(first.getDay(), weekday[first.getDay()], []);
        element.secondDay = new Day(second.getDay(), weekday[second.getDay()], []);
        element.thirdDay = new Day(third.getDay(), weekday[third.getDay()], []);
        var start = "07:00";
        var end = "18:00";
        var firstDone, sD, tD = false;
        this.events.forEach(element3 => {
          var date = element3.startDate.toISOString().substring(0, 10);
          switch(date){
            case first.toISOString().substring(0,10):
              firstDone=true;
              element.firstDay.plan.push(element3);
              break;
            case second.toISOString().substring(0,10):
              sD=true;
              element.secondDay.plan.push(element3);

              break;
            case third.toISOString().substring(0,10):
              tD = true; 
              element.thirdDay.plan.push(element3); 
              break;
          }
        });
        if(!tD){
          element.thirdDay.isFreeAllDay = true;
        }
        if(!sD){
                element.secondDay.isFreeAllDay = true;
              }
      if(!firstDone){
                element.firstDay.isFreeAllDay = true;
              }
        this.events = [];
        }     
      });
  });
}
showSegment(i){
               this.selectedSegment = i;
           }

hideSegment(a,b){
              if(a!=b){
              return true;}
         }
addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}
next(){
  var datum = this.addDays(this.lastDate, 3);
  this.getPlanData(datum);
  this.dayCounter+=3;
  this.lastDate = datum;
}
back(){
  
  var datum = this.addDays(this.lastDate, -3);
  this.getPlanData(datum);
  this.dayCounter-=3;
  this.lastDate = datum;
}
isValid(){
  return this.dayCounter === 0;
}
confirm(e: Employee, whichDay){
  var wd;
  if(whichDay == "fd"){
    wd = this.lastDate;
  }
  else if(whichDay == "sd"){
    wd = this.addDays(this.lastDate, 1);
  }
  else{
    wd = this.addDays(this.lastDate, 2);
  }
  this.navCtrl.push(PotrdiRezervacijoPage, {param1: e, param2: this.frizerstvo, param3: wd});}
  
}

export class Day{
  day: number;
  displayName: string;
  plan: Array<Event>;
  isFreeAllDay: boolean;
  constructor(date: number, disName: string, plan: Array<Event>){
    this.day = date;
    this.displayName = disName;
    this.plan = plan;
  }
}
export class Hour{
  hour: string;
  to: string;
  isfree: number;
  constructor(h: string, free: number, to: string){
    this.hour = h;
    this.isfree = free;
    this.to = to;
  }
}
export class Employee {
  id: number;
  name: string;
  firstDay: Day;
  secondDay: Day;
  thirdDay: Day;

  constructor(id: number, name: string){
    this.id = id;
    this.name = name;
  }
  
}
export class Event {
  id: number;
  title: string;
  startDate: Date;
  endDate: Date;
  duration: number;
  employee: Employee;
  status: number;
  constructor( id: number,
  title: string,
  startDate: Date,
  endDate: Date,
  duration: number,
  employee: Employee,
  status: number){
    this.id = id;
    this.title = title;
    this.startDate = startDate;
    this.endDate = endDate;
    this.duration = duration;
    this.employee = employee;
    this.status = status;
  }
}
