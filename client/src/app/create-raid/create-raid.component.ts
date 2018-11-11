import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import {MeatUp} from '../models/meatup.model';
import {Role} from '../models/role.model';
import {MapsService} from '../services/maps.service';

@Component({
  selector: 'app-create-raid',
  templateUrl: './create-raid.component.html',
  styleUrls: ['./create-raid.component.css']
})
export class CreateRaidComponent implements OnInit {
  public meatup: MeatUp = new MeatUp();
  public meatUpLocation = {latitude: 0, longitude: 0};
  user: firebase.User;

  constructor(public afAuth: AngularFireAuth, private db: AngularFirestore, private mapsService: MapsService) {
    this.user = firebase.auth().currentUser;
  }

  ngOnInit() {
    this.setMeatLocation("Union Hall 1311 Vine St Cincinnati, OH 45202");
  }

  public create() {
    this.db.collection('meatups').add({
      'acquisitionStart':this.meatup.acquisitionStart,
      'attendees': [{
        'name': this.user.displayName ? this.user.displayName : '',
        'role': Role.Judge,
        'userId': this.user.uid
      }],
      'ingredients': [this.meatup.ingredients],
      'isActive': true,
      'location': new firebase.firestore.GeoPoint(this.meatUpLocation.latitude, this.meatUpLocation.longitude),
      'maxChefs': this.meatup.maxChefs,
      'maxJudges': this.meatup.maxJudges,
      'meatupStart': this.meatup.meatupStart,
      'name': this.meatup.name,
      'ownerId': this.user.uid,
      'style': this.meatup.style
    });
  }

  public setMeatLocation(address: string){
    this.mapsService.setLocation(address).subscribe((response: any) => {
      console.log(response);
      this.meatUpLocation.latitude = response.results[0].geometry.location.lat;
      this.meatUpLocation.longitude = response.results[0].geometry.location.lng;
    });
  }
}
