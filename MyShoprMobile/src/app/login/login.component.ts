import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { User, APP_ROLES } from "../models/user.model";
import { UserService } from "../services/user.service";
import { RouterExtensions } from "nativescript-angular/router";


@Component({
    selector: "Login",
    templateUrl: "./login.component.html"
})
export class LoginComponent implements OnInit {

    isLoginSuccess = false;
    creds: User;

    constructor(public userService: UserService, private routerExtensions: RouterExtensions) {
    }

    ngOnInit(): void {
        this.creds = new User();
        this.creds.email = '';
        this.creds.password = '';
        this.creds.permissionRole = APP_ROLES.Visitor;
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    attemptLogin(){
        // This will be false if creds dont align
        this.isLoginSuccess = this.userService.mockLogin(this.creds); // Can replace with real login if needed but not necessary for demo as its not about login
        console.log(this.isLoginSuccess);
    }
}
