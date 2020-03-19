import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class ShoppingService {
    private serverUrl = "https://myshopr-api.appspot.com";
    public selectedStore: any = null;

    constructor(private http: HttpClient) { }

    getShoppingList(userId: string, listId: string) {
        return this.http.post('https://myshopr-api.appspot.com/api', {
            query: `{
                userById(_id: "${userId}") {
                    _id
                    shoppingLists {
                        _id
                        name
                        items
                    }
                }
            }`
        });
    }

    retreiveShoppingLists(userId: string){
        return this.http.post('https://myshopr-api.appspot.com/api', {
            query: `{
                userById(_id: "${userId}") {
                    _id
                    shoppingLists {
                        _id
                        name
                    }
                }
            }`
        });
    }

    saveShoppingList(userId: string, shopLists: Array<any>) {
        return this.http.post('https://myshopr-api.appspot.com/api', {
            mutation: `{
                userUpdateById(_id: "${userId}", shoppingLists: ${shopLists})
            }`
        });
    }

    deleteShoppingList(userId: string, shopLists: Array<any>) {
        return this.saveShoppingList(userId, shopLists);
    }
}