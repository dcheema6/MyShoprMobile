import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { GoShoppingRoutingModule } from "./go-shopping-routing.module";
import { GoShoppingComponent } from "./go-shopping.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
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
