import {Component, OnInit} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-raid-description',
  templateUrl: './raid-description.component.html',
  styleUrls: ['./raid-description.component.css']
})
export class RaidDescriptionComponent implements OnInit {

  raids: Observable<any[]>;

  constructor(db: AngularFirestore) {
    var raidRef = db.collection('meatups',
        ref => ref.where('isActive', '==', 'true'));
  }

  ngOnInit() {
  }

}
