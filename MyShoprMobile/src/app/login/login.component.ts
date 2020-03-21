import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { User } from "../core/models/user.model";
import { alert, prompt } from "tns-core-modules/ui/dialogs";

import { FirebaseAuthService } from "../core/auth/firebase-auth.service";
import { UserService } from "../core/services/user.service";

@Component({
    selector: "Login",
    templateUrl: "./login.component.html"
})
export class LoginComponent implements OnInit {
    user: User = new User();
    isLoggingIn = true;
    isLoginSuccess = false;

    constructor(private userService: UserService,
        private authService: FirebaseAuthService) {
    }

    ngOnInit(): void {
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    toggleForm() {
        this.isLoggingIn = !this.isLoggingIn;
    }

    submit() {
        if (!this.user.email || !this.user.password) {
            alert({ message: "Please provide both an email address and password." });
            return;
        }

        if (this.isLoggingIn) {
            console.log("Trying", this.user);
            this.authService.signInWithEmailAndPassword(this.user.email, this.user.password).then((user) => {
                console.log("Trying", user);
                this.user = new User();
            }).catch((err)=>{
                console.log(err.code, err.message);
                alert({ message: "Wrong email or password provided." });
            });
        } else if (this.user.displayName) {
            this.userService.getUserByEmail(this.user.email).subscribe((data: any) => {
                if (!data.data.userMany || data.data.userMany.length === 0) {
                    this.userService.createNewUser(this.user).subscribe(() => {
                        this.authService.createUserWithEmailAndPassword(this.user.email, this.user.password)
                        .then((user) => {
                            this.user = new User();
                        }).catch((err) => {
                            alert({ message: "Something went wrong." });
                        });;
                    });
                }
                else alert({ message: "User with provided email already exists." });
            });
        } else alert({ message: "Please provide your name to sign up." });
    }

    forgotPassword() {
        prompt({
            title: "Forgot Password",
            message: "Enter the email address you used to register for APP NAME to reset your password.",
            defaultText: "",
            okButtonText: "Ok",
            cancelButtonText: "Cancel"
        }).then((data) => {
            if (data.result) {
                // Call the backend to reset the password
                alert({
                    title: "APP NAME",
                    message: "Your password was successfully reset. Please check your email for instructions on choosing a new password.",
                    okButtonText: "Ok"
                });
            }
        });
    }
}
