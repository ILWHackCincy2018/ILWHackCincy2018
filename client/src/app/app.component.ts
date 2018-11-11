import {Component} from '@angular/core';
import {StateService} from '@uirouter/angular';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-app';

  user: Observable<firebase.User>;
  items: Observable<any[]>;
  constructor(public afAuth: AngularFireAuth,
    db: AngularFirestore,
    public state: StateService) {
    // this.afAuth.auth.signInAnonymously();
    // this.user = this.afAuth.authState;
    this.items = db.collection('RoadKill').valueChanges();
  }

  login() {
    this.state.go('home');
  }

  logout() {
    this.afAuth.auth.signOut();
  }
}
