import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

const routes: Routes = [
    { path: "", redirectTo: "/login", pathMatch: "full" },
    { path: "home", loadChildren: () => import("~/app/home/home.module").then((m) => m.HomeModule) },
    { path: "store-picker/:id", loadChildren: () => import("~/app/store-picker/store-picker.module").then((m) => m.StorePickerModule) },
    { path: "goshop", loadChildren: () => import("~/app/go-shopping/go-shopping.module").then((m) => m.GoShoppingModule) },
    { path: "login", loadChildren: () => import("~/app/login/login.module").then((m) => m.LoginModule) },
    { path: "dashboard", loadChildren: () => import("~/app/dashboard/dashboard.module").then((m) => m.DashboardModule) },
    { path: "recipe/:id", loadChildren: () => import("~/app/view-recipe/view-recipe.module").then((m) => m.ViewRecipeModule) },
    { path: "shop/:id", loadChildren: () => import("~/app/view-shop-list/view-shop-list.module").then((m) => m.ViewShopListModule) },
    { path: "item-map/:listId/:storeId", loadChildren: () => import("~/app/item-mapper/item-mapper.module").then((m) => m.ItemMapperModule) },
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
