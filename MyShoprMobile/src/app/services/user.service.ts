import { Injectable } from "@angular/core";
import { User } from "../models/user.model";
const firebase = require("nativescript-plugin-firebase");

@Injectable()
export class UserService {
    constructor() { }

    mockLogin(user: User) {
        if (user.email === 'admin@mdmj.com' && user.password === 'admin') {
            return user;
        }
        else {
            return null;
        }
    }

    firebaseLogin(email, password) {
        return firebase.login(
            {
              type: firebase.LoginType.PASSWORD,
              passwordOptions: {
                email: email,
                password: password
              }
            });
    }

    logout() {
        return null;
    }
}
