import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

//Importing Service
import { TestFormFormService } from './test-form.form.service';

@Component({
    selector: 'test-form-form',
    templateUrl: 'test-form.form.html',
    styleUrls: ['test-form.form.css'],
    providers: [ TestFormFormService ]
})
export class TestFormForm {

    testForm: FormGroup;

    constructor(formBuilder:FormBuilder, service:TestFormFormService){
        this.createForm();
    }

    private createForm(){

    }
}