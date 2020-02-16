import Property from "./Property";
import { Key } from '../Key';

export default class KeyProperty implements Property<Key> {
    readonly value: Key;
    readonly index: boolean;

    constructor(value: any, index: boolean) {
        this.value = new Key(value);
        this.index = index;
    }

    toString(): string {
        return this.value.toLiteral();
    }
}