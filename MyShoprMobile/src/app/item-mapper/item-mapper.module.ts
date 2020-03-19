import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { ItemMapperRoutingModule } from "./item-mapper-routing.module";
import { ItemMapperComponent } from "./item-mapper.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        ItemMapperRoutingModule
    ],
    declarations: [
        ItemMapperComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class ItemMapperModule { }
