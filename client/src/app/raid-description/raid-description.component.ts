import {Component, Input, OnInit} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {MeatUp} from '../models/meatup.model';

@Component({
  selector: 'app-raid-description',
  templateUrl: './raid-description.component.html',
  styleUrls: ['./raid-description.component.css']
})
export class RaidDescriptionComponent implements OnInit {

@Input() meatup: MeatUp;

  constructor(private db: AngularFirestore) {
  }

  ngOnInit() {
  }

  joinMeatup() {
    this.db.collection('meatups').doc(this.meatup.id).update({
      'attendees': []
    });
  }

}
