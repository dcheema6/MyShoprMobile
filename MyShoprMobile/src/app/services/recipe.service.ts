import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class RecipeService {
    private serverUrl = "https://myshopr-api.appspot.com";
    public selectedStore: any = null;

    constructor(private http: HttpClient) { }

    getRecipe(userId, recipeId) {
        return new Promise((resolve) => {
            resolve({
                id: recipeId
            });
        });
    }

    saveRecipe(userId, recipeId) {
        if (!recipeId!) {
            // POST
        } else {
            // PUT
        }
    }

    getRecipeList(userId) {
        return new Promise((resolve) => {
            resolve([{
                id: "recipe1"
            },
            {
                id: "recipe2"
            },
            {
                id: "recipe3"
            }]);
        });
    }
}