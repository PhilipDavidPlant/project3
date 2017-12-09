import { Component, OnInit } from '@angular/core';

import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';

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

    displayList: any[] = [];
    friends: FirebaseListObservable<any[]>;
    

    constructor(db: AngularFireDatabase){

        this.friends = db.list('/friends');
        
        this.displayList.forEach((item) => {
            item.dynamics = {};
        });

        // this.list= [
        //     { firstName:'Philip', otherNames:"David Plant",  profileImagePath:'../../../assets/images/pf6.jpg', amount:100 },
        //     { firstName:'Marcel', otherNames:"Maurice Plant",   profileImagePath:'../../../assets/images/pf5.jpg', amount:90 },
        //     { firstName:'Charlotte', otherNames:"Plant", profileImagePath:'../../../assets/images/pf1.jpg', amount:80 },
        //     { firstName:'Simon', otherNames:"Plant", profileImagePath:'../../../assets/images/pf4.jpg', amount:70 },
        //     { firstName:'Mum', otherNames:"Plant", profileImagePath:'../../../assets/images/pf2.jpg', amount:60 },
        //     { firstName:'Kim', otherNames:"Williamson", profileImagePath:'../../../assets/images/pf3.jpg', amount:50 },
        //     { firstName:'Connor', otherNames:"Fields", profileImagePath:'../../../assets/images/pf6.jpg', amount:40 },
        //     { firstName:'James', otherNames:"Gilliland", profileImagePath:'../../../assets/images/pf6.jpg', amount:30 }
        // ]

        // this.list.forEach(element => {
        //     element.dynamics = {};
        // });
    }

    //dataStream: Subject<IListItem[]>;
    sortedAndIndexedDataStream: Observable<IListItem[]>;

    ngOnInit(){

        // this.dataStream = new Subject<IListItem[]>();

        // setInterval( e => {

        //     this.list.forEach( (item, index,list) => {
        //         item.amount += Math.floor((Math.random() * 10) + 1);
        //     });

        //     // this.list[5].amount += 10;

        //     // if(this.list[5].amount > 120){ this.list[5].amount = 10; }

        //     this.dataStream.next(this.list);

        // },2000);

        this.sortedAndIndexedDataStream = this.friends.map((list:any[])=>{
            this.processItems(list);
            return this.displayList;
        });

    }

    processItems(list: any[]){
        console.log(list);
        //let listClone = list.slice(0);
        list.sort( (a,b) => b.amount-a.amount);

        list.forEach((element,orderedListIndex) => {

            let matchedItem = this.displayList.find( (val:any) => {
                return val.$key == element.$key;
            });

            if(matchedItem !== undefined){
                    this.mapValues(matchedItem, element);
                    this.makeDynamics(matchedItem, orderedListIndex);
            }else{
                this.displayList.push(element);
                this.displayList[this.displayList.length-1].dynamics = {};
                this.displayList[this.displayList.length-1].dynamics.index = this.displayList.length-1;
                this.displayList[this.displayList.length-1].dynamics.direction = 0;
            }

        });
    }

    makeDynamics(element: any, newIndex: number){

        element.dynamics.velocity = Math.abs(element.dynamics.index - newIndex);

        if(element.dynamics.index > newIndex){
            element.dynamics.direction = 1;
        }else if(element.dynamics.index < newIndex){
            element.dynamics.direction = -1;
        }else{
            element.dynamics.direction = 0;
        }
        element.dynamics.index = newIndex;
    }

    mapValues(val:any, element:any){
        for(let property in element){
            if(property !== 'dynamics'){
                val[property] = element[property];
            }
        }
    }

    animationCallback(item :IListItem, event:TransitionEvent){
        if(event.srcElement.id == 'amtctnr'){
            item.dynamics.direction = 0;
        }
    }

    makeListItemStyle(listItem:IListItem):Object{

        let index = 0;
        if(listItem.dynamics.direction === -1){ index = 0;}
        if(listItem.dynamics.direction === 0){ index = -1;}
        if(listItem.dynamics.direction === 1){ index = 1;}
        index += 3;

        return {
            'z-index': index,
            'top': (78 * listItem.dynamics.index) + 'px',
            'transition-duration': (0.4 + (listItem.dynamics.velocity/this.displayList.length*2.5)) + "s"
        };
    }

    makeProfilePic(listItem: IListItem){
        return {
            'background-image': 'url(' + listItem.profileImagePath + ')'
        }
    }

}

class IListItem {
    firstName:string;
    otherNames:string;
    profileImagePath:string;
    amount:number;

    dynamics:IListItemDynamics;
}

interface IListItemDynamics {
    index?:number;
    velocity?:number;
    direction?:number;
}