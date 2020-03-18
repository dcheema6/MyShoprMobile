import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { RecipeService } from "./../services/recipe.service";
import { ShoppingService } from "./../services/shopping.service";

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

    constructor(private route: ActivatedRoute, private shopService: ShoppingService, private recipeService: RecipeService) {
    }

    ngOnInit(): void {
        this.list['id'] = this.route.snapshot.params.id;
        if (this.list.id > -1) {
            this.shopService.getShoppingList('userid', this.list.id).then((list: any) => {
                if (list && list.id) this.list = list;
            });
        }
        if (!this.list['name']) this.list['name'] = 'ListName';
        if (!this.list['items']) this.list['items'] = [];
    }

    addItem(): void {
        this.list.items.push("");
    }

    saveList(): void {
        console.log(this.list);
        this.shopService.saveShoppingList('userid', this.list);
    }
    
    goShop(): void {

    }

    updateItem(index: number, args: any): void {
        this.list.items[index] = args.object.text;
    }

    searchRecipes(args): void {
        console.log(args.object.text);
        this.recipes = [];
        if (!args.object.text || args.object.text === '') return;
        // TODO: make sure search string is query safe
        this.recipeService.searchRecipeByName('userid', args.object.text).then((recipes: Array<any>) => {
            this.recipes = recipes;
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
