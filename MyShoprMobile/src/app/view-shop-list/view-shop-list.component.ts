import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

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
    list: any;

    constructor(private route: ActivatedRoute, private shopService: ShoppingService, private recipeService: RecipeService) {
        this.list = {
            id: '',
            items: []
        }
    }

    ngOnInit(): void {
        const id = this.route.snapshot.params.id;
        this.shopService.getShoppingList('userid', id).then((list) => {
            this.list = list;
        });
    }

    addItem(): void {
        this.list.items.unshift("");
    }

    saveList(): void {
        this.shopService.saveShoppingList('userid', this.list);
        console.log(this.list);
    }

    goShop(): void {

    }

    updateItem(index: number, args: any): void {
        this.list.items[index] = args.object.text;
    }

    searchRecipes(args): void {

    }

    deleteItem(index: number): void {
        this.list.items.splice(index, 1);
    }
}
