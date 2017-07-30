import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './login.view.component.html',
  styleUrls: ['./login.view.component.css']
})
export class LoginViewComponent {

  userStream: Observable<firebase.User>;
  userProfile: any;

  constructor(public afAuth: AngularFireAuth) {
    this.userStream = afAuth.authState;
  }

  loginWithFacebook() {
    let provider = new firebase.auth.FacebookAuthProvider();
    provider.addScope("user_friends");

    this.afAuth.auth.signInWithPopup(provider).catch( error => {
      console.log(error);
    }).then( result =>{
        var token = result.credential.accessToken;
        console.log(result);
      }
    );

    this.userStream.subscribe( (profile) => {
      this.userProfile = profile;
    });
  }

  logout() {
    this.afAuth.auth.signOut().then( r => console.log("logged out"));
  }
}