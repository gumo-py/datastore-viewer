export default class FloatProperty implements Property<number> {
    readonly value: number;

    constructor(value: string) {
        this.value = parseFloat(value);
    }

    toString(): string {
        return String(this.value);
    }
}