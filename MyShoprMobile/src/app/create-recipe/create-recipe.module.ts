import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";

import { CreateRecipeRoutingModule } from "./create-recipe-routing.module";
import { CreateRecipeComponent } from "./create-recipe.component";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { ReactiveFormsModule } from '@angular/forms';
import { NativeScriptFormsModule } from 'nativescript-angular/forms'

@NgModule({
    imports: [
        NativeScriptCommonModule,
        CreateRecipeRoutingModule,
        ReactiveFormsModule,
        NativeScriptFormsModule
    ],
    declarations: [
        CreateRecipeComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class CreateRecipeModule { }
