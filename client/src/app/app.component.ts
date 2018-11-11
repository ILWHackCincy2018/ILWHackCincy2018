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
  title = 'my-app';

  user: firebase.User;
  items: Observable<any[]>;
  myRaids: Observable<any[]>;
  constructor(public afAuth: AngularFireAuth,
    private db: AngularFirestore,
    public state: StateService) {
    this.user = firebase.auth().currentUser;

    this.items = db.collection('RoadKill').valueChanges();
  }

  gotClicked(){
    this.myRaids = this.db.collection('users').doc(this.user.uid).collection('meetups').valueChanges();
  }

  login() {
    this.state.go('home');
  }

  logout() {
    this.afAuth.auth.signOut();
  }
}
