import moment from "moment";

export default class DateProperty implements Property {
    value: Date;
    name: string;
    index: boolean;

    constructor(value: string, name: string, index: boolean) {
        this.value = new Date(value);
        this.name = name;
        this.index = index;
    }

    getType(): string {
        return 'Date';
    }

    toStr(): string {
        return moment(this.value).format();
    }
}