import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from "../models/user.model";

@Injectable()
export class UserService {
    private serverUrl = "https://myshopr-api.appspot.com/api";
    public user: User;

    constructor(private http: HttpClient) { }

    getUserByEmail(email: string) {
        return this.http.post('https://myshopr-api.appspot.com/api', {
            query: `{
                userMany(filter: {
                    email: "${email}"
                }) {
                    _id
                    email
                    displayName
                }
            }`
        });
    }

    createNewUser(user: User) {
        return this.http.post('https://myshopr-api.appspot.com/api', {
            query: `{
                userMany(filter: {
                    email: "${}"
                }) {
                    _id
                    email
                    displayName
                }
            }`
        });
    }
}
