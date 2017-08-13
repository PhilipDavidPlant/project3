import { NgModule } from '@angular/core'; 

import { CreditCardForm } from './credit-card/credit-card.form';
import { TestFormForm } from './test-form/test-form.form';


@NgModule({
    imports: [
        TestFormForm,
        CreditCardForm
    ],
    exports: [
        TestFormForm,
        CreditCardForm
    ],
})
export class FormsGlobalsModuleLoadFirst {}