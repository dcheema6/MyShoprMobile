import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";

import { ViewRecipeRoutingModule } from "./view-recipe-routing.module";
import { ViewRecipeComponent } from "./view-recipe.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        ViewRecipeRoutingModule,
        NativeScriptFormsModule,
    ],
    declarations: [
        ViewRecipeComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class ViewRecipeModule { }
