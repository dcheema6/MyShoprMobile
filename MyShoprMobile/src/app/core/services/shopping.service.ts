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
                id: listId,
                name: "list2",
                items: [
                    "bananas",
                    "strawberries",
                    "apples"
                ]
            });
        });
    }

    saveShoppingList(userId, list) {
        if (list.id < 0) {
            // POST
        } else {
            // PUT
        }
        return new Promise((resolve)=>resolve());
    }

    deleteShoppingList(userId, listId) {
        return new Promise((resolve) => {resolve();});
    }

    getShoppingLists(userid) {
        return new Promise((resolve) => {
            
            resolve([{
                id: 1,
                name: "list1"
            },
            {
                id: 2,
                name: "list2"
            },
            {
                id: 3,
                name: "list3"
            }]);
        });
    }
}