import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { prompt } from "tns-core-modules/ui/dialogs";

import { RecipeService } from "../core/services/recipe.service";
import { ShoppingService } from "../core/services/shopping.service";
import { UserService } from "../core/services/user.service";

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

    constructor(private recipeService: RecipeService,
        private shopService: ShoppingService,
        private userService: UserService) {
    }

    ngOnInit(): void {
        this.getRecipeList();
        this.getShoppingList();
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    deleteListItem(listId: number, index: number): void {
        prompt({
            title: "Confirmation",
            message: "Are you sure you want to delete.",
            okButtonText: "Delete",
            cancelButtonText: "Cancel"
        }).then((data) => {
            if (data.result) {
                if (listId == 0) {
                    let id = this.lists[index]._id;
                    this.lists.splice(index, 1);
                    this.shopService.deleteShoppingList(this.userService.user._id, this.lists).subscribe(() => {
                    });
                } else if (listId == 1) {
                    let id = this.recipes[index]._id;
                    this.recipes.splice(index, 1);
                    this.recipeService.deleteRecipe(this.userService.user._id, this.recipes).subscribe(() => {
                    });
                }
            }
        });
    }

    getShoppingList(): void {
        this.shopService.retreiveShoppingLists(this.userService.user._id).subscribe((lists: any) => {
            this.lists = lists.data.userById.shoppingLists;
        });
    }

    getRecipeList(): void {
        this.recipeService.retrieveRecipeList(this.userService.user._id).subscribe((recp: any) => {
            this.recipes = recp.data.userById.recipeList;
        });
    }
}
