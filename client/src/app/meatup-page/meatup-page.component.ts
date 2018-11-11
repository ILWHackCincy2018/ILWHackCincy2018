import {Component, Input, OnInit} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-meatup-page',
  templateUrl: './meatup-page.component.html',
  styleUrls: ['./meatup-page.component.css']
})
export class MeatupPageComponent implements OnInit {

  @Input() meat: any;
   items: Observable<any[]>;
   constructor(db: AngularFirestore) {
     this.items = db.collection('RoadKill').valueChanges();
   }
  ngOnInit() {
  }
}
