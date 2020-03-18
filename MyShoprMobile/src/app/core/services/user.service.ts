import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class UserService {

    private serverUrl = "https://myshopr-api.appspot.com/api/graphql";

    userInfo: any;

    constructor(private http: HttpClient) { }

    getUserData() {
        return this.http.post('https://myshopr-api.appspot.com/api', {
            query: `
            {
                userById(_id: "5e607621d9584790e1ac19e6") {
                first_name
                last_name
                email
                password
                selectedStoreId
                selectedListIndex
              }
            
          }
            `
        });
    }
}
