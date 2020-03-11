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
    itemAisleArr: any;
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
            this.itemAisleArr = itemAisles;
            this.getLayoutImage().then((imgSrc) => {
                this.imgSrc = imgSrc;
                let placeholder = new Placeholder();
                if (isAndroid)
                    placeholder.setNativeView(this.getLayoutViewAndroid());
                this.slayout.insertChild(placeholder,0);
                this.items = this.itemAisleArr;
            });
        });
    }

    getLayoutViewAndroid(): android.widget.ImageView {
        let nativeView = new android.widget.ImageView(ad.getApplicationContext());
        nativeView.setScaleType(android.widget.ImageView.ScaleType.FIT_CENTER);

        let bitmap: android.graphics.Bitmap = this.imgSrc.android.copy(android.graphics.Bitmap.Config.ARGB_8888, true);

        let canvas = new android.graphics.Canvas(bitmap);
        nativeView.setMaxHeight(bitmap.getHeight());
        this.itemAisleArr.forEach(aisle => {
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
        let path = this.getPath();
        for (let i = 0; i < path.length-1; i++)
            this.drawLine(this.itemAisleArr[path[i]].coords[0], this.itemAisleArr[path[i]].coords[1],
                this.itemAisleArr[path[i+1]].coords[0], this.itemAisleArr[path[i+1]].coords[1], canvas);
    }

    /**
     *  Assumew first and last elements of array itemAisleMap
     *  Heuristic search, time Complexity: O(n (log n)^2), space complexity: n
     *  n = itemAisleArr.length
     *  */
    getPath(): Array<number> {
        let path = [0];
        let indexsToBeTraversed = [];
        for (let i = 1; i < this.itemAisleArr.length; i++) indexsToBeTraversed.push(i);
        this.getPathHelper(path, indexsToBeTraversed);
        return path;
    }

    /**
     *  Recursive
     *  Time Complexity (each loop): O(n^2), n = indexsToBeTraversed.length
     *  Each time indexsToBeTraversed.length decreases by 1.
     *  */
    getPathHelper(path: Array<number>, indexsToBeTraversed: Array<number>): void {
        let currIndex = path[path.length-1];
        let lastIndex = this.itemAisleArr.length - 1;

        // Run until reached last node
        // Runs n times
        if (currIndex === lastIndex || currIndex < 0) return;

        // O(log n log log n)
        let cDisArr = this.addDisToAsileMap(currIndex, indexsToBeTraversed, "cDis");
        let lDisArr = this.addDisToAsileMap(lastIndex, indexsToBeTraversed, "lDis");

        let biases = [];
        let maxBias = -lastIndex;
        let pathIndex = lastIndex; // stores the index with maximum bias
        // O ((log n)^2)
        indexsToBeTraversed.forEach((i) => {
            let bias = lDisArr.indexOf(this.itemAisleArr[i].ldis) // More bias the furthur away from last node
                - cDisArr.indexOf(this.itemAisleArr[i].cdis); // More bias the closer to the curr node
            biases.push(bias);
            if (maxBias < bias) {
                maxBias = bias;
                pathIndex = i;
            }
        });

        //
        delete indexsToBeTraversed[indexsToBeTraversed.indexOf(pathIndex)];
        path.push(pathIndex); // add the index with maximum bias to path
        this.getPathHelper(path, indexsToBeTraversed);
    }

    addDisToAsileMap(index: number, indexsToBeTraversed: Array<number>, identifier: string): Array<number> {
        let disArr = [];
        let aisle = this.itemAisleArr[index];
        indexsToBeTraversed.forEach(i => {
            let dis = this.calculateDis(
                aisle.coords[0], this.itemAisleArr[i].coords[0],
                aisle.coords[1], this.itemAisleArr[i].coords[1]);
            this.itemAisleArr[i][identifier] = dis;
            disArr.push(dis);
        });
        disArr.sort();
        return disArr;
    }

    calculateDis(x1: number, y1: number, x2: number, y2: number): number {
        return Math.sqrt(Math.pow(x1-x2, 2)+Math.pow(y1-y2, 2));
    }

    getLayoutImage(): Promise<ImageSource> {
        return ImageSource.fromUrl('https://storage.googleapis.com/myshopr-api.appspot.com/store_layout.png');
    }
}
