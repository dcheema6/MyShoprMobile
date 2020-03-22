import { Component, OnInit, OnDestroy } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { DrawerTransitionBase, RadSideDrawer, SlideInOnTopTransition } from "nativescript-ui-sidedrawer";
import { filter } from "rxjs/operators";
import * as app from "tns-core-modules/application";

import { User } from "./core/models/user.model";

import { FirebaseAuthService } from "./core/auth/firebase-auth.service";
import { UserService } from "./core/services/user.service";

@Component({
    selector: "ns-app",
    templateUrl: "app.component.html"
})
export class AppComponent implements OnInit, OnDestroy {
    _activatedUrl: string;
    _sideDrawerTransition: DrawerTransitionBase;
    user: User = new User();

    constructor(private router: Router,
        private routerExtensions: RouterExtensions,
        private fbAuth: FirebaseAuthService,
        private userServ: UserService) {
        // Use the component constructor to inject services.
    }

    ngOnInit(): void {
        this._activatedUrl = "/login";
        this._sideDrawerTransition = new SlideInOnTopTransition();

        this.router.events
            .pipe(filter((event: any) => event instanceof NavigationEnd))
            .subscribe((event: NavigationEnd) => this._activatedUrl = event.urlAfterRedirects);

        this.fbAuth.getCurrentUserObs().subscribe((user) => {
            if (user && user.email) {
                this.user.email = user.email;
                this.userServ.getUserByEmail(user.email).subscribe((result: any) => {
                    this.user._id = result.data.userMany[0]._id;
                    this.user.displayName = result.data.userMany[0].displayName;
                    this.userServ.user = this.user;
                    this.routerExtensions.navigate(['/dashboard']);
                });
            }
        });
    }

    get sideDrawerTransition(): DrawerTransitionBase {
        return this._sideDrawerTransition;
    }

    isComponentSelected(url: string): boolean {
        return this._activatedUrl === url;
    }

    onNavItemTap(navItemRoute: string): void {
        this.routerExtensions.navigate([navItemRoute], {
            transition: {
                name: "fade"
            }
        });

        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.closeDrawer();
    }

    ngOnDestroy() {
        this.fbAuth.signOut();
    }

    public signOut() {
        this.fbAuth.signOut().then(() => {
            this.user = new User();
            console.log("Signed Out, Navigating to Login page");
            this.onNavItemTap('/login');
        }).catch(err => {
            console.log(err);
        });
    }
}
