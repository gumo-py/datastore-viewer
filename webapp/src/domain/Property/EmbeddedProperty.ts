export default class EmbeddedProperty implements Property {
    value: Object;
    name: string;
    index: boolean;

    constructor(value: Object, name: string, index: boolean) {
        this.value = value;
        this.name = name;
        this.index = index;
    }

    getType(): string {
        return 'Embedded';
    }

    toStr(): string {
        return JSON.stringify(this.value);
    }
}