import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Observer } from 'rxjs/Observer';
import 'rxjs/Rx';

@Component({
    selector:'list-test-view',
    templateUrl:'list-test.view.component.html',
    styleUrls:['list-test.view.component.css']
})

export class ListTestViewComponent implements OnInit {

    list: IListItem[];

    constructor(){
        this.list= [
            { firstName:'Philip', otherNames:"David Plant",  profileImagePath:'../../../assets/images/pf6.jpg', amount:100 },
            { firstName:'Marcel', otherNames:"Maurice Plant",   profileImagePath:'../../../assets/images/pf5.jpg', amount:90 },
            { firstName:'Charlotte', otherNames:"Plant", profileImagePath:'../../../assets/images/pf1.jpg', amount:80 },
            { firstName:'Simon', otherNames:"Plant", profileImagePath:'../../../assets/images/pf4.jpg', amount:70 },
            { firstName:'Mum', otherNames:"Plant", profileImagePath:'../../../assets/images/pf2.jpg', amount:60 },
            { firstName:'Kim', otherNames:"Williamson", profileImagePath:'../../../assets/images/pf3.jpg', amount:50 },
            { firstName:'Connor', otherNames:"Fields", profileImagePath:'../../../assets/images/pf6.jpg', amount:40 },
            { firstName:'James', otherNames:"Gilliland", profileImagePath:'../../../assets/images/pf6.jpg', amount:30 }
        ]

        this.list.forEach(element => {
            element.dynamics = {};
        });
    }

    dataStream: Subject<IListItem[]>;
    sortedAndIndexedDataStream: Observable<IListItem[]>;

    ngOnInit(){

        this.dataStream = new Subject<IListItem[]>();

        setInterval( e => {

            // this.list.forEach( (item, index,list) => {
            //     item.amount = Math.floor((Math.random() * 10000) + 1);
            // });

            this.list[5].amount += 10;

            this.dataStream.next(this.list);

        },3000);

        this.sortedAndIndexedDataStream = this.dataStream.map((list:IListItem[])=>{
            this.setIndices(list);
            return list;
        });

    }

    setIndices(list: any[]){
        let listClone = list.slice(0);
        listClone.sort( (a,b) => b.amount-a.amount);
        listClone.forEach((element,i) => {
            let placementIndex = 0;
            list.forEach( (val, index) => {
                if(val.firstName == element.firstName) return placementIndex = index;
            });
            list[placementIndex].dynamics.velocity = Math.abs(list[placementIndex].dynamics.index - i);
            if(list[placementIndex].dynamics.index > i){
                list[placementIndex].dynamics.direction = 1;
            }else if(list[placementIndex].dynamics.index < i){
                list[placementIndex].dynamics.direction = -1;
            }else{
                list[placementIndex].dynamics.direction = 0;
            }
            list[placementIndex].dynamics.index = i;
        });
    }

    animationCallback(item :IListItem, event:TransitionEvent){
        if(event.srcElement.id == 'amtctnr'){
            item.dynamics.direction = 0;
        }
    }

    makeListItemStyle(listItem:IListItem,listLength:number):Object{

        let index = 0;
        if(listItem.dynamics.direction === -1){ index = 0;}
        if(listItem.dynamics.direction === 0){ index = -1;}
        if(listItem.dynamics.direction === 1){ index = 1;}
        index += 3;

        return {
            'z-index': index,
            'top': (75 * listItem.dynamics.index) + 'px',
            'transition-duration': (0.3 + (listItem.dynamics.velocity/listLength*2.5)) + "s"
        };
    }

    makeProfilePic(listItem: IListItem){
        return {
            'background-image': 'url(' + listItem.profileImagePath + ')'
        }
    }

}

interface IListItem {
    firstName:string;
    otherNames:string;
    profileImagePath:string;
    amount:number;

    dynamics?:IListItemDynamics;
}

interface IListItemDynamics {
    index?:number;
    velocity?:number;
    direction?:number;
}