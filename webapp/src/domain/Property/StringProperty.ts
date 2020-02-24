export default class StringProperty implements Property {
    value: string;
    name: string;
    index: boolean;

    constructor(value: string, name: string, index: boolean) {
        this.value = value;
        this.name = name;
        this.index = index;
    }

    getType(): string {
        return 'String';
    }

    toStr(): string {
        return this.value;
    }
}