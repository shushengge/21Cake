import { RouterModule, Routes } from '@angular/router';

import { CarComponent } from "../components/car/car.component";
import { DetailsComponent } from "../components/details/details.component";
import { IndexComponent } from "../components/index/index.component";
import { ListComponent } from "../components/list/list.component";
import { LoginComponent } from "../components/login/login.component";
import { RegisterComponent } from "../components/register/register.component";
<<<<<<< HEAD
import { HotshopComponent } from '../components/hotshop/hotshop.component'
=======
import { MyComponent } from "../components/my/my.component";
import { Login1Component } from "../components/login/login1/login1.component";
import { Login2Component } from "../components/login/login2/login2.component";
>>>>>>> a5dd221b75ae19702765b58d3fa4cff379fe87df

const Routes: Routes = [
    {path: '', redirectTo:'/index', pathMatch: 'full'},
    {path: 'car', component: CarComponent},
    {path: 'details', component: DetailsComponent},
    {path: 'index', component: IndexComponent},
<<<<<<< HEAD
    {path: 'list/:category', component: ListComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'hotshop', component: HotshopComponent},

=======
    {path: 'list', component: ListComponent},
    {path: 'login', component: LoginComponent,children:[
        {path:'login1',component:Login1Component},
        {path:'login2',component:Login2Component}
    ]},
    {path: 'register', component: RegisterComponent},
    {path: 'my', component: MyComponent},
>>>>>>> a5dd221b75ae19702765b58d3fa4cff379fe87df
];


export const Router = RouterModule.forRoot(
    Routes,
    { enableTracing:false }
)