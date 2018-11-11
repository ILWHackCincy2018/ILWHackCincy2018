import {Component, OnInit} from '@angular/core';
import {RoadKill} from '../models/roadKill';

@Component({
  selector: 'app-road-kill-locator',
  templateUrl: './road-kill-locator.component.html',
  styleUrls: ['./road-kill-locator.component.css']
})
export class RoadKillLocatorComponent implements OnInit {
  mapCenter: {latitude: number, longitude: number} = {latitude: 0, longitude: 0};
  roadKills: RoadKill[];

  constructor() {}

  ngOnInit() {

    this.roadKills = [];
    this.roadKills.push({type: 'Cat', latitude: 39.1067133124343, longitude: -84.5792456638006});
    this.roadKills.push({type: 'Dog', latitude: 39.1906367102039, longitude: -84.5702101094013});
    this.roadKills.push({type: 'Venison', latitude: 39.1067133124343, longitude: -84.5891420249518});
    this.roadKills.push({type: 'Venison', latitude: 39.0790980936287, longitude: -84.5954134741913});
    this.roadKills.push({type: 'Possum', latitude: 39.1432013345715, longitude: -84.5125047587451});

    if (this.roadKills !== []){
      this.mapCenter.latitude = this.roadKills[0].latitude;
      this.mapCenter.longitude = this.roadKills[0].longitude
    }
  }

}
