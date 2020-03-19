import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { StoresService } from "../core/services/stores.service";
import { ShoppingService } from "../core/services/shopping.service";
import { Observable, combineLatest } from "rxjs";
import { RouterExtensions } from "nativescript-angular/router";


@Component({
    selector: "ItemMapper",
    moduleId: module.id,
    templateUrl: "./item-mapper.component.html"
})
export class ItemMapperComponent implements OnInit {
    selectedListId: any;
    selectedStoreId: any;
    selectedStore: any;
    shoppingList: any;
    mappedItemList: any;
    productList: any;
    shoppingList$: Observable<any>;
    fetchProducts$: Observable<any>;
    isDataLoaded$: Observable<any>;
    finalShoppingList: any;

    constructor(private route: ActivatedRoute, private routerExtension: RouterExtensions, private storeService: StoresService, private shopServ: ShoppingService) {
    }

    ngOnInit(): void {
        this.mappedItemList = [];
        this.selectedListId = this.route.snapshot.params.listId;
        this.selectedStoreId = this.route.snapshot.params.storeId;
        this.selectedStore = this.storeService.getSelectedStore();
        this.fetchProducts$ = this.shopServ.fetchAllProductItems();
        this.shoppingList$ = this.shopServ.getShoppingList('5e7304361c9d44000029227a', this.selectedListId);

        combineLatest([this.shoppingList$, this.fetchProducts$]).subscribe(([shop, products]) => {
            if (shop && shop.data && products && products.data) {
                this.productList = products.data.itemMany;
                shop.data.userById.shoppingLists.forEach(list => {
                    console.log(list);
                    if (list && list._id === this.selectedListId){
                        this.shoppingList = list;
                        console.log('converting...');
                        this.convertShoppingListToItems();
                    }
                });
                
            }
        });
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    onListItemSelect(index: number) {
        if (!this.finalShoppingList){
            this.finalShoppingList = [];
        } else {
            this.finalShoppingList.push(this.mappedItemList[index]);
        }
    }

    onListItemUnSelect(index: number, isSelected: boolean) {
        if (!this.finalShoppingList){
            this.finalShoppingList = [];
        }

        if (isSelected) { // if selected then deselect
            this.finalShoppingList.splice(this.finalShoppingList.indexOf(this.mappedItemList[index]), 1);
            console.log(this.finalShoppingList)
        } else {
            this.finalShoppingList.push(this.mappedItemList[index]);
            console.log(this.finalShoppingList)
        }
    }

    buildMap() {
        this.shopServ.setGoShoppingItems(this.finalShoppingList);
        this.routerExtension.navigate(['/goshop']);
    }

    convertShoppingListToItems() {
        // For each shopping list item, search for the items in the DB with that name
        this.shoppingList.items.forEach((shopitem: string) => {
            if (this.productList && this.productList.length > 0) {
                this.productList.forEach((product: any) => {
                    // This is a list of items
                    if (product && product.name && shopitem.toLowerCase().includes(product.name.toLowerCase())){
                        // This mapped list is the list of items now ready for the map builder
                        this.mappedItemList.push(product);
                    }
                })
            } 
        });
    }
}
