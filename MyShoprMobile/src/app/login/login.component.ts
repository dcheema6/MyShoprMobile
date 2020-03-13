import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { UserService } from "../services/user.service";
import { RouterExtensions } from "nativescript-angular/router";
import { FirebaseAuthService } from "../core/auth/firebase-auth.service";
import { FormControl } from "@angular/forms";

@Component({
    selector: "Login",
    templateUrl: "./login.component.html",
    providers: [FirebaseAuthService]
})
export class LoginComponent implements OnInit {

    emailControl = new FormControl('');
    passwordControl = new FormControl('');

    isLoginSuccess = false;

    constructor(private routerExtensions: RouterExtensions, private authService: FirebaseAuthService) {
    }

    ngOnInit(): void {
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    async firebaseEmailAuthLoginAttempt() {
        await this.authService.signInWithEmailAndPassword(this.emailControl.value, this.passwordControl.value)
            .then((user) => {
                console.log(user);
                this.routerExtensions.navigate(['/home']);
            });
    }

}
