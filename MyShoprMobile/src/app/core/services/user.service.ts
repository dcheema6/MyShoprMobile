import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class UserService {

    private serverUrl = "https://myshopr-api.appspot.com/api";

    userInfo: any;

    constructor(private http: HttpClient) { }

    getUserData() {
        return this.http.post('https://myshopr-api.appspot.com/api', {
            query: `
            {
                userMany {
                _id
                email
                displayName
              }

          }
            `
        });
    }
}
