import { NgModule } from '@angular/core'; 

import { CreditCardForm } from './credit-card/credit-card.form';

@NgModule({
    imports: [
        CreditCardForm
    ],
    exports: [
        CreditCardForm
    ],
})
export class FormsGlobalsModuleLoadFirst {}