import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { HomeComponent } from "~/app/home/home.component";
import { LoginComponent } from "~/app/login/login.component";
import { DashboardComponent } from "~/app/dashboard/dashboard.component";
import { ViewRecipeComponent } from "~/app/view-recipe/view-recipe.component";
import { ViewShopListComponent } from "~/app/view-shop-list/view-shop-list.component";
import { StorePickerComponent } from "~/app/store-picker/store-picker.component";
import { ItemMapperComponent } from "~/app/item-mapper/item-mapper.component";
import { GoShoppingComponent } from "~/app/go-shopping/go-shopping.component";

const routes: Routes = [
    { path: "", redirectTo: "/login", pathMatch: "full" },
    { path: "home", component: HomeComponent },
    { path: "login", component: LoginComponent },
    { path: "dashboard", component: DashboardComponent },
    { path: "recipe/:id", component: ViewRecipeComponent },
    { path: "shop/:id", component:  ViewShopListComponent },
    { path: "store-picker", component: StorePickerComponent },
    { path: "item-map", component: ItemMapperComponent },
    { path: "goshop", component: GoShoppingComponent },
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
