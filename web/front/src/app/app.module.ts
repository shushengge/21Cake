import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';   //表单双向绑定
import { HttpModule } from '@angular/http';   //服务

//element-angular
import { ElModule } from 'element-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { IndexComponent } from './components/index/index.component';
import { ListComponent } from './components/list/list.component';
import { CarComponent } from './components/car/car.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DetailsComponent } from './components/details/details.component';
import { SpinnerComponent } from './components/spinner/spinner.component';

import { Router } from "./router/router";

import { HttpclientService } from "./servers/httpclient.service";
import { CommontService } from "./servers/commont.service";


import { FooterComponent } from './components/footer/footer.component';
import { SearchComponent } from './components/search/search.component';
import { HotshopComponent } from './components/hotshop/hotshop.component';
import { MyComponent } from './components/my/my.component';
import { Login1Component } from './components/login/login1/login1.component';
import { Login2Component } from './components/login/login2/login2.component';
import { LoadDirective } from './directives/load.directive';
import { OrderlistComponent } from './components/orderlist/orderlist.component';

import { MyorderComponent } from './components/myorder/myorder.component';
import { AlertComponent } from './components/alert/alert.component';
import { AddressComponent } from './components/address/address.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    ListComponent,
    CarComponent,
    LoginComponent,
    RegisterComponent,
    DetailsComponent,
    SpinnerComponent,
    HeaderComponent,
    SearchComponent, 
    HotshopComponent, 
    FooterComponent ,
    Login1Component,
    Login2Component,
    MyComponent ,
    OrderlistComponent,
    LoadDirective,
    AddressComponent,
    MyorderComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ElModule.forRoot(),
    Router,
    BrowserAnimationsModule
  ],
  providers: [HttpclientService, CommontService],
  bootstrap: [AppComponent]
})
export class AppModule { }
