import { RouterModule, Routes } from '@angular/router';

import { CarComponent } from "../components/car/car.component";
import { DetailsComponent } from "../components/details/details.component";
import { IndexComponent } from "../components/index/index.component";
import { ListComponent } from "../components/list/list.component";
import { LoginComponent } from "../components/login/login.component";
import { RegisterComponent } from "../components/register/register.component";

const Routes: Routes = [
    {path: '', redirectTo:'/index', pathMatch: 'full'},
    {path: 'car', component: CarComponent},
    {path: 'details', component: DetailsComponent},
    {path: 'index', component: IndexComponent},
    {path: 'list', component: ListComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
];


export const Router = RouterModule.forRoot(
    Routes,
    { enableTracing:false }
)