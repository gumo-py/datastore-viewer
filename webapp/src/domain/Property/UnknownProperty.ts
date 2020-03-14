export default class UnknownProperty implements Property {
    value: any;
    name: string;
    index: boolean;

    constructor(value: string, name: string, index: boolean) {
        this.value = value;
        this.name = name;
        this.index = index;
    }

    getType(): string {
        return 'Unknown';
    }

    toStr(): string {
        return String(this.value);
    }
}