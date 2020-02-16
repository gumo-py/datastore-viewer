export default interface Property<T> {
    toString(): string;
    readonly value: T;
}