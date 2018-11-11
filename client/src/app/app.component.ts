import {Component} from '@angular/core';
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
  constructor(public afAuth: AngularFireAuth, db: AngularFirestore) {
    // this.afAuth.auth.signInAnonymously();
    // this.user = this.afAuth.authState;
    this.items = db.collection('RoadKill').valueChanges();
  }

  logout() {
    this.afAuth.auth.signOut();
  }
}

