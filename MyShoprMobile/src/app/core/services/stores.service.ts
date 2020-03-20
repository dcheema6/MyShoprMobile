import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class StoresService {
    private serverUrl = "https://myshopr-api.appspot.com";

    constructor(private http: HttpClient) { }

    getData() {
        return this.http.post('https://myshopr-api.appspot.com/api', {
            query: `{
                storeMany {
                    _id
                    name
                    address
                }
            }`
        });
    }

    getStore(id: string) {
        return this.http.post('https://myshopr-api.appspot.com/api', {
            query: `{
                storeById(_id: "${id}") {
                    _id
                    name
                    address
                    layoutUrl
                    aisles {
                        aisleId
                        items
                        position {
                            xPos
                            yPos
                        }
                    }
                }
            }`
        });
    }

    public saveSelectedStore() {
        return null;
    }
}