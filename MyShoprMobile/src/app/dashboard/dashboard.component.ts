import { Component, OnInit } from "@angular/core";
import { SelectedIndexChangedEventData } from "nativescript-drop-down";

@Component({
    selector: "Dashboard",
    moduleId: module.id,
    templateUrl: "./dashboard.component.html"
})

export class DashboardComponent implements OnInit {
    public selectedIndex = 1;
    public items: Array<string>;
    constructor() {
        this.items = [];
        for (var i = 0; i < 5; i++) {
            this.items.push("data item " + i);
        }
    }

    ngOnInit(): void {
    }

    public onchange(args: SelectedIndexChangedEventData) {
        console.log(`Drop Down selected index changed from ${args.oldIndex} to ${args.newIndex}`);
    }
 
    public onopen() {
        console.log("Drop Down opened.");
    }
 
    public onclose() {
        console.log("Drop Down closed.");
    }

}
