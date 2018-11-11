import {Component, Input, OnInit} from '@angular/core';
import {MeatUp} from '../models/meatup.model';

@Component({
  selector: 'app-raid-description',
  templateUrl: './raid-description.component.html',
  styleUrls: ['./raid-description.component.css']
})
export class RaidDescriptionComponent implements OnInit {

@Input() meatup: MeatUp;

  constructor() {
  }

  ngOnInit() {
  }

}
