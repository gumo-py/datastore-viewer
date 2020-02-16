import Property from "./Property";

export default class BooleanProperty implements Property<boolean> {
    readonly value: boolean;
    readonly index: boolean;

    constructor(value: string, index: boolean) {
        this.value = value.toLowerCase() === 'true';
        this.index = index;
    }

    toString(): string {
        return String(this.value);
    }
}