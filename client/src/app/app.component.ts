import {Component} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {StateService} from '@uirouter/angular';
import * as firebase from 'firebase/app';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  items: Observable<any[]>;
  myRaids: Observable<any[]> = new Observable<any[]>();
  title = 'my-app';
  user: firebase.User;

  constructor(public afAuth: AngularFireAuth,
              private db: AngularFirestore,
              public state: StateService) {
    this.items = db.collection('RoadKill').valueChanges();
    setTimeout(()=> {
      this.user = firebase.auth().currentUser;
      this.myRaids = this.db.collection('users').doc(this.user.uid).collection('meetups').valueChanges();
    }, 1000);
  }

  login() {
    this.state.go('home');
  }

  logout() {
    this.afAuth.auth.signOut();
  }
}
