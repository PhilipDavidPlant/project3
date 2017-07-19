import { Component } from "@angular/core";
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';

@Component({
   selector: "list-tabs-part",
   templateUrl:"list-tabs.part.html",
   styleUrls: ["list-tabs.part.css"]
})

export class ListTabsPart {

  friends: FirebaseListObservable<any[]>;
  constructor(db: AngularFireDatabase) {
    this.friends = db.list('/friends');
  }

}