import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'credit-card-form',
    templateUrl: 'credit-card.form.html',
    styleUrls: ['credit-card.from.css']
})
export class CreditCardForm {
      name = new FormControl();
      cardNumber = new FormControl();
      securityNumber = new FormControl();
      expiryDate = new FormControl();
}