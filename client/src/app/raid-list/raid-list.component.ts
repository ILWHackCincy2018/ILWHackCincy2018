import {Component, OnInit} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {MeatUp} from '../models/meatup.model';

@Component({
  selector: 'app-raid-list',
  templateUrl: './raid-list.component.html',
  styleUrls: ['./raid-list.component.css']
})
export class RaidListComponent implements OnInit {

  raids: Observable<any[]>;

  constructor(db: AngularFirestore) {
    this.raids = db.collection('meatups',
      ref => ref.where('isActive', '==', true)).valueChanges();
  }

  ngOnInit() {
  }

  hasSpace(item: MeatUp) {
    return item.attendeeCount < item.maxChefs;
  }

}
