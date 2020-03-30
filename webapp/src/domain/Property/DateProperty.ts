import {Moment} from 'moment';
import moment from 'moment-timezone';

export default class DateProperty implements Property {
    value: Moment;
    name: string;
    index: boolean;

    constructor(value: string, name: string, index: boolean) {
        this.value = moment(value).tz(moment.tz.guess());
        this.name = name;
        this.index = index;
    }

    getType(): string {
        return 'Date';
    }

    toStr(): string {
        return this.value.format('YYYY-MM-DD (hh:mm:ss.SSS) z');
    }
}