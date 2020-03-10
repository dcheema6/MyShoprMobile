import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

const routes: Routes = [
    { path: "", redirectTo: "/home", pathMatch: "full" },
    { path: "home", loadChildren: () => import("~/app/home/home.module").then((m) => m.HomeModule) },
<<<<<<< HEAD
    { path: "browse", loadChildren: () => import("~/app/browse/browse.module").then((m) => m.BrowseModule) },
    { path: "search", loadChildren: () => import("~/app/search/search.module").then((m) => m.SearchModule) },
    { path: "featured", loadChildren: () => import("~/app/featured/featured.module").then((m) => m.FeaturedModule) },
    { path: "goshop", loadChildren: () => import("~/app/go-shopping/go-shopping.module").then((m) => m.GoShoppingModule) },
    { path: "settings", loadChildren: () => import("~/app/settings/settings.module").then((m) => m.SettingsModule) },
    { path: "login", loadChildren: () => import("~/app/login/login.module").then((m) => m.LoginModule) }
=======
    { path: "store-picker", loadChildren: () => import("~/app/store-picker/store-picker.module").then((m) => m.StorePickerModule) },
    { path: "goshop", loadChildren: () => import("~/app/go-shopping/go-shopping.module").then((m) => m.GoShoppingModule) },
    { path: "login", loadChildren: () => import("~/app/login/login.module").then((m) => m.LoginModule) }
    
>>>>>>> e0ed51eb8955d8e7a8963cb546f0f4c69f75b784
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
