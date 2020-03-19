import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { StoresService } from "../core/services/stores.service";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { map } from "rxjs/operators";

@Component({
    selector: "StorePicker",
    moduleId: module.id,
    templateUrl: "./store-picker.component.html",
    styleUrls: ['store-picker.component.scss'],
    providers: [StoresService]
})
export class StorePickerComponent implements OnInit {

    // Create an empty list to hold the available stores
    availableStoresList: Array<any>;
    selectedListId: any;
    selectedStoreId: any;

    constructor(private storeService: StoresService,
        private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.selectedListId = this.route.snapshot.params.id;
        this.storeService.getData().subscribe((stores: any) => {
            this.availableStoresList = stores.data.storeMany;
        });
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    onSelectItem(args) {
		for (let i = 0; i < this.availableStoresList.length; i++) {
			if (this.availableStoresList[i].selected) {
				this.availableStoresList[i].selected = false;
				break;
			}
        }
        this.availableStoresList[args.index].selected = true;
        this.selectedStoreId = this.availableStoresList[args.index]._id
        this.storeService.setSelectedStore(this.availableStoresList[args.index]);
	}

}
