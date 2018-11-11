import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-title-screen',
  templateUrl: './title-screen.component.html',
  styleUrls: ['./title-screen.component.css']
})
export class TitleScreenComponent implements OnInit {
  public subHeading: string = '';

  constructor() {}

  ngOnInit() {
    this.subHeading = this.randomTitleText();
  }
 
  private randomTitleText() {
    const randomTitleTexts = [
      "Where Roadkill Meats Meals",
      "It would be a great misteak",
      "Possum is very slimming",
      "Pre-tenderized",
      "The taste of Ohio!"
    ];
    let i = Math.floor(Math.random() * Math.floor(5));
    return randomTitleTexts[i];
  }

}
