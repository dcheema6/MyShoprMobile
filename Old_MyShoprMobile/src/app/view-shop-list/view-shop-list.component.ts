import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { alert } from "tns-core-modules/ui/dialogs";

import { ShoppingService } from "../core/services/shopping.service";
import { UserService } from "../core/services/user.service";

@Component({
    selector: "ViewShopList",
    moduleId: module.id,
    templateUrl: "./view-shop-list.component.html"
})
export class ViewShopListComponent implements OnInit {
    list: any = { };
    recipes: Array<any> = [];
    // temp
    lists: Array<any>;

    constructor(private route: ActivatedRoute,
        private routerExtensions: RouterExtensions,
        private shopService: ShoppingService,
        private userService: UserService) {
    }

    ngOnInit(): void {
        this.list['_id'] = this.route.snapshot.params.id;
        this.lists = this.userService.user.shoppingLists;
        this.lists.forEach((list: any) => {
            if (list._id === this.list._id) this.list = list;
        });

        if (this.list._id == -1) {
            delete this.list['_id'];
            this.lists.push(this.list);
        }

        if (!this.list['name']) this.list['name'] = 'ListName';
        if (!this.list['items']) this.list['items'] = [];
    }

    addItem(): void {
        this.list.items.unshift("");
    }

    saveList(): void {
        this.shopService.saveShoppingList(this.userService.user._id, this.lists).subscribe((rtnVal) => {
            alert({
                title: "Saved",
                message: "Shopping list was successfully saved.",
                okButtonText: "Ok"
            });
        });
    }
    
    goShop(): void {
        this.shopService.saveShoppingList(this.userService.user._id, this.lists).subscribe(() => {
            this.shopService.setSelectedList(this.list);
            this.routerExtensions.navigate(['store-picker'], { transition: { name: "fade" } });
        });
    }

    onBack(): void {
        this.routerExtensions.backToPreviousPage();
    }

    updateItem(index: number, args: any): void {
        this.list.items[index] = args.object.text;
    }

    searchRecipes(args: any): void {
        this.recipes = [];
        if (!args.object.text || args.object.text === '') return;
        // TODO: make sure search string is query safe
        this.userService.user.recipeList.forEach((recipe: any) => {
            if (recipe.name.includes(args.object.text)) this.recipes.push(recipe);
        });
    }

    addRecipeToList(recipe: any): void {
        recipe.ingredients.forEach((ingredient: any) => {
            let exists = false;
            this.list.items.forEach((item: any) => {
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
