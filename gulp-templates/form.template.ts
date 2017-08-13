import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

@Component({
    selector: '<%= name %>-<%= type %>',
    templateUrl: '<%= name %>.<%= type %>.html',
    styleUrls: ['<%= name %>.<%= type %>.css']
})
export class <%= className %> {

    <%= variableName %>: FormGroup;

    constructor(formBuilder:FormBuilder){
        this.createForm();
    }

    private createForm(){

    }
}