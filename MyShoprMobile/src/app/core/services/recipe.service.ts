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
                name: "recipe2",
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

    saveRecipe(userId, recipe) {
        if (recipe.id < 0) {
            // POST
        } else {
            // PUT
        }
    }

    deleteRecipe(userId, recipeId) {
        return new Promise((resolve) => { resolve(); });
    }

    retrieveRecipeList(userId: string) {
        return this.http.post('https://myshopr-api.appspot.com/api', {
            query: `
                {
                    userById(_id: "${userId}") {
                    _id
                    recipeList {
                        _id
                        name
                        ingredients
                        instructions
                    }
                  }
              }
                `
        });
    }

    getRecipeList(userId) {
        return new Promise((resolve) => {
            resolve([{
                id: 1,
                name: "recipe1",
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
                id: 2,
                name: "recipe2",
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
                id: 3,
                name: "recipe3",
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