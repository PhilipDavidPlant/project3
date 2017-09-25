import { Injectable } from '@angular/core';

@Injectable()
export class creditCardFormService{
    private APIEndpoint = 'forms/credit-card'
    
    createForm(){
        console.log('create form called');
    }

    readForm(){
        console.log('read form called');
    }

    editForm(){
        console.log('edit form called');
    }

    deleteForm(){
        console.log('delete form called');
    }
}