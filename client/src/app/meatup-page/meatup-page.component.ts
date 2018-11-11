import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-meatup-page',
  templateUrl: './meatup-page.component.html',
  styleUrls: ['./meatup-page.component.css']
})
export class MeatupPageComponent implements OnInit {

  items: Observable<any[]>;
  constructor(db: AngularFirestore)) { 
    this.items = db.collection('RoadKill').valueChanges();
  }

  ngOnInit() {
  }

}
