import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { platformNativeScriptDynamic } from "nativescript-angular/platform";
import { DropDownModule } from "nativescript-drop-down/angular";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { DashboardComponent } from "./dashboard.component";
import { DropDown } from "nativescript-drop-down";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        DashboardRoutingModule,
        DropDownModule
    ],
    declarations: [
        DashboardComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class DashboardModule { }

platformNativeScriptDynamic().bootstrapModule(DashboardModule);