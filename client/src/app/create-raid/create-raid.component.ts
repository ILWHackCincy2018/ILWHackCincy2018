import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import {MeatUp} from '../models/meatup.model';
import {MapsService} from '../services/maps.service';

@Component({
  selector: 'app-create-raid',
  templateUrl: './create-raid.component.html',
  styleUrls: ['./create-raid.component.css']
})
export class CreateRaidComponent implements OnInit {
  public meatUpLocation = {latitude: 0, longitude: 0};
  public meatup: MeatUp = new MeatUp();
  user: firebase.User;

  constructor(public afAuth: AngularFireAuth, private db: AngularFirestore, private mapsService: MapsService) {
    this.user = firebase.auth().currentUser;
  }

  public create() {
    this.db.collection('meatups').add({
      'acquisitionStart': this.meatup.acquisitionStart,
      'attendeeCount': 1,
      'ingredients': [this.meatup.ingredients],
      'isActive': true,
      'location': new firebase.firestore.GeoPoint(this.meatUpLocation.latitude, this.meatUpLocation.longitude),
      'maxChefs': this.meatup.maxChefs,
      'meatupStart': this.meatup.meatupStart,
      'name': this.meatup.name,
      'ownerId': this.user.uid,
      'style': this.meatup.style
    }).then(doc => {
      this.db.collection('meatups').doc(doc.id).update({
        'id': doc.id
      });
      this.db.collection('meatups').doc(doc.id).collection('attendees').add({
        'meatupId': doc.id,
        'meatupName': this.meatup.name,
        'name': this.user.displayName ? this.user.displayName : '',
        'userId': this.user.uid,
      });

      this.db.collection('users').doc(this.user.uid).collection('meetups').add({
        'name': this.meatup.name,
        'meatupId': doc.id,
        'isOwner': true
      });
    });
  }

  ngOnInit() {
    this.setMeatLocation("Union Hall 1311 Vine St Cincinnati, OH 45202");
  }

  public setMeatLocation(address: string) {
    this.mapsService.setLocation(address).subscribe((response: any) => {
      this.meatUpLocation.latitude = response.results[0].geometry.location.lat;
      this.meatUpLocation.longitude = response.results[0].geometry.location.lng;
    });
  }
}
