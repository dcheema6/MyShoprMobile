import { Component, OnInit, OnDestroy } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { DrawerTransitionBase, RadSideDrawer, SlideInOnTopTransition } from "nativescript-ui-sidedrawer";
import { filter, map } from "rxjs/operators";
import * as app from "tns-core-modules/application";
import { FirebaseAuthService } from "./core/auth/firebase-auth.service";
import { UserService } from "./core/services/user.service";

@Component({
    selector: "ns-app",
    templateUrl: "app.component.html"
})
export class AppComponent implements OnInit, OnDestroy {
    private _activatedUrl: string;
    private _sideDrawerTransition: DrawerTransitionBase;
    public currentUser = {
        email: '',
        displayName: null
    };
    private userInfo: any;

    constructor(
        private router: Router,
        private routerExtensions: RouterExtensions,
        private fbAuth: FirebaseAuthService,
        private userServ: UserService) {
        // Use the component constructor to inject services.
    }

    ngOnInit(): void {
        this._activatedUrl = "/login";
        this._sideDrawerTransition = new SlideInOnTopTransition();

        this.fbAuth.signInWithEmailAndPassword('a@b.com', 'aaabbb').then(temp => {
            this.routerExtensions.navigate(['/dashboard'])
        }).catch(error => { console.log(error) });

        this.router.events
            .pipe(filter((event: any) => event instanceof NavigationEnd))
            .subscribe((event: NavigationEnd) => this._activatedUrl = event.urlAfterRedirects);

        this.fbAuth.getCurrentUserObs().subscribe((user) => {
            if (user && user.email) {
                this.userServ.getUserData().pipe(map(result => <any>result)).subscribe(result => {
                    result.data.userMany.forEach(userData => {
                        if (userData.email === user.email) {
                            this.userInfo = user;
                        }
                    });
                });
                this.currentUser.email = user.email;
                this.currentUser.displayName = "NEED TO UPDATE";
            }
        })
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
            console.log("Signed Out, Navigating to Login page");
            this.onNavItemTap('/login');
        }).catch(err => {
            console.log(err);
        });
    }
}
