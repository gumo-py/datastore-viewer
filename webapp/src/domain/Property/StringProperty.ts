export default class StringProperty implements Property<string> {
    readonly value: string;

    constructor(value: string) {
        this.value = value;
    }

    toString(): string {
        return this.value;
    }
}