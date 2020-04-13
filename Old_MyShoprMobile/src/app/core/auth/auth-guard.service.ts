import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { FirebaseAuthService } from "./firebase-auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private auth: FirebaseAuthService) { }

  canActivate() {
    if (this.auth.isLoggedIn()) {
      return true;
    }
    else {
      this.router.navigate(["/login"]);
      return false;
    }
  }
}