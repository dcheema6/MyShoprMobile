import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { ViewRecipeRoutingModule } from "./view-recipe-routing.module";
import { ViewRecipeComponent } from "./view-recipe.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        ViewRecipeRoutingModule
    ],
    declarations: [
        ViewRecipeComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class ViewRecipeModule { }
