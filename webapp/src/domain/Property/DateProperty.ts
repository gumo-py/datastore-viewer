import moment from "moment";

export default class DateProperty implements Property<Date> {
    readonly value: Date;

    constructor(value: string) {
        this.value = new Date(value);
    }

    toString(): string {
        return moment(this.value).format();
    }
}