import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { ShoppingService } from "../core/services/shopping.service";
import { RouterExtensions } from "nativescript-angular/router";


@Component({
    selector: "ItemMapper",
    moduleId: module.id,
    templateUrl: "./item-mapper.component.html"
})
export class ItemMapperComponent implements OnInit {
    shoppingList: any;
    mappedItemList: any;
    productList: any;
    selectedItems: Array<any>;

    constructor(private routerExtension: RouterExtensions,
        private shopServ: ShoppingService) {
    }

    ngOnInit(): void {
        this.mappedItemList = [];
        this.shoppingList = this.shopServ.getSelectedList();
        this.shopServ.fetchAllProductItems().subscribe((data:any) => {
            this.productList = data.data.itemMany;
            console.log('converting...');
            this.convertShoppingListToItems();
        });
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    onListItemTap(index: number, isSelected: boolean) {
        if (!this.selectedItems){
            this.selectedItems = [];
        }

        if (isSelected) {
            this.selectedItems.splice(this.selectedItems.indexOf(this.mappedItemList[index]), 1);
        } else {
            this.selectedItems.push(this.mappedItemList[index]);
        }
    }

    buildMap() {
        this.shopServ.setGoShoppingItems(this.selectedItems);
        this.routerExtension.navigate(['/goshop']);
    }

    convertShoppingListToItems() {
        // For each shopping list item, search for the items in the DB with that name
        this.shoppingList.items.forEach((shopitem: string) => {
            if (this.productList && this.productList.length > 0) {
                this.productList.forEach((product: any) => {
                    // This is a list of items
                    if (product && product.name && product.name.toLowerCase().includes(shopitem.toLowerCase())){
                        // This mapped list is the list of items now ready for the map builder
                        this.mappedItemList.push(product);
                    }
                })
            } 
        });
    }
}
