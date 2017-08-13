import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

//Importing Service
import { <%= className %>Service } from './<%= name %>.<%= type %>.service';

@Component({
    selector: '<%= name %>-<%= type %>',
    templateUrl: '<%= name %>.<%= type %>.html',
    styleUrls: ['<%= name %>.<%= type %>.css'],
    providers: [ <%= className %>Service ]
})
export class <%= className %> {

    <%= variableName %>: FormGroup;

    constructor(formBuilder:FormBuilder, service:<%= className %>Service){
        this.createForm();
    }

    private createForm(){

    }
}