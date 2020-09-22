import { Moment } from 'moment';

export interface IUser {
    _id?: String;
    name: String;
    email: String;
    birthdate: Moment;
    age: Number;
    archived?: Boolean;
}
