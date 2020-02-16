import Property from "./Property";
import moment from "moment";

export default class DateProperty implements Property<Date> {
    readonly value: Date;
    readonly index: boolean;

    constructor(value: string, index: boolean) {
        this.value = new Date(value);
        this.index = index;
    }

    toString(): string {
        return moment(this.value).format();
    }
}