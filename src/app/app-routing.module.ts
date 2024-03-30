import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guard/auth.guard';

const routes: Routes = [
  { 
    path: "",
    canActivate:[authGuard],
    loadComponent: () => import("./layouts/blank-layout/blank-layout.component").then((m) => m.BlankLayoutComponent),
    children: [
      { path: "", redirectTo:"home", pathMatch: "full" },
      { path: "home", loadComponent: () => import('./components/home/home.component').then((m) => m.HomeComponent), title: "Home" },
      { path: "cart", loadComponent: () => import('./components/cart/cart.component').then((m) => m.CartComponent), title: "Cart" },
      { path: "products", loadComponent: () => import("./components/products/products.component").then((m) => m.ProductsComponent), title: "Products" },
      { path: "wishlist", loadComponent: () => import("./components/wish-list/wish-list.component").then((m) => m.WishListComponent), title: "wishlist" },
      { path: "allorders", loadComponent: () => import("./components/all-orders/all-orders.component").then((m) => m.AllOrdersComponent), title: "allorders" },
      { path: "productdetails/:id", loadComponent: () => import("./components/product-details/product-details.component").then((m) => m.ProductDetailsComponent), title: "Product-Details" },
      { path: "payment/:id", loadComponent: () => import("./components/payment/payment.component").then((m) => m.PaymentComponent), title: "Payment" },
      { path: "categories", loadComponent: () => import("./components/categories/categories.component").then((m) => m.CategoriesComponent), title: "Categoris" },
      { path: "subcategry/:id", loadComponent: () => import("./components/sub-category/sub-category.component").then((m) => m.SubCategoryComponent), title: "subCategory" },
      { path: "brands", loadComponent: () => import("./components/brands/brands.component").then((m) => m.BrandsComponent), title: "Brands" },
      { path: "specificbrand/:id", loadComponent: () => import("./components/specific-brand/specific-brand.component").then((m) => m.SpecificBrandComponent), title: "specificBrand" },
      { path: "forgetpassword", loadComponent: () => import("./components/forget-password/forget-password.component").then((m) => m.ForgetPasswordComponent), title: "forgetPassword" },

    ]

  },

  {  path: "", loadComponent: () => import("./layouts/auth-layout/auth-layout.component").then((m) => m.AuthLayoutComponent),
    children: [
      { path: "", redirectTo: "login", pathMatch: 'full' },
      { path: "login", loadComponent: () => import("./components/login/login.component").then((m) => m.LoginComponent), title: "Login" },
      { path: "register", loadComponent: () => import('./components/register/register.component').then((m) => m.RegisterComponent), title: "Register" },
      { path: "forgetpass", loadComponent: () => import("./components/forget-password/forget-password.component").then((m) => m.ForgetPasswordComponent), title: "forgetPassword" },

    ]
},
 
  {path:"**",loadComponent:()=>import("./components/notfound/notfound.component").then((m)=>m.NotfoundComponent),title:"404"}

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
