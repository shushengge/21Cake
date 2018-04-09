import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';   //表单双向绑定
import { HttpModule } from '@angular/http';   //服务

//element-angular
import { ElModule } from 'element-angular';

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

import { HttpclientService } from "./servers/httpclient.service.ts";


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
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ElModule.forRoot(),
    Router
  ],
  providers: [HttpclientService],
  bootstrap: [AppComponent]
})
export class AppModule { }
