import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-road-kill-locator',
  templateUrl: './road-kill-locator.component.html',
  styleUrls: ['./road-kill-locator.component.css']
})
export class RoadKillLocatorComponent implements OnInit {
  title: string = 'My first AGM project';
  lat: number = 39.1067133124343;
  lng: number = -84.5792456638006;

  constructor() {
  }

  ngOnInit() {
  }

}
