export default class BooleanProperty implements Property {
    value: boolean;
    name: string;
    index: boolean;

    constructor(value: string, name: string, index: boolean) {
        this.value = value.toLowerCase() === 'true';
        this.name = name;
        this.index = index;
    }

    getType(): string {
        return 'Boolean';
    }

    toStr(): string {
        return String(this.value);
    }
}