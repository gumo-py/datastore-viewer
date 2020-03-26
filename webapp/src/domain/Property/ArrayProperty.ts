interface ArrayPropertyPart {
    value: any;
    value_type: string;
}

export default class ArrayProperty implements Property {
    value: Array<any>;
    name: string;
    index: boolean;

    constructor(value: Array<ArrayPropertyPart>, name: string, index: boolean) {
        this.value = value.map((prop) => { return prop.value });
        this.name = name;
        this.index = index;
    }

    getType(): string {
        return 'Array';
    }

    toStr(): string {
        return String(`[${this.value.join(',')}]`);
    }
}