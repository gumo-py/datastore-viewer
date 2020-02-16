import Property from "./Property";

export default class FloatProperty implements Property<number> {
    readonly value: number;
    readonly index: boolean;

    constructor(value: string, index: boolean) {
        this.value = parseFloat(value);
        this.index = index;
    }

    toString(): string {
        return String(this.value);
    }
}