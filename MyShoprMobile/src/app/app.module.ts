import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
import { NativeScriptFormsModule } from "nativescript-angular/forms";

import { AppComponent } from "./app.component";
import { HomeComponent } from "~/app/home/home.component";
import { LoginComponent } from "~/app/login/login.component";
import { DashboardComponent } from "~/app/dashboard/dashboard.component";
import { ViewRecipeComponent } from "~/app/view-recipe/view-recipe.component";
import { ViewShopListComponent } from "~/app/view-shop-list/view-shop-list.component";
import { StorePickerComponent } from "~/app/store-picker/store-picker.component";
import { ItemMapperComponent } from "~/app/item-mapper/item-mapper.component";
import { GoShoppingComponent } from "~/app/go-shopping/go-shopping.component";

import { AppRoutingModule } from "./app-routing.module";
import { UserService } from "./core/services/user.service";
import { StoresService } from "./core/services/stores.service";
import { RecipeService } from "./core/services/recipe.service";
import { ShoppingService } from "./core/services/shopping.service";
import { FirebaseAuthService } from "./core/auth/firebase-auth.service";
 
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
        HomeComponent,
        LoginComponent,
        DashboardComponent,
        ViewRecipeComponent,
        ViewShopListComponent,
        StorePickerComponent,
        ItemMapperComponent,
        GoShoppingComponent,
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
