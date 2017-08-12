import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

@Component({
    selector: 'credit-card-form',
    templateUrl: 'credit-card.form.html',
    styleUrls: ['credit-card.form.css']
})
export class CreditCardForm {

    creditCardForm: FormGroup;

    constructor(formBuilder:FormBuilder){
        this.createForm();
    }

    private createForm(){

    }

    // creditCardForm = new FormGroup({
    //   name : new FormControl(),
    //   cardNumber : new FormControl(),
    //   securityNumber : new FormControl(),
    //   expiryDate : new FormControl()
    // });
}