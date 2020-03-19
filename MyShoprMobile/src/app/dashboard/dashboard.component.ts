import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { RecipeService } from "../core/services/recipe.service";
import { ShoppingService } from "../core/services/shopping.service";
import { map } from "rxjs/operators";


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
            let id = this.lists[index]._id;
            this.shopService.deleteShoppingList('userid', id).then(() => {
                this.lists.splice(index, 1);
            });
        } else if (listId == 1) {
            let id = this.recipes[index]._id;
            this.recipeService.deleteRecipe('userid', id).then(() => {
                this.recipes.splice(index, 1);
            });
        } 
    }

    getShoppingList(): void {
        this.shopService.retreiveShoppingLists("5e7294ce1c9d44000040c9a8").pipe(map(result => <any>result)).subscribe((lists) => {
            this.lists = lists.data.userById.shoppingLists;
        });
    }

    getRecipeList(): void {
        this.recipeService.retrieveRecipeList("5e7294ce1c9d44000040c9a8").pipe(map(result => <any>result)).subscribe((recp) => {
            this.recipes = recp.data.userById.recipeList;
        });
    }
}
