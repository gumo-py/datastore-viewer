export default class FloatProperty implements Property {
    value: number;
    name: string;
    index: boolean;

    constructor(value: string, name: string, index: boolean) {
        this.value = parseFloat(value);
        this.name = name;
        this.index = index;
    }

    getType(): string {
        return 'Float';
    }

    toStr(): string {
        return String(this.value);
    }
}