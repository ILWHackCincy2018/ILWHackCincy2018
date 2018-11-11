import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-meatup-page',
  templateUrl: './meatup-page.component.html',
  styleUrls: ['./meatup-page.component.css']
})
export class MeatupPageComponent implements OnInit {

   items: Observable<any[]>;
   constructor(db: AngularFirestore) {
     this.items = db.collection('RoadKill').valueChanges();
   }
  ngOnInit() {
  }
}
