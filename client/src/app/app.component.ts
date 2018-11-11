import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';

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
    this.afAuth.auth.signInAnonymously();
    this.user = this.afAuth.authState;
    this.items = db.collection('items').valueChanges();
  }
}
