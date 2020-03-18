import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class ShoppingService {
    private serverUrl = "https://myshopr-api.appspot.com";
    public selectedStore: any = null;

    constructor(private http: HttpClient) { }

    getShoppingList(userId, listId) {
        return new Promise((resolve) => {
            resolve({
                id: listId
            });
        });
    }

    saveShoppingList(userId, listId) {
        if (!listId!) {
            // POST
        } else {
            // PUT
        }
    }

    getShoppingLists(userid) {
        return new Promise((resolve) => {
            resolve([{
                id: "list1"
            },
            {
                id: "list2"
            },
            {
                id: "list3"
            }]);
        });
    }
}