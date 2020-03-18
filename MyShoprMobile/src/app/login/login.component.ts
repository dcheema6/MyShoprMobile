import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { User } from "../models/user.model";
import { RouterExtensions } from "nativescript-angular/router";
import { FirebaseAuthService } from "../core/auth/firebase-auth.service";
import { alert, prompt } from "tns-core-modules/ui/dialogs";

@Component({
    selector: "Login",
    templateUrl: "./login.component.html",
    providers: [FirebaseAuthService]
})
export class LoginComponent implements OnInit {

    user: User;
    isLoggingIn = true;
    isLoginSuccess = false;

    constructor(private routerExtensions: RouterExtensions, private authService: FirebaseAuthService) {
        this.user = new User();
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
            alert({ message: "Please provide both an email address and password."});
            return;
        }
        
        if (this.isLoggingIn) {
            this.authService.signInWithEmailAndPassword(this.user.email, this.user.password)
                .then((user) => {
                    this.routerExtensions.navigate(['/dashboard']);
                });
        }
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
            })
          }
        });
      }
}
