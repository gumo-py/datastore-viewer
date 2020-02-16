import Property from "./Property";

export default class IntegerProperty implements Property<number> {
    readonly value: number;
    readonly index: boolean;

    constructor(value: string, index: boolean) {
        this.value = parseInt(value);
        this.index = index;
    }

    toString(): string {
        return String(this.value);
    }
}