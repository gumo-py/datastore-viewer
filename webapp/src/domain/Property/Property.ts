export default interface Property<T> {
    toString(): string;
    value: T;
    index: boolean;
}