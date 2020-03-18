import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { ViewShopListComponent } from "./view-shop-list.component";

const routes: Routes = [
    { path: "", component: ViewShopListComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class ViewShopListRoutingModule { }
