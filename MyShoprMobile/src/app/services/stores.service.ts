import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class StoresService {
    private serverUrl = "https://myshopr-api.appspot.com";
    public selectedStore: any = null;

    constructor(private http: HttpClient) { }

    getData() {
        let headers = this.createRequestHeader();
        const endpoint = "/stores"
        return this.http.get((this.serverUrl + endpoint), { headers: headers });
    }

    private createRequestHeader() {
        // set headers here e.g.
        let headers = new HttpHeaders({
            "Content-Type": "application/json",
         });

        return headers;
    }

    public getSelectedStore() {
        if(this.selectedStore){
            return this.getSelectedStore;
        } else {
            return null;
        }
    }

    public setSelectedStore(store: any) {
        if(store && store !== null){
            this.selectedStore = store;
        } else {
            this.selectedStore = null;
        }
    }
    
    public getItemsAiles() {
        return new Promise((resolve) => {
            resolve([{
                item: "1",
                number: "1",
                coords: [67, 157]
            },
            {
                item: "2",
                number: "2",
                coords: [493, 100]
            },
            {
                item: "3",
                number: "3",
                coords: [440, 285]
            },
            {
                item: "4",
                number: "4",
                coords: [440, 480]
            },
            {
                item: "5",
                number: "5",
                coords: [843, 427]
            }]);
        });
    }

    public getSelectedStoreLayout() {}

    public saveSelectedStore() {
        return null;
    }
}