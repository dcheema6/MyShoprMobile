import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class StoresService {
    private serverUrl = "https://myshopr-api.appspot.com";
    public selectedStore: any = null;

    constructor(private http: HttpClient) { }

    getData() {
        let headers = this.createRequestHeader();
        return this.http.post('https://myshopr-api.appspot.com/api', {
            query: `{
                storeMany {
                    _id
                    name
                    address
                }
            }`
        },{ headers: headers });
    }

    private createRequestHeader() {
        // set headers here e.g.
        let headers = new HttpHeaders({
            "Content-Type": "application/json",
            "Accept": "application/json"
         });

        return headers;
    }

    public getSelectedStore() {
        if(this.selectedStore){
            return this.selectedStore; 
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
                id: "entrance",
                coords: [143, 720]
            },
            {
                item: "1",
                id: "1",
                coords: [67, 157]
            },
            {
                item: "2",
                id: "2",
                coords: [493, 100]
            },
            {
                item: "3",
                id: "3",
                coords: [440, 285]
            },
            {
                item: "4",
                id: "4",
                coords: [440, 480]
            },
            {
                item: "5",
                id: "5",
                coords: [843, 427]
            },
            {
                id: "checkout",
                coords: [1080, 750]
            }]);
        });
    }

    public getSelectedStoreLayout() {}

    public saveSelectedStore() {
        return null;
    }
}