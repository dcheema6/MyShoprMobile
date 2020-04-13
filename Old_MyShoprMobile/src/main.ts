// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { platformNativeScriptDynamic } from "nativescript-angular/platform";

import { AppModule } from "./app/app.module";

require("nativescript-plugin-firebase");
import * as firebase from 'nativescript-plugin-firebase';

firebase.init({persist: true}).then(() => {
        console.log("firebase init done, adding auth listened"); 
    },
    error => {
        console.log(`firebase.init error: ${error}`);
    }
).catch(error => {console.log(error)});

platformNativeScriptDynamic().bootstrapModule(AppModule);
