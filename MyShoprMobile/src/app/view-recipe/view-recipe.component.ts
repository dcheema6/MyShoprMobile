import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { alert } from "tns-core-modules/ui/dialogs";

import { RecipeService } from "../core/services/recipe.service";
import { UserService } from "../core/services/user.service";

@Component({
    selector: "ViewRecipe",
    moduleId: module.id,
    templateUrl: "./view-recipe.component.html",
    providers: [ RecipeService ]
})
export class ViewRecipeComponent implements OnInit {
    recipe: any = { };
    recipes: Array<any>;
    tabNames = ['ingredients', 'instructions'];
    
    constructor(private route: ActivatedRoute,
        private routerExtensions: RouterExtensions,
        private recipeService: RecipeService,
        private userService: UserService) {
    }

    ngOnInit(): void {
        this.recipe['_id'] = this.route.snapshot.params.id;
        this.recipeService.getRecipe(this.userService.user._id, this.recipe._id).subscribe((recipes: any) => {
            this.recipes = recipes.data.userById.recipeList;
            this.recipes.forEach((recipe: any) => {
                if (recipe._id === this.recipe._id) this.recipe = recipe;
            });

            if (this.recipe._id == -1) {
                delete this.recipe['_id'];
                this.recipes.push(this.recipe);
            }
        });

        if (!this.recipe['name']) this.recipe['name'] = 'NewRecipeName';
        if (!this.recipe['ingredients']) this.recipe['ingredients'] = [];
        if (!this.recipe['instructions']) this.recipe['instructions'] = [];
    }

    onBack(): void {
        this.routerExtensions.backToPreviousPage();
    }

    addNew(tabIndex: number): void {
        this.recipe[this.tabNames[tabIndex]].unshift('');
    }

    update(tabIndex: number, index: number, args: any) {
        this.recipe[this.tabNames[tabIndex]][index] = args.object.text;
    }

    saveRecipe(): void {
        this.recipeService.saveRecipe(this.userService.user._id, this.recipes).subscribe((rtnVal) => {
            alert({
                title: "Saved",
                message: "Recipe was successfully saved.",
                okButtonText: "Ok"
            });
        });
    }

    delete(tabIndex: number, index: number): void {
        this.recipe[this.tabNames[tabIndex]].splice(index, 1);
    }
}
