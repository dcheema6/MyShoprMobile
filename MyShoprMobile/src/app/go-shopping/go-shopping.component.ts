import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { EventData } from "tns-core-modules/data/observable";
import { CreateViewEventData, Placeholder } from "tns-core-modules/ui/placeholder";
import { isIOS, isAndroid } from "tns-core-modules/platform/platform";
import { ad } from "tns-core-modules/utils/utils";
// import { registerElement } from 'nativescript-angular/element-registry';
// import { CanvasView, Canvas, Paint, createRect } from 'nativescript-canvas';
// import { Color } from "tns-core-modules/color/color";
import { ImageSource } from '@nativescript/core/image-source/image-source';
import { Page } from "tns-core-modules/ui/page";
// registerElement('CanvasView', () => CanvasView);

@Component({
    selector: "GoShopping",
    templateUrl: "./go-shopping.component.html"
})
export class GoShoppingComponent implements OnInit {
    slayout: any;
    imgSrc: any;

    constructor() {
    }

    ngOnInit(): void {

    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    pageLoaded(args: EventData) {
        // Get the event sender
        this.slayout = args.object;
        this.getLayoutImage().then((imgSrc) => {
            this.imgSrc = imgSrc;
            let placeholder = new Placeholder();
            if (isAndroid)
                placeholder.setNativeView(this.getLayoutViewAndroid());
            // placeholder.on("creatingView", this.creatingView);
            this.slayout.addChild(placeholder);
        });
    }

    getLayoutViewAndroid(): android.widget.ImageView {
        let nativeView = new android.widget.ImageView(ad.getApplicationContext());
        nativeView.setScaleType(android.widget.ImageView.ScaleType.FIT_CENTER);
        
        let bitmap: android.graphics.Bitmap = this.imgSrc.android.copy(android.graphics.Bitmap.Config.ARGB_8888, true);

        let canvas = new android.graphics.Canvas(bitmap);
        
        let blueColor = new android.graphics.Paint();
        blueColor.setARGB(255, 0, 0, 255);
        blueColor.setAntiAlias(true);
        canvas.drawCircle(500, 500, 50, blueColor);
        
        nativeView.setImageBitmap(bitmap);
        return nativeView;
    }

    getLayoutImage(): Promise<ImageSource> {
        return ImageSource.fromUrl('https://storage.googleapis.com/myshopr-api.appspot.com/store_layout.png');
    }
}
