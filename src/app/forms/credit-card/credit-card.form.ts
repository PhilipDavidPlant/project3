import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { creditCardFormService } from './credit-card.form.service';

@Component({
    selector: 'credit-card-form',
    templateUrl: 'credit-card.form.html',
    styleUrls: ['credit-card.form.css'],
    providers: [ creditCardFormService ]
})
export class CreditCardForm {

    creditCardForm: FormGroup;

    constructor( private formBuilder:FormBuilder, private service:creditCardFormService ){
        this.createForm();
    }

    private createForm():void{
        this.creditCardForm = this.formBuilder.group({
          name : '',
          cardNumber : [ '', Validators.required ],
          securityNumber : [ '', Validators.required ], 
          expiryDate : [ new Date(), Validators.required ] 
        });
    }

    private editForm():void{

    }

    private deleteForm():void{

    }

}