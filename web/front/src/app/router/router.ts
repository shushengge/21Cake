import { RouterModule, Routes } from '@angular/router';

import { CarComponent } from "../components/car/car.component";
import { DetailsComponent } from "../components/details/details.component";
import { IndexComponent } from "../components/index/index.component";
import { ListComponent } from "../components/list/list.component";
import { LoginComponent } from "../components/login/login.component";
import { RegisterComponent } from "../components/register/register.component";
import { HotshopComponent } from '../components/hotshop/hotshop.component'
import { MyComponent } from "../components/my/my.component";
import { Login1Component } from "../components/login/login1/login1.component";
import { Login2Component } from "../components/login/login2/login2.component";
import { SearchComponent } from "../components/search/search.component";
import { OrderlistComponent } from "../components/orderlist/orderlist.component";
import { AddressComponent } from "../components/address/address.component";
import { MyorderComponent } from "../components/myorder/myorder.component";


const Routes: Routes = [
    {path: '', redirectTo:'/index', pathMatch: 'full'},
    {path: 'car', component: CarComponent},
    {path: 'details/:id', component: DetailsComponent},
    {path: 'index', component: IndexComponent},
    {path: 'list/:category', component: ListComponent},
    {path: 'hotshop', component: HotshopComponent},
    {path: 'search', component: SearchComponent},

    {path: 'list', component: ListComponent},
    {path: 'login', component: LoginComponent,children:[
        {path:'login1',component:Login1Component},
        {path:'login2',component:Login2Component}
    ]},
    {path: 'register', component: RegisterComponent},
    {path: 'my', component: MyComponent},
    {path: 'orderlist', component: OrderlistComponent},
    {path: 'address', component: AddressComponent},
    {path: 'myorder', component: MyorderComponent}
];


export const Router = RouterModule.forRoot(
    Routes,
    { enableTracing:false }
)