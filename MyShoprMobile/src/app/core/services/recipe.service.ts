import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class RecipeService {
    private serverUrl = "https://myshopr-api.appspot.com";
    public selectedStore: any = null;

    constructor(private http: HttpClient) { }

    getRecipe(userId: string) {
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

    searchRecipeByName(userid, recipe: string) {
        // TODO: return only top 5 (Done in backend pref)
        return this.getRecipe(userid);
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
                    }
                  }
              }
                `
        });
    }
}