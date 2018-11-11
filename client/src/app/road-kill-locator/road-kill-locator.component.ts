import {Component, Input, OnInit} from '@angular/core';
import {RoadKill} from '../models/roadKill';
import {MapsService} from '../services/maps.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-road-kill-locator',
  templateUrl: './road-kill-locator.component.html',
  styleUrls: ['./road-kill-locator.component.css']
})
export class RoadKillLocatorComponent implements OnInit {
  @Input() roadKillFromDb: Observable<any[]>;
  mapCenter: {latitude: number, longitude: number} = {latitude: 0, longitude: 0};
  roadKills: RoadKill[];

  constructor(private mapsService: MapsService) {}

  ngOnInit() {
    if(this.roadKillFromDb) {
      this.roadKillFromDb.subscribe(response => {
        this.setLocation("Union Hall 1311 Vine St Cincinnati, OH 45202");
        this.roadKills = response;
      });
    }
  }

  public getDistanceFromUser(roadKill: RoadKill){
    return this.mapsService.getDistance(this.mapCenter.latitude, this.mapCenter.longitude, roadKill.geocoord._lat, roadKill.geocoord._long);
  }

  public getDaysOld(dateFound: string){
    return this.mapsService.getDaysOld(dateFound);
  }

  public setLocation(address: string){
    this.mapsService.setLocation(address).subscribe((response: any) => {
      this.mapCenter.latitude = response.results[0].geometry.location.lat;
      this.mapCenter.longitude = response.results[0].geometry.location.lng;
      this.roadKills[0] = ({species: 'Human', geocoord: {_lat: this.mapCenter.latitude, _long: this.mapCenter.longitude}});
    });
  }
  public setIcon(species: string){
    switch (species) {
      case 'cat':
        return 'assets/images/icons/cat_1.png';
      case 'dog':
        return 'assets/images/icons/dog_1.png';
      case  'squirrel':
        return 'assets/images/icons/squirrel_1.png';
      case  'deer':
        return 'assets/images/icons/deer_1.png';
      case 'raccoon':
        return 'assets/images/icons/raccoon_2.png';
      case 'Human':
        return 'assets/images/icons/human_1.png';
      default:
        return 'assets/images/icons/meat_2.png';
    }
  }

}
