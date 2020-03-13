import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { CreateRecipeComponent } from "./create-recipe.component";

const routes: Routes = [
    { path: "", component: CreateRecipeComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class CreateRecipeRoutingModule { }
