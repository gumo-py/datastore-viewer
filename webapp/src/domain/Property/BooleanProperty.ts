import Property from "./Property";

export default class BooleanProperty implements Property<boolean> {
    readonly value: boolean;

    constructor(value: string) {
        this.value = value.toLowerCase() === 'true';
    }

    toString(): string {
        return String(this.value);
    }
}