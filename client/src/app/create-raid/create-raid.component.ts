import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import {MeatUp} from './meat-up.model';

@Component({
  selector: 'app-create-raid',
  templateUrl: './create-raid.component.html',
  styleUrls: ['./create-raid.component.css']
})
export class CreateRaidComponent implements OnInit {
  public meatup: MeatUp = new MeatUp();
  user: firebase.User;

  constructor(public afAuth: AngularFireAuth, private db: AngularFirestore) {
    this.user = firebase.auth().currentUser;
  }

  ngOnInit() {
  }
  public create() {
    console.log(this.meatup);
    const meatupRef = this.db.collection('meatups').doc(this.meatup.name);

    meatupRef.set({
      'acquisitionStart':this.meatup.acquisitionStart,
      'ingredients': this.meatup.ingredients,
      'isActive': true,
      'location': new firebase.firestore.GeoPoint(0, 0),
      'maxChefs': this.meatup.maxChefs,
      'maxJudges': this.meatup.maxJudges,
      'meatupStart': this.meatup.meatupStart,
      'name': this.meatup.name,
      'ownerId': this.user.getIdToken(),
      'style': this.meatup.style
    });
  }

}
