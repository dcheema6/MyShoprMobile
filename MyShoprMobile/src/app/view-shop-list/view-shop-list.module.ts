import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";

import { ViewShopListRoutingModule } from "./view-shop-list-routing.module";
import { ViewShopListComponent } from "./view-shop-list.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        ViewShopListRoutingModule,
        NativeScriptFormsModule,
    ],
    declarations: [
        ViewShopListComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class ViewShopListModule { }
