import { Injectable } from "@angular/core";
import { User } from "../models/user.model";

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
        return true;
    }

    logout() {
        return null;
    }
}
