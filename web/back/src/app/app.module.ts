import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {HttpclientService} from './services/httpclient.service';
import {DictionaryService} from './services/dictionary.service';
import {ModalService} from './services/modal.service';

import '../../node_modules/bootstrap/dist/css/bootstrap.css'

import { AppComponent } from './app.component';
import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/login/login.component';
import { ProductsComponent } from './components/products/products.component';
import { CartListComponent } from './components/cart-list/cart-list.component';
import { UsersComponent } from './components/users/users.component';

import { AppRouter } from './router/routers';
import { HomeComponent } from './components/home/home.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { IndentComponent } from './components/indent/indent.component';
import { ModalComponent } from './components/modal/modal.component';
import { SpinnerComponent } from './components/spinner/spinner.component'

// import { BootstrapComponent } from '../../node_modules/bootstrap/dist/css/bootstrap.css'

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
    ModalComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRouter,
    FormsModule,
    HttpModule
  ],
  providers: [
    HttpclientService,
    DictionaryService,
    ModalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
