import * as firebase from 'firebase/app';
import {Attendee} from './attendee.model';

export class MeatUp {
  acquisitionStart:Date;
  attendees: Attendee[];
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
