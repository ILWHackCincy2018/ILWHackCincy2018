import {Component, Input, OnInit} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import * as firebase from 'firebase';
import {MeatUp} from '../models/meatup.model';

@Component({
  selector: 'app-raid-description',
  templateUrl: './raid-description.component.html',
  styleUrls: ['./raid-description.component.css']
})
export class RaidDescriptionComponent implements OnInit {

@Input() meatup: MeatUp;
  user: firebase.User;

  constructor(public afAuth: AngularFireAuth, private db: AngularFirestore) {
    this.user = firebase.auth().currentUser;
  }

  ngOnInit() {
  }

  joinMeatup() {
    this.db.collection('meatups').doc(this.meatup.id).update({
      'attendeeCount': this.meatup.attendeeCount + 1
    });
    this.db.collection('meatups').doc(this.meatup.id).collection('attendees').add({
      'name': this.user.displayName ? this.user.displayName : '',
      'userId': this.user.uid
    });
  }

}
