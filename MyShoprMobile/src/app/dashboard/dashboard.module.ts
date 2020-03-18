import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { DropDownModule } from "nativescript-drop-down/angular";

import { DashboardRoutingModule } from "./dashboard-routing.module";
import { DashboardComponent } from "./dashboard.component";

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
<<<<<<< HEAD
export class DashboardModule { }
=======
export class DashboardModule { }
>>>>>>> 5e0f7008366c47a9b309b5a2d406c173c0a1de69
