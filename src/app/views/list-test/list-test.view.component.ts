import {Component, OnInit, Renderer2, ViewChild, QueryList, ElementRef, AfterViewInit} from '@angular/core';
import { Observable, Observer, Subject } from 'rxjs';
import 'rxjs/Rx';
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

    dataStream: Subject<ListItem[]>;
    sortedAndIndexedDataStream: Observable<ListItem[]>;

    ngOnInit(){

        this.dataStream = new Subject<ListItem[]>();

        setInterval( e => {

            this.list.forEach( (item, index) => {
                item.amount = Math.floor((Math.random() * 100) + 1);
            });

            this.dataStream.next(this.list);

        },3000);

        this.sortedAndIndexedDataStream = this.dataStream.map((list:ListItem[])=>{
            //list.sort((a, b) => b.amount-a.amount);
            this.setIndices(list);
            //console.log(list);
            return list;
        });

    }

    setIndices(list: any[]){
        let listClone = list.slice(0);
        listClone.sort( (a,b) => b.amount-a.amount);
        listClone.forEach((element,i) => {
            let placementIndex = 0;
            list.forEach( (val, index) => {
                if(val.name == element.name) return placementIndex = index;
            });
            list[placementIndex].velocity = Math.abs(list[placementIndex].index - i);
            if(list[placementIndex].index > i){
                list[placementIndex].direction = 1;
            }else if(list[placementIndex].index < i){
                list[placementIndex].direction = -1;
            }else{
                list[placementIndex].direction = 0;
            }
            list[placementIndex].index = i;
        });
    }

    ngAfterViewInit(){
        let listItems = this.listContainer.nativeElement.children;
        for(let item of listItems){
            item.addEventListener("transitionend", (e)=>{this.animationCallback(e);});
            item.addEventListener("webkitAnimationEnd", (e)=>{this.animationCallback(e);});
            item.addEventListener("animationend", (e)=>{this.animationCallback(e);});
            item.addEventListener("oanimationend", (e)=>{this.animationCallback(e);});
            item.addEventListener("ontransitionend", (e)=>{this.animationCallback(e);});
            item.addEventListener("webkitTransitionEnd", (e)=>{this.animationCallback(e);});
        }
    }

    animationCallback(event :any){
        console.log(event);
        //this.renderer.removeClass(event.,"going-up");
        //this.renderer.removeClass(event.target,"going-down");
    }

    makeListItemStyle(listItem:ListItem,listLength:number):Object{
        if(listItem.index){
            return {
                'z-index': (listItem.direction + 3),
                'top': (40 * listItem.index) + 'px',
                'transition-duration': (0.5 + (listItem.velocity/listLength)) + "s"
            };
        }else{
            return {}; 
        }
    }

}

interface ListItem {
    name:string;
    amount:number;
    index?:number;
    velocity?:number;
    direction?:number;
}