import {Component, Input, OnInit} from '@angular/core';
import {Import} from '@angular/compiler-cli/src/ngtsc/host';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-dish',
  templateUrl: './dish.component.html',
  styleUrls: ['./dish.component.css']
})
export class DishComponent implements OnInit {
  @Input() roadKillFromDb: Observable<any[]>;

  constructor() { }

  ngOnInit() {
  }

}
