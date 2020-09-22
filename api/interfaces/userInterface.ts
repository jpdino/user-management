import { Moment } from 'moment';

export interface IUser {
    _id?: String;
    name: String;
    email: String;
    birthdate: String;
    age: Number;
    archived?: Boolean;
}
