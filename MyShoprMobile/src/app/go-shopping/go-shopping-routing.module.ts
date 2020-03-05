import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { GoShoppingComponent } from "./go-shopping.component";

const routes: Routes = [
    { path: "", component: GoShoppingComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class GoShoppingRoutingModule { }
