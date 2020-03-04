import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { User } from "../models/user.model";
import { UserService } from "../services/user.service";

@Component({
    selector: "Login",
    templateUrl: "./login.component.html"
})
export class LoginComponent implements OnInit {

    isUserLoggedIn = false;
    userInSession: User = null;
    creds: User;
    

    constructor(public userService: UserService) {
    }

    ngOnInit(): void {
        this.creds = new User();
        this.creds.email = null;
        this.creds.password = null;
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    attemptLogin(){
       return null;
    }
}
