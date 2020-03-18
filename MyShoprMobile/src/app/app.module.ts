import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
import { NativeScriptFormsModule } from "nativescript-angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { RecipeService } from "./core/services/recipe.service";
import { ShoppingService } from "./core/services/shopping.service";
import { StoresService } from "./core/services/stores.service";
import { FirebaseAuthService } from "./core/auth/firebase-auth.service";
import { UserService } from "./core/services/user.service";
 
@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        AppRoutingModule,
        NativeScriptModule,
        NativeScriptUISideDrawerModule,
        NativeScriptHttpClientModule,
        NativeScriptFormsModule,
    ],
    declarations: [
        AppComponent,
    ],
    providers: [
        UserService,
        StoresService,
        RecipeService,
        ShoppingService,
        FirebaseAuthService,
    ],
    schemas: [
        NO_ERRORS_SCHEMA,
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class AppModule { }
