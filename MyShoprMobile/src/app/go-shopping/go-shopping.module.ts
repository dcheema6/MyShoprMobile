import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { GoShoppingRoutingModule } from "./go-shopping-routing.module";
import { GoShoppingComponent } from "./go-shopping.component";

@NgModule({
    imports: [
        NativeScriptModule,
        GoShoppingRoutingModule
    ],
    declarations: [
        GoShoppingComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class GoShoppingModule { }
