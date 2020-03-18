import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { ShoppingService } from "./../services/shopping.service";

@Component({
    selector: "ViewShopList",
    moduleId: module.id,
    templateUrl: "./view-shop-list.component.html",
    providers: [ ShoppingService ]
})
export class ViewShopListComponent implements OnInit {
    constructor(private route: ActivatedRoute, private shopService: ShoppingService) {

    }

    ngOnInit(): void {
        const id = this.route.snapshot.params.id;
        console.log(id);
    }
}
