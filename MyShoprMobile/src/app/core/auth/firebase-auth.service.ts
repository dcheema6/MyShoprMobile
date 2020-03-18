import { Injectable, NgZone } from '@angular/core';
import * as firebase from 'nativescript-plugin-firebase';
import { Subject } from 'rxjs';

@Injectable()
export class FirebaseAuthService {

    currentUser: any = null;
    private userSubject: Subject<firebase.User>;

    constructor() {
        this.userSubject = new Subject<firebase.User>();
        firebase.addAuthStateListener({
            onAuthStateChanged: (data) => this.userSubject.next(data.user),
        });
    }

    public getCurrentUserObs() {
        return this.userSubject.asObservable();
    }

    public getCurrentUser() {
        console.log("Current user is: " + this.currentUser);
        return firebase.getCurrentUser();
    }

    public isLoggedIn(): boolean {
        if(this.currentUser !== undefined && this.currentUser !== null) {
            return true;
        } else {
            return false;
        }
    }

    public signInWithEmailAndPassword(email: string, password: string) {
        return firebase.login({
            type: firebase.LoginType.PASSWORD,
            passwordOptions: {
                email: email,
                password: password
            }
        });
    }

    public signOut() {
        return firebase.logout();
    }
}