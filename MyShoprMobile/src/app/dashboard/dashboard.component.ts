import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { RecipeService } from "../core/services/recipe.service";
import { ShoppingService } from "../core/services/shopping.service";


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
    recipes: Array<any>;

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

    deleteListItem(listId: number, index: number): void {
        if (listId == 0) {
            let id = this.lists[index].id;
            this.shopService.deleteShoppingList('userid', id).then(() => {
                this.lists.splice(index, 1);
            });
        } else if (listId == 1) {
            let id = this.recipes[index].id;
            this.recipeService.deleteRecipe('userid', id).then(() => {
                this.recipes.splice(index, 1);
            });
        } 
    }

    getShoppingList(): void {
        this.shopService.getShoppingLists('userid').then((list: Array<any>) => {
            this.lists = list;
        });
    }

    getRecipeList(): void {
        this.recipeService.getRecipeList('userid').then((list: Array<any>) => {
            this.recipes = list;
        });
    }
}
