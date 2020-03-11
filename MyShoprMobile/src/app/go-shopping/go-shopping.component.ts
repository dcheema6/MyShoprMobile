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
        nativeView.setMaxHeight(bitmap.getHeight());
        this.itemAisleMap.forEach(aisle => {
            this.addNodeToCanvasAndroid(aisle.coords[0], aisle.coords[1], 40, canvas);
        });
        this.drawPaths(canvas);

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

    drawLine(x1: number, y1: number, x2: number, y2: number, canvas: android.graphics.Canvas): void {
        let paint = new android.graphics.Paint();
        paint.setARGB(255, 0, 0, 255);
        paint.setAntiAlias(true);
        paint.setStrokeWidth(10);
        paint.setStyle(android.graphics.Paint.Style.STROKE)
        canvas.drawLine(x1,y1,x2,y2,paint);
    }

    drawPaths(canvas: android.graphics.Canvas): void {
        let paths = [];
        this.populatePath(paths, []);
        console.log(paths[6]);
        
        for (let i = 0; i < paths.length - 1; i++)
            this.drawLine(this.itemAisleMap[paths[i]].coords[0], this.itemAisleMap[paths[i]].coords[1],
                this.itemAisleMap[paths[i+1]].coords[0], this.itemAisleMap[paths[i+1]].coords[1], canvas);
    }

    populatePath(path: Array<any>, aisleIndexs: Array<any>): void {
        let currIndex = 0;
        if (path.length > 1) currIndex = path[path.length-1];
        let lastIndex = this.itemAisleMap.length - 1;

        if (currIndex === lastIndex || currIndex < 0) {
            path.pop();
            path.push(lastIndex);
            return;
        }

        let cDisArr = this.getDistances(currIndex, aisleIndexs);
        let lDisArr = this.getDistances(lastIndex, aisleIndexs);

        let points = [].fill(0,0,lastIndex);
        let maxPoints = 0

        for (let i = 0; i < lastIndex; i++) {
            if (path.indexOf(i) > -1) continue; // If already in path, skip
            points[i] = lastIndex - cDisArr.indexOf(this.itemAisleMap[i].cdis) // More points the closer to the curr node
                + lDisArr.indexOf(this.itemAisleMap[i].ldis); // More points the furthur away from last node
            console.log(i, points[i]);
            if (maxPoints <= points[i]) maxPoints = points[i];
        }

        let pathIndex = points.indexOf(maxPoints);
        delete aisleIndexs[aisleIndexs.indexOf(pathIndex)]
        path.push(pathIndex);
        this.populatePath(path, aisleIndexs);
    }

    getDistances(index: number, aisleIndexs: Array<number>): Array<number> {
        let disArr = [];
        let aisle = this.itemAisleMap[index];
        aisleIndexs.forEach(i => {
            let cDis = this.calculateDis(
                aisle.coords[0], this.itemAisleMap[i].coords[0],
                aisle.coords[1], this.itemAisleMap[i].coords[1]);
            this.itemAisleMap[i]["cdis"] = cDis;
            disArr.push(cDis);
        });
        return disArr;
    }

    calculateDis(x1: number, y1: number, x2: number, y2: number): number {
        return Math.sqrt(Math.pow(x1-x2, 2)+Math.pow(y1-y2, 2));
    }

    getLayoutImage(): Promise<ImageSource> {
        return ImageSource.fromUrl('https://storage.googleapis.com/myshopr-api.appspot.com/store_layout.png');
    }
}
