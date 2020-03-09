import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { registerElement } from 'nativescript-angular/element-registry';
import { CanvasView, Canvas, Paint, createRect } from 'nativescript-canvas';
import { Color } from "tns-core-modules/color/color";
registerElement('CanvasView', () => CanvasView);

@Component({
    selector: "GoShopping",
    templateUrl: "./go-shopping.component.html"
})
export class GoShoppingComponent implements OnInit {
    imgURL: string = "https://storage.googleapis.com/myshopr-api.appspot.com/store_layout.png";

    constructor() {
    }

    ngOnInit(): void {
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    draw(event: { canvas: Canvas }) {
        const paint = new Paint();
        paint.setColor(new Color('black'));
        paint.strokeWidth = 10;
        event.canvas.drawRect(createRect(0, 0, 200, 100), paint);
    }
}
