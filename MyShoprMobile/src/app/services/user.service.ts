import { Injectable } from "@angular/core";
import { User, APP_ROLES } from "../models/user.model";

@Injectable()
export class UserService {
    public userInSession: User = {email: '', password: '', permissionRole: APP_ROLES.Visitor}

    // Mock Login Unless we need real auth provider for something
    public mockLogin(user: User) {
        if (user.email === 'admin@mdmj.com' && user.password === 'admin') {
            user.permissionRole = APP_ROLES.Admin;
            this.userInSession = user;
            return true;
        }
        else if (user.email === 'manager@mdmj.com' && user.password === 'manager') {
            user.permissionRole = APP_ROLES.Manager;
            this.userInSession = user;
            return true;
        }
        else if (user.email === 'user@mdmj.com' && user.password === 'user') {
            user.permissionRole = APP_ROLES.User;
            this.userInSession = user;
            return true;
        }
        else {
            this.userInSession = {email: '', password: '', permissionRole: APP_ROLES.Visitor}
            return false;
        }
    }

    logout() {
        this.userInSession = {email: '', password: '', permissionRole: APP_ROLES.Visitor};
        return false;
    }
}
