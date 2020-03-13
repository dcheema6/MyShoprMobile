export class User {
    name?: string;
    email: string;
    password: string;
    isVerified?: boolean;
    permissionRole: APP_ROLES;
}

export enum APP_ROLES {
    Admin = 'Admin',
    Manager = 'Manager',
    User = 'User',
    Visitor = 'Visitor'
}