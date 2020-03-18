import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { RecipeService } from "./../services/recipe.service";

@Component({
    selector: "ViewRecipe",
    moduleId: module.id,
    templateUrl: "./view-recipe.component.html",
    providers: [ RecipeService ]
})
export class ViewRecipeComponent implements OnInit {
    recipe: any = { };
    selectedTab = 'ingredients';
    
    constructor(private route: ActivatedRoute, private recipeService: RecipeService) {
    }

    ngOnInit(): void {
        this.recipe['id'] = this.route.snapshot.params.id;
        if (this.recipe.id > -1) {
            this.recipeService.getRecipe('userid', this.recipe.id).then((recipe: any) => {
                if (recipe && recipe.id) this.recipe = recipe;
            });
        }
        if (!this.recipe['name']) this.recipe['name'] = 'RecipeName';
        if (!this.recipe['ingredients']) this.recipe['ingredients'] = [];
        if (!this.recipe['instructions']) this.recipe['instructions'] = [];
    }

    addNew(): void {
        this.recipe[this.selectedTab].push('');
    }

    update(index: number, args: any) {
        this.recipe[this.selectedTab][index] = args.object.text;
    }

    saveRecipe(): void {
        console.log(this.recipe);
        this.recipe.saveRecipe('userid', this.recipe)
    }

    delete(index: number): void {
        this.recipe[this.selectedTab].splice(index, 1);
    }

    onTabChange(args: any): void {
        if (args.object.selectedIndex == 0) this.selectedTab = 'ingredients';
        else if (args.object.selectedIndex == 1) this.selectedTab = 'instructions';
    }
}
