import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class ShoppingService {
    private serverUrl = "https://myshopr-api.appspot.com";
    public selectedStore: any = null;
    public selectedList: any = null;
    public goShoppingItems: any;

    constructor(private http: HttpClient) { }

    setGoShoppingItems(items: any) {
        this.goShoppingItems = items;
    }

    getGoShoppingItems() {
        return this.goShoppingItems;
    }

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
            query: `mutation {
                userUpdateById(record: {
                  _id: "${userId}",
                  shoppingLists: ${JSON.stringify(shopLists).replace(/"([^"]+)":/g, '$1:').replace(/\uFFFF/g, '\\\"')}
                }) {
                  recordId
                  record {
                    shoppingLists {
                      _id
                      name
                    }
                  }
                }
              }`
        });
    }

    fetchAllProductItems() {
        return this.http.post('https://myshopr-api.appspot.com/api', {
            query: `
            {
                itemMany {
                    _id
                    name
                    brand
                    sku
                }
            }
            `
        });
    }
    deleteShoppingList(userId: string, shopLists: Array<any>) {
        return this.saveShoppingList(userId, shopLists);
    }
}