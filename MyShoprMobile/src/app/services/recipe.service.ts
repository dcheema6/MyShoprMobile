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
                id: recipeId,
                ingredients: [
                    "mango juice",
                    "greek yogurt"
                ],
                instructions: [
                    "Yes",
                    "No",
                    "Maybe"
                ]
            });
        });
    }

    searchRecipeByName(userid, recipe: string) {
        // TODO: return only top 5 (Done in backend pref)
        return this.getRecipeList(userid);
    }

    saveRecipe(userId, recipeId) {
        if (!recipeId!) {
            // POST
        } else {
            // PUT
        }
    }

    deleteRecipe(userId, recipeId) {
        return new Promise((resolve) => {resolve();});
    }

    getRecipeList(userId) {
        return new Promise((resolve) => {
            resolve([{
                id: "recipe1",
                ingredients: [
                    "pizza sauce",
                    "cheese"
                ],
                instructions: [
                    "Yes",
                    "No"
                ]
            },
            {
                id: "recipe2",
                ingredients: [
                    "mango juice",
                    "greek yogurt"
                ],
                instructions: [
                    "Yes",
                    "No",
                    "Maybe"
                ]
            },
            {
                id: "recipe3",
                ingredients: [
                    "mango chutney",
                    "flat bread"
                ],
                instructions: [
                    "Yes",
                    "Maybe"
                ]
            }]);
        });
    }
}