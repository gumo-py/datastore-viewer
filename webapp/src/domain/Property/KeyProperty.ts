import Property from "./Property";
import { Key } from '../Key';

export default class KeyProperty implements Property<Key> {
    readonly value: Key;

    constructor(value: any) {
        this.value = new Key(value.path);
    }

    toString(): string {
        return this.value.toLiteral();
    }
}