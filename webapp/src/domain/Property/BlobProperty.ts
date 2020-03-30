export default class BlobProperty implements Property {
    value: string;
    name: string;
    index: boolean;

    constructor(value: string, name: string, index: boolean) {
        this.value = value;
        this.name = name;
        this.index = index;
    }

    getType(): string {
        return 'Blob';
    }

    toStr(): string {
        return String(this.value);
    }
}