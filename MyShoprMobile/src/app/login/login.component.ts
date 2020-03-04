import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { User } from "../models/user.model";
import { UserService } from "../services/user.service";
const firebase = require("nativescript-plugin-firebase");

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
        this.userService.firebaseLogin(this.creds.email, this.creds.password)
            .then(result => console.log(JSON.stringify(result)))
            .catch(error => console.log(error));
    }
}
