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

  user: Observable<firebase.User>;

  constructor(public afAuth: AngularFireAuth) {
    this.user = afAuth.authState;
  }

  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
  }
}