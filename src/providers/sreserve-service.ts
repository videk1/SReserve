import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Observable} from 'rxjs/Observable';
import {md5} from './md5';
import 'rxjs/add/operator/toPromise';
import { Account } from "../pages/login-page/login-page";

/*
  Generated class for the SreserveService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class SreserveService {
  data: any;
  data2: any;
  data3: any;
  data4: any;
  data5: any;
  acc: Account;
  constructor(public http: Http) {
    console.log('Hello SreserveService Provider');
  }
  setAcc(account){
    this.acc = account;
  }
  getAcc(){
    return this.acc;
  }
  validEmail(email: string){
  //    if (this.data) {
  //   // already loaded data
  //   return Promise.resolve(this.data);
  // }

  // don't have the data yet
  return new Promise(resolve => {
    // We're using Angular HTTP provider to request the data,
    // then on the response, it'll map the JSON data to a parsed JS object.
    // Next, we process the data and resolve the promise with the new data.
    this.http.get('http://89.212.245.13/api.php/customer?filter=email,eq,'+email)
      .map(res => res.json())
      .subscribe(data => {
        // we've got back the raw data, now generate the core schedule data
        // and save the data for later reference
        this.data = data;
        resolve(this.data);
      });
  });
  }
  login(email: string, password: string){
    let e = md5(password); ///hash password
    return new Promise(resolve => {
    // We're using Angular HTTP provider to request the data,
    // then on the response, it'll map the JSON data to a parsed JS object.
    // Next, we process the data and resolve the promise with the new data.
    this.http.get("http://89.212.245.13/api.php/customer?filter%5b%5d=email,eq,"+email+"&filter%5b%5d=password,eq,"+e+"&satisfy=all")
      .map(res => res.json())
      .subscribe(data => {
        // we've got back the raw data, now generate the core schedule data
        // and save the data for later reference
        this.data2 = data;
        resolve(this.data2); 
      });
  });
  }
/*  getFrizerstva(){
    return new Promise(resolve => {
    // We're using Angular HTTP provider to request the data,
    // then on the response, it'll map the JSON data to a parsed JS object.
    // Next, we process the data and resolve the promise with the new data.
    this.http.get("http://89.212.245.13/api.php/company")
      .map(res => res.json())
      .subscribe(data => {
        // we've got back the raw data, now generate the core schedule data
        // and save the data for later reference
        this.data3 = data;
        resolve(this.data3);
      });
  });
  }*/
  getFrizerstva(): Promise<any>{
    return this.http.get("http://89.212.245.13/api.php/company")
               .toPromise()
               .then(response => response.json()) 
               .catch(this.handleError);
  }
  getValidEmail(){
    return this.data;
  }
  getEmployees(id: number){
    return new Promise(resolve => {
    // We're using Angular HTTP provider to request the data,
    // then on the response, it'll map the JSON data to a parsed JS object.
    // Next, we process the data and resolve the promise with the new data.
    this.http.get("http://89.212.245.13/api.php/employee?filter[0]=company_idcompany%2Ceq%2C"+id)
      .map(res => res.json())
      .subscribe(data => {
        // we've got back the raw data, now generate the core schedule data
        // and save the data for later reference
        this.data4 = data;
        resolve(this.data4);
      });
  });
  }
  getPlanForEmployee(from, end, id){
     return this.http.get("http://89.212.245.13/api.php/event?filter%5b%5d=employee_idemployee,eq,"+id+"&filter%5b%5d=startdate,ge,"+from+"&filter%5b%5d=enddate,le,"+end+"&satisfy=all")
               .toPromise()
               .then(response => response.json())
               .catch(this.handleError);
  }
  getData5(){
    return this.data5;
  }
  makeReservation(title, startdate, enddate, employee_idemployee, status_idstatus, customer_idcustomer){
        var link = 'http://89.212.245.13/api.php/event';
        var data = JSON.stringify({title: title, startdate: startdate, enddate: enddate, employee_idemployee: employee_idemployee, status_idstatus: status_idstatus, customer_idcustomer: customer_idcustomer});
             return this.http.post(link, data)
               .toPromise()
               .then(response => response.json())
               .catch(this.handleError);
  }
  signUp(name, email, password, telephonenumber, badappointment, dob, gender, address_idaddress){
        let e = md5(password); ///hash password
        var link = 'http://89.212.245.13/api.php/customer';
        var data = JSON.stringify({name: name, email: email, password: e, telephonenumber: telephonenumber, badappointment: 0, dob: dob, gender: gender, address_idaddress: address_idaddress});
             return this.http.post(link, data)
               .toPromise()
               .then(response => response.json())
               .catch(this.handleError);
  }
  addAddress(address, address2, towncity, zipcode, country){
           var link = 'http://89.212.245.13/api.php/address';
        var data = JSON.stringify({address: address, address2: address, towncity: towncity, zipcode: zipcode, country: country});
             return this.http.post(link, data)
               .toPromise()
               .then(response => response.json())
               .catch(this.handleError);
  }
private handleError(error: any): Promise<any> {
  console.error('An error occurred', error); // for demo purposes only
  return Promise.reject(error.message || error);
}

}
