import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class RecipeService {
    private serverUrl = "https://myshopr-api.appspot.com";
    public selectedStore: any = null;

    constructor(private http: HttpClient) { }

    getRecipe(userId: string, recipeId: string) {
        return this.http.post('https://myshopr-api.appspot.com/api', {
            query: `{
                userById(_id: "${userId}") {
                    _id
                    recipeList {
                        _id
                        name
                        ingredients
                        instructions
                    }
                }
            }`
        });
    }

    retrieveRecipeList(userId: string) {
        return this.http.post('https://myshopr-api.appspot.com/api', {
            query: `{
                userById(_id: "${userId}") {
                    _id
                    recipeList {
                        _id
                        name
                    }
                }
            }`
        });
    }

    searchRecipeByName(userid, recipe: string) {
        // TODO: return only top 5 (Done in backend pref)
        return this.getRecipe(userid, "");
    }

    saveRecipe(userId: string, recipes: Array<any>) {
        return this.http.post('https://myshopr-api.appspot.com/api', {
            mutation: `{
                userUpdateById(_id: "${userId}", recipeList: ${recipes})
            }`
        });
    }

    deleteRecipe(userId: string, recipes: Array<any>) {
        return this.saveRecipe(userId, recipes);
    }
}