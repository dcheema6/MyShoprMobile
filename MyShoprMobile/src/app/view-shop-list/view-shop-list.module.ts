import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { ViewShopListRoutingModule } from "./view-shop-list-routing.module";
import { ViewShopListComponent } from "./view-shop-list.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        ViewShopListRoutingModule
    ],
    declarations: [
        ViewShopListComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class ViewShopListModule { }
