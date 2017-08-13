import { Component, OnInit } from '@angular/core';

@Component({
    selector: '<%= name %>-<%= type %>',
    templateUrl: '<%= name %>.<%= type %>.html',
    styleUrls: ['<%= name %>.<%= type %>.css']
})

export class <%= className %> implements OnInit{

    constructor(){}

    ngOninit(){}

}