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
    public createUserWithEmailAndPassword(email, password) {
        return;
    }

    public authState(): Observable<firebase.User> {
        return this.userSubject.asObservable();
    }

    public getIdToken(user, forceRefresh: boolean) {
        return firebase.getAuthToken({
            forceRefresh: forceRefresh
        });
    }

    public signOut() {
        firebase.logout()
    }

    public refreshToken(forceRefresh: boolean): Promise<any> {
        return firebase.getAuthToken({
            forceRefresh: forceRefresh
        }).then(tokenResult => {
            return tokenResult.token.toString();
        });
    }

    public signInWithEmailAndPassword(email: string, password: string) {
        console.log({
            type: firebase.LoginType.PASSWORD,
            passwordOptions: {
                email: email,
                password: password
            }
        });
        return firebase.login({
            type: firebase.LoginType.PASSWORD,
            passwordOptions: {
                email: email,
                password: password
            }
        });
    }
}