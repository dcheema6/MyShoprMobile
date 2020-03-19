import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import * as app from "tns-core-modules/application";
import { AndroidApplication, AndroidActivityBackPressedEventData } from "tns-core-modules/application";
import { isAndroid } from "tns-core-modules/platform";
import { alert } from "tns-core-modules/ui/dialogs";

import { RecipeService } from "../core/services/recipe.service";
import { ShoppingService } from "../core/services/shopping.service";

@Component({
    selector: "ViewShopList",
    moduleId: module.id,
    templateUrl: "./view-shop-list.component.html",
    providers: [
        RecipeService,
        ShoppingService
    ]
})
export class ViewShopListComponent implements OnInit {
    list: any = { };
    recipes: Array<any> = [];
    currUserId: string = "5e7304361c9d44000029227a";
    // temp
    lists: Array<any>;

    constructor(private route: ActivatedRoute,
        private routerExtensions: RouterExtensions,
        private shopService: ShoppingService,
        private recipeService: RecipeService) {
    }

    ngOnInit(): void {
        this.list['_id'] = this.route.snapshot.params.id;
        this.shopService.getShoppingList(this.currUserId, this.list._id).subscribe((lists: any) => {
            this.lists = lists.data.userById.shoppingLists;
            this.lists.forEach((list: any) => {
                if (list._id === this.list._id) this.list = list;
            });

            if (this.list._id == -1) {
                delete this.list['_id'];
                this.lists.push(this.list);
            }
        });

        if (!this.list['name']) this.list['name'] = 'ListName';
        if (!this.list['items']) this.list['items'] = [];

        if (isAndroid) {
            app.android.on(AndroidApplication.activityBackPressedEvent, (data: AndroidActivityBackPressedEventData) => {
                data.cancel = true;
                this.routerExtensions.navigate(['dashboard'], {
                    transition: { name: "fade" }
                });
            });
        }
    }

    addItem(): void {
        this.list.items.push("");
    }

    saveList(): void {
        this.shopService.saveShoppingList(this.currUserId, this.lists).subscribe((rtnVal) => {
            alert({
                title: "Saved",
                message: "Shopping list was successfully saved.",
                okButtonText: "Ok"
            });
        });
    }
    
    goShop(): void {
        this.shopService.saveShoppingList(this.currUserId, this.lists).subscribe(() => {
            this.routerExtensions.navigate(['store-picker/' + this.list._id], {
                transition: { name: "fade" }
            });
        });
    }

    updateItem(index: number, args: any): void {
        this.list.items[index] = args.object.text;
    }

    searchRecipes(args: any): void {
        console.log(args.object.text);
        this.recipes = [];
        if (!args.object.text || args.object.text === '') return;
        // TODO: make sure search string is query safe
        this.recipeService.searchRecipeByName(this.currUserId, args.object.text).subscribe((recipes: any) => {
            recipes.data.userById.recipeList.forEach((recipe) => {
                if (recipe.name.includes(args.object.text)) this.recipes.push(recipe);
            });
        });
    }

    addRecipeToList(recipe): void {
        recipe.ingredients.forEach(ingredient => {
            let exists = false;
            this.list.items.forEach(item => {
                if (ingredient == item) exists = true;
            });
            if (!exists) this.list.items.unshift(ingredient);
        });
        this.recipes = [];
    }

    deleteItem(index: number): void {
        this.list.items.splice(index, 1);
    }
}
