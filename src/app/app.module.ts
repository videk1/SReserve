import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { LoginPage } from '../pages/login-page/login-page';
import { SidePage } from '../pages/sidepage/sidepage';
import { SignUp } from '../pages/signup/signup';
import { RezervirajPage } from '../pages/rezerviraj/rezerviraj';
import { PotrdiRezervacijoPage } from '../pages/potrdi-rezervacijo/potrdi-rezervacijo';
import { ListPage } from '../pages/list/list';
import { UsersPage } from '../pages/users/users';
import { SignOutPage } from '../pages/sign-out/sign-out';

@NgModule({
  declarations: [
    MyApp,
    Page1,
    Page2,
	LoginPage,
	SidePage,
	SignUp,
  RezervirajPage,
  PotrdiRezervacijoPage,
  ListPage,
  UsersPage,
  SignOutPage,
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Page1,
    Page2,
	LoginPage,
	SidePage,
	SignUp,
  RezervirajPage,
  PotrdiRezervacijoPage,
  ListPage,
  UsersPage,
  SignOutPage,
  ],
  providers: []
})
export class AppModule {}
