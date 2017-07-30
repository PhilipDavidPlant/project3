import {Component, OnInit, Renderer2, ViewChild, QueryList, ElementRef, AfterViewInit} from '@angular/core';

@Component({
    selector:'list-test-view',
    templateUrl:'list-test.view.component.html',
    styleUrls:['list-test.view.component.css']
})

export class ListTestViewComponent implements OnInit, AfterViewInit {

    @ViewChild("listContainer") private listContainer : ElementRef;

    constructor(private renderer:Renderer2){}

    list: ListItem[] = [
        { name:'Philip',    amount:100 },
        { name:'Marcel',    amount:150 },
        { name:'Charlotte',       amount:120 },
        { name:'Simon', amount:110 },
        { name:'Mum',     amount:130 },
        { name:'Kim',       amount:200 }
    ];

    ngOnInit(){
        setInterval( e => {

            this.list.forEach( (item, index) => {
                item.amount = Math.floor((Math.random() * 100) + 1);
                item.index = index;
            });

        },3000);

        setInterval( e => {
            for(let i=0; i< this.list.length; i++){
                if(this.list[i].index != 0 && i != 0){
                    if(this.list[i].index && this.list[i].amount > this.list[i-1].amount){
                        let holdIndex = this.list[i].index;
                        this.list[i].index = this.list[i-1].index;
                        this.list[i-1].index = holdIndex;
                    }
                }
            }
        },500);

    }

    ngAfterViewInit(){
        let listItems = this.listContainer.nativeElement.children;
        for(let item of listItems){
            item.addEventListener("webkitAnimationEnd", ()=>{this.animationCallback});
            item.addEventListener("animationend", ()=>{this.animationCallback});
            item.addEventListener("oanimationend", ()=>{this.animationCallback});
        }
    }

    animationCallback(){
        console.log("animationFinished");
    }

    makeListItemStyle(index:number, list:any[]):Object{
        if(index){
            return {
                'z-index': list.length - index ,
                'top': (40 * index) + 'px'
            };
        }else{
            return {
                'z-index': list.length - index ,
                'top': '0px'
            }; 
        }
    }

}

interface ListItem {
    name:string;
    amount:number;
    index?:number;
}