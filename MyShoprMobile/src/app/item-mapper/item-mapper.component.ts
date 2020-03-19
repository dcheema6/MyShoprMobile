import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { StoresService } from "../core/services/stores.service";
import { ShoppingService } from "../core/services/shopping.service";
import { map } from "rxjs/operators";


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

    constructor(private route: ActivatedRoute, private storeService: StoresService, private shopServ: ShoppingService) {
    }

    ngOnInit(): void {
        this.selectedListId = this.route.snapshot.params.listId;
        this.selectedStoreId = this.route.snapshot.params.storeId;
        this.selectedStore = this.storeService.getSelectedStore();
        this.shoppingList = this.shopServ.getShoppingList('5e7294ce1c9d44000040c9a8', this.selectedListId).pipe(map(result => <any>result)).subscribe((list) => {
            this.shoppingList = list.data.userById.shoppingLists.forEach(list => {
                if(list && list._id === this.selectedListId){
                    this.shoppingList = list;
                }
            });
        });
        console.log(this.shoppingList);
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }


}
