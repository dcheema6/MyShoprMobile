export class User {
    name?: String;
    email: String;
    password: String;
    isVerified?: Boolean;
    permissionRole: APP_ROLES;
}

export enum APP_ROLES {
    Admin = 'Admin',
    Manager = 'Manager',
    User = 'User',
    Visitor = 'Visitor'
}