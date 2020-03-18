import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { RecipeService } from "./../services/recipe.service";
import { ShoppingService } from "./../services/shopping.service";

@Component({
    selector: "Dashboard",
    moduleId: module.id,
    templateUrl: "./dashboard.component.html",
    styleUrls: ["dashboard.component.scss"],
    providers: [
        RecipeService,
        ShoppingService,
    ]
})

export class DashboardComponent implements OnInit {
    lists: Array<any>;
    displayLists: Array<any>;

    recipes: Array<any>;
    displayRecipes: Array<any>;

    constructor(private recipeService: RecipeService, private shopService: ShoppingService) {
    }

    ngOnInit(): void {
        this.getShoppingList();
        this.getRecipeList();
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    toggleLists(listName: string) {
        if (listName === "shop") {
            if (!this.displayLists) this.displayLists = this.lists;
            else this.displayLists = null;
        } else if (listName == "recipe") {
            if (!this.displayRecipes) this.displayRecipes = this.recipes;
            else this.displayRecipes = null;
        }
    }

    getShoppingList(): void {
        this.shopService.getShoppingLists('userid').then((list: Array<any>) => {
            this.lists = list.sort();
        });
    }

    getRecipeList(): void {
        this.recipeService.getRecipeList('userid').then((list: Array<any>) => {
            this.recipes = list.sort();
        });
    }
}
