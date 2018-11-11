import * as firebase from 'firebase/app';

export class MeatUp {
  acquisitionStart:Date;
  ingredients: string[];
  isActive:boolean;
  location: firebase.firestore.GeoPoint;
  maxChefs: number;
  maxJudges: number;
  meatupStart:Date;
  name: string;
  ownerId:string;
  style: string;
}
