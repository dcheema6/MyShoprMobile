import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
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
                    recipeList {
                        _id
                        name
                        ingredients
                        instructions
                    }
                    shoppingLists {
                        _id
                        name
                        items
                    }
                }
            }`
        });
    }

    createNewUser(user: User) {
        return this.http.post('https://myshopr-api.appspot.com/api', {
            query: `mutation {
                userCreateOne(record: {
                    email: "${user.email}",
                    displayName: "${user.displayName}",
                    recipeList: [],
                    shoppingLists: []
                })
                recordId
                record {
                    _id
                    email
                    displayName
                    recipeList
                    shoppingLists
                }
            }`
        });
    }
}
