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
    aisles: Array<any>;
    items: Array<any>;

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
        this.storeService.getItemsAiles().then((itemAisles: Array<any>) => {
            this.aisles = itemAisles;
            this.getLayoutImage().then((imgSrc) => {
                this.imgSrc = imgSrc;
                let placeholder = new Placeholder();
                if (isAndroid)
                    placeholder.setNativeView(this.getLayoutViewAndroid());
                this.slayout.insertChild(placeholder,0);
                this.items = itemAisles;
            });
        });
    }

    getLayoutViewAndroid(): android.widget.ImageView {
        let nativeView = new android.widget.ImageView(ad.getApplicationContext());
        nativeView.setScaleType(android.widget.ImageView.ScaleType.FIT_CENTER);

        let bitmap: android.graphics.Bitmap = this.imgSrc.android.copy(android.graphics.Bitmap.Config.ARGB_8888, true);

        let canvas = new android.graphics.Canvas(bitmap);
        nativeView.setMaxHeight(bitmap.getHeight()
        );
        this.aisles.forEach(aisle => {
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
        this.sortAisles(0, this.aisles.length-1);
        for (let i = 0; i < this.aisles.length-1; i++)
            this.drawLine(this.aisles[i].coords[0], this.aisles[i].coords[1],
                this.aisles[i+1].coords[0], this.aisles[i+1].coords[1], canvas);
    }

    /**
     *  Assumew first and last elements of array aisles
     *  Heuristic search, time Complexity: O(n log n), space complexity: n
     *  n = itemAisleArr.length
     *  */
    sortAisles(startInd: number, endInd: number) {
        this.swapAisles(endInd, this.aisles.length-1);
        this.swapAisles(startInd, 0);
        this.sortAisleHelper(0);
    }

    /**
     *  Recursive
     *  Time Complexity (each loop): O(log n), n = aisles.length
     *  Each time indexsToBeTraversed.length decreases by 1.
     *  */
    sortAisleHelper(currIndex: number): void {
        let endIndex = this.aisles.length-1;
        if (currIndex >= endIndex) return;

        // O(log n)
        let cAisleDisArr = this.getDisToAsile(currIndex, currIndex+1);
        let lAisleDisArr = this.getDisToAsile(endIndex, currIndex+1);

        let maxBias = null;
        let nextIndex = endIndex; // stores the index with maximum bias

        // O(log n)
        for (let i=0; i<cAisleDisArr.length; i++) {
            let bias = lAisleDisArr[i][0] // More bias the furthur away from last aisle
                - cAisleDisArr[i][0]; // More bias the closer to the curr aisle
            if (!maxBias || maxBias < bias) {
                maxBias = bias;
                nextIndex = cAisleDisArr[i][1];
            }
        }

        currIndex++;
        this.swapAisles(currIndex, nextIndex);
        this.sortAisleHelper(currIndex);
    }

    // Returns array of [distance, aisleIndex] sorted by distance for all aisleIndex in indexsToBeTraversed
    getDisToAsile(index: number, startIndex: number): Array<Array<number>> {
        let disArr = [];
        for (let i = startIndex; i < this.aisles.length-1; i++) {
            let dis = this.calculateDis(
                this.aisles[index].coords[0], this.aisles[index].coords[1],
                this.aisles[i].coords[0], this.aisles[i].coords[1]);
            disArr.push([dis, i]);
        }
        return disArr;
    }

    swapAisles(ind1: number, ind2: number): void {
        let temp = this.aisles[ind1]
        this.aisles[ind1] = this.aisles[ind2]
        this.aisles[ind2] = temp
    }

    calculateDis(x1: number, y1: number, x2: number, y2: number): number {
        return Math.sqrt(Math.pow(x1-x2, 2)+Math.pow(y1-y2, 2));
    }

    getLayoutImage(): Promise<ImageSource> {
        return ImageSource.fromUrl('https://storage.googleapis.com/myshopr-api.appspot.com/store_layout.png');
    }
}
