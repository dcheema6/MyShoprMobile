import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { ViewRecipeComponent } from "./view-recipe.component";

const routes: Routes = [
    { path: "", component: ViewRecipeComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class ViewRecipeRoutingModule { }
