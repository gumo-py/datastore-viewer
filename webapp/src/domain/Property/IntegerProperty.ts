export default class IntegerProperty implements Property {
    value: number;
    name: string;
    index: boolean;

    constructor(value: string, name: string, index: boolean) {
        this.value = parseInt(value);
        this.name = name;
        this.index = index;
    }

    getType(): string {
        return 'Integer';
    }

    toStr(): string {
        return String(this.value);
    }
}