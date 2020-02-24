export default class NullProperty implements Property {
    value: null;
    name: string;
    index: boolean;

    constructor(name: string, index: boolean) {
        this.value = null;
        this.name = name;
        this.index = index;
    }

    getType(): string {
        return 'Null';
    }

    toStr(): string {
        return '';
    }
}