import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { EventData } from "tns-core-modules/data/observable";
import { Placeholder } from "tns-core-modules/ui/placeholder";
import { isIOS, isAndroid } from "tns-core-modules/platform/platform";
import { ad } from "tns-core-modules/utils/utils";
import { ImageSource } from '@nativescript/core/image-source/image-source';

import { StoresService } from '../services/stores.service';
import { PercentLength } from "tns-core-modules/ui/page/page";

@Component({
    selector: "GoShopping",
    moduleId: module.id,
    styleUrls: ["go-shopping.component.scss"],
    templateUrl: "./go-shopping.component.html",
    providers: [StoresService]
})
export class GoShoppingComponent implements OnInit {
    slayout: any;
    imgSrc: ImageSource;
    itemAisleMap: any;
    items: any = [];

    constructor(private storeService: StoresService) {
    }

    ngOnInit(): void {
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    pageLoaded(args: EventData): void {
        this.slayout = args.object;
        this.storeService.getItemsAiles().then((itemAisles) => {
            this.itemAisleMap = itemAisles;
            this.getLayoutImage().then((imgSrc) => {
                this.imgSrc = imgSrc;
                let placeholder = new Placeholder();
                if (isAndroid)
                    placeholder.setNativeView(this.getLayoutViewAndroid());
                this.slayout.insertChild(placeholder,0);
                this.items = this.itemAisleMap;
            });
        });
    }

    getLayoutViewAndroid(): android.widget.ImageView {
        let nativeView = new android.widget.ImageView(ad.getApplicationContext());
        nativeView.setScaleType(android.widget.ImageView.ScaleType.FIT_CENTER);

        let bitmap: android.graphics.Bitmap = this.imgSrc.android.copy(android.graphics.Bitmap.Config.ARGB_8888, true);

        let canvas = new android.graphics.Canvas(bitmap);
        this.itemAisleMap.forEach(aisle => {
            this.addNodeToCanvasAndroid(aisle.coords[0], aisle.coords[1], 40, canvas);
        });

        nativeView.setImageBitmap(bitmap);
        return nativeView;
    }

    addNodeToCanvasAndroid(x: number, y: number, size: number, canvas: android.graphics.Canvas): void {
        let paint = new android.graphics.Paint();
        paint.setARGB(255, 0, 0, 255);
        paint.setAntiAlias(true);
        paint.setStrokeWidth(10);
        paint.setStyle(android.graphics.Paint.Style.STROKE)
        canvas.drawCircle(x, y, size, paint);
    }

    getPaths() {
        //thi
    }

    getLayoutImage(): Promise<ImageSource> {
        return ImageSource.fromUrl('https://storage.googleapis.com/myshopr-api.appspot.com/store_layout.png');
    }
}
