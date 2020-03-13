import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { FormBuilder, FormGroup, FormControl } from "@angular/forms";


@Component({
    selector: "CreateRecipe",
    moduleId: module.id,
    templateUrl: "./create-recipe.component.html"
})
export class CreateRecipeComponent implements OnInit {

    newRecipeForm: FormGroup = new FormGroup({
        name: new FormControl(''),
        ingredient: new FormControl(),
        quantity: new FormControl(''),
        instruction: new FormControl()
    });

    ingredientsList = [];
    instructionsList = [];

    constructor(private fb: FormBuilder) {
    }

    ngOnInit(): void {
    }

    addIngredient() {
        this.ingredientsList.push({name: this.newRecipeForm.controls['ingredients'].value, quantity: this.newRecipeForm.controls['quantity'].value})
        console.log(this.ingredientsList)
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
