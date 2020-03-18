import { Injectable, NgZone } from '@angular/core';
import * as firebase from 'nativescript-plugin-firebase';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class FirebaseAuthService {

    private userSubject: Subject<firebase.User>;
    constructor(private zone: NgZone) {
        this.userSubject = new Subject<firebase.User>();
        firebase.addAuthStateListener({
            onAuthStateChanged: (data) => this.userSubject.next(data.user),
        });
    }

    public authState(): Observable<firebase.User> {
        return this.userSubject.asObservable();
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