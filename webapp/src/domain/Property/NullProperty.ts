export default class NullProperty implements Property {
    value: string;
    name: string;
    index: boolean;

    constructor(name: string, index: boolean) {
        this.value = 'Null';
        this.name = name;
        this.index = index;
    }

    getType(): string {
        return 'Null';
    }

    toStr(): string {
        return 'Null';
    }
}