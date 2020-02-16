import Property from "./Property";

export default class IntegerProperty implements Property<number> {
    readonly value: number;

    constructor(value: string) {
        this.value = parseInt(value);
    }

    toString(): string {
        return String(this.value);
    }
}