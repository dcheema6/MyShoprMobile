import { Component, OnInit } from "@angular/core";
import { isIOS, isAndroid } from "tns-core-modules/platform/platform";
import { ad } from "tns-core-modules/utils/utils";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";

/* ***********************************************************
* Before you can navigate to this page from your app, you need to reference this page's module in the
* global app router module. Add the following object to the global array of routes:
* { path: "go-shopping", loadChildren: "./go-shopping/go-shopping.module#GoShoppingModule" }
* Note that this simply points the path to the page module file. If you move the page, you need to update the route too.
*************************************************************/

@Component({
    selector: "GoShopping",
    templateUrl: "./go-shopping.component.html"
})
export class GoShoppingComponent implements OnInit {
    constructor() {
        /* ***********************************************************
        * Use the constructor to inject app services that you need in this component.
        *************************************************************/
    }

    ngOnInit(): void {
        /* ***********************************************************
        * Use the "ngOnInit" handler to initialize data for this component.
        *************************************************************/
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    creatingView (args) {
        let nativeView;
        if (isIOS) {
            nativeView = UITextView.new();
            nativeView.text = "Native View (iOS)";
        } else if (isAndroid) {
            nativeView = new android.widget.ImageView(ad.getApplicationContext());
            //We want the canvas to scale exactly on the imageview. In Android we do this by setting the //scaleType to fitXY. Since NativeScript allows you to use all the native view methods and //properties, it’s easy:
            nativeView.setScaleType(android.widget.ImageView.ScaleType.FIT_XY);
            //Now, time to create the canvas.
            let bitmap = android.graphics.Bitmap.createBitmap(1000,1000, android.graphics.Bitmap.Config.ARGB_8888);
            let canvas = new android.graphics.Canvas(bitmap);
            //At this point we can draw what we need on our canvas. For example, we’ll draw a blue circle with r = 20.
            // To do this we also need an Android Paint class instance:
            let blueColor = new android.graphics.Paint();
            blueColor.setARGB(255, 0, 0, 255);
            blueColor.setAntiAlias(true);
            canvas.drawCircle(100, 100, 20, blueColor);
            //Now we’ll set the canvas to our image.
            nativeView.setImageBitmap(bitmap);
        }
        args.view = nativeView;
    }
}
