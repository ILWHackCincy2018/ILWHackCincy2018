import { Component, OnInit } from '@angular/core';
import {MeatUp} from './meat-up.model';
import {AngularFirestore} from 'angularfire2/firestore';

@Component({
  selector: 'app-create-raid',
  templateUrl: './create-raid.component.html',
  styleUrls: ['./create-raid.component.css']
})
export class CreateRaidComponent implements OnInit {
  public meatup: MeatUp = new MeatUp();

  constructor(private db: AngularFirestore) {
  }

  ngOnInit() {
  }
  public create() {
    console.log(this.meatup);
    const meatupRef = this.db.collection('meatups').doc(this.meatup.name);

    meatupRef.set({
      'name': this.meatup.name,
      'size': this.meatup.size,
      'style': this.meatup.style,
      'ingredients': this.meatup.ingredients,
      'start': this.meatup.start,
      'meet': this.meatup.meet
    });
  }

}
