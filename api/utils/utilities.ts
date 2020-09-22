import * as moment from 'moment';

export default class Utilities {
    public convertDate(date) {
        const d = moment(date, 'MM/DD/YYYY');
        return d;
    }
}
