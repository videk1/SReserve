import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';


@Component({
  templateUrl: 'list.html'
})
export class ListPage { 
  constructor(public menu: MenuController){
    this.menu.swipeEnable(true);
  }
}