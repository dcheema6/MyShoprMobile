import { Component, OnInit } from "@angular/core";
import { StoresService } from "../services/stores.service";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";

@Component({
    selector: "StorePicker",
    moduleId: module.id,
    templateUrl: "./store-picker.component.html",
    styleUrls: ['store-picker.component.scss'],
    providers: [StoresService]
})
export class StorePickerComponent implements OnInit {

    // Create an empty list to hold the available stores
    availableStoresList: any;

    constructor(private storeService: StoresService) {
    }

    ngOnInit(): void {
        this.storeService.getData().subscribe(stores => {
            this.availableStoresList = stores;
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
        console.log(this.availableStoresList[args.index])
        this.availableStoresList[args.index].selected = true;
        this.storeService.setSelectedStore(this.availableStoresList[args.index]);
	}

}
