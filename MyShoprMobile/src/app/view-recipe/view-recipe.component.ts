import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { RecipeService } from "../core/services/recipe.service";

@Component({
    selector: "ViewRecipe",
    moduleId: module.id,
    templateUrl: "./view-recipe.component.html",
    providers: [ RecipeService ]
})
export class ViewRecipeComponent implements OnInit {
    constructor(private route: ActivatedRoute, private recipeService: RecipeService) {

    }

    ngOnInit(): void {
        const id = this.route.snapshot.params.id;
        console.log(id);
    }
}
