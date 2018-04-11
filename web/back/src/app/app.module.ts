import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {HttpclientService} from './services/httpclient.service'


// element ui 模块
// import { ElModule } from 'element-angular'
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
// import { BrowserModule } from '@angular/platform-browser'


import { AppComponent } from './app.component';
import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/login/login.component';
import { ProductsComponent } from './components/products/products.component';
import { CartListComponent } from './components/cart-list/cart-list.component';
import { UsersComponent } from './components/users/users.component';

import { AppRouter } from './router/routers';
import { HomeComponent } from './components/home/home.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { IndentComponent } from './components/indent/indent.component'


@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    LoginComponent,
    ProductsComponent,
    CartListComponent,
    UsersComponent,
    HomeComponent,
    WelcomeComponent,
    IndentComponent,
  ],
  imports: [
    BrowserModule,
    AppRouter,
    FormsModule,
    HttpModule,
  ],
  providers: [
    HttpclientService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
