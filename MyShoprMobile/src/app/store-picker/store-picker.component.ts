import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";

import { StoresService } from "../core/services/stores.service";
import { ShoppingService } from "../core/services/shopping.service";

@Component({
    selector: "StorePicker",
    moduleId: module.id,
    templateUrl: "./store-picker.component.html",
    styleUrls: ['store-picker.component.scss'],
})
export class StorePickerComponent implements OnInit {
    availableStoresList: Array<any>;

    constructor(private storeService: StoresService,
        private shopService: ShoppingService) {
    }

    ngOnInit(): void {
        this.storeService.getData().subscribe((stores: any) => {
            this.availableStoresList = stores.data.storeMany;
        });
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    setStore(index: number) {
        this.shopService.setSelectedStoreId(this.availableStoresList[index]._id);
	}
}
