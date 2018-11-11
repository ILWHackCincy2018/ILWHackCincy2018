import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-title-screen',
  templateUrl: './title-screen.component.html',
  styleUrls: ['./title-screen.component.css']
})
export class TitleScreenComponent implements OnInit {

  randomTitleTexts: [
    "Where Roadkill Meats Meals",
    "It would be a great misteak",
    "Possum is very slimming",
    "Pre-tenderized",
    "The taste of Ohio!"
  ];

  constructor() { }

  ngOnInit() {
  }
 
  public randomTitleText() {
    let i = Math.floor(Math.random() * Math.floor(this.randomTitleTexts.length));
    return this.randomTitleTexts[i];
  }

}
