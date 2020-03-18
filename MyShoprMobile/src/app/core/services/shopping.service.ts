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
                items: [
                    "bananas",
                    "strawberries",
                    "apples"
                ]
            });
        });
    }

    retreiveShoppingLists(userId: string){
        return this.http.post('https://myshopr-api.appspot.com/api', {
            query: `
            {
                userById(_id: "${userId}") {
                _id
                selectedStoreId
                selectedListIndex
                shoppingLists
              }

          }
            `
        });
    }

    saveShoppingList(userId, listId) {
        if (!listId!) {
            // POST
        } else {
            // PUT
        }
    }

    deleteShoppingList(userId, listId) {
        return new Promise((resolve) => {resolve();});
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