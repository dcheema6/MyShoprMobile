import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";


@Component({
    selector: "ItemMapper",
    moduleId: module.id,
    templateUrl: "./item-mapper.component.html"
})
export class ItemMapperComponent implements OnInit {
    selectedListId: any;
    selectedStoreId: any;

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.selectedListId = this.route.snapshot.params.listId;
        this.selectedStoreId = this.route.snapshot.params.storeId;
        console.log(this.selectedListId, this.selectedStoreId);
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
