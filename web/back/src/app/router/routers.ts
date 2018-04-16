import { RouterModule, Routes } from '@angular/router'

import { LoginComponent } from '../components/login/login.component'
import { HomeComponent } from '../components/home/home.component'
import { WelcomeComponent } from '../components/welcome/welcome.component'
import { UsersComponent } from '../components/users/users.component'
// import { AdminComponent } from '../components/admin/admin.component'
// import { CartListComponent } from '../components/cart-list/cart-list.component'
import { ProductsComponent } from '../components/products/products.component'
import { IndentComponent } from '../components/indent/indent.component'


const routes: Routes = [
    {path:'login', component:LoginComponent},
    {path:'home', component:HomeComponent,children:[
        {path:'welcome',component:WelcomeComponent},
        {path:'users',component:UsersComponent},
        // {path:'cart',component:CartListComponent},
        // {path:'admin',component:AdminComponent},
        {path:'indent',component:IndentComponent},
        {path:'products',component:ProductsComponent},

    ]}
]

export const AppRouter = RouterModule.forRoot(
    routes,
    {enableTracing:false}
)
