import { Key } from '../Key';

export default class KeyProperty implements Property {
    value: Key;
    name: string;
    index: boolean;

    constructor(value: any, name: string, index: boolean) {
        this.value = new Key(value.path);
        this.name = name;
        this.index = index;
    }

    getType(): string {
        return 'Key';
    }

    toStr(): string {
        return this.value.toLiteral();
    }
}