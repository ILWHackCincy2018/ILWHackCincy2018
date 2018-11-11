import {Dish} from './dish.model';
import {Role} from './role.model';

export class Attendee {
  dish: Dish;
  name: string;
  role: Role;
  userId: string;
}