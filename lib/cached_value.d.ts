declare type Resolver<T> = () => Promise<T>;
export declare class CachedValue<T> {
    private readonly _ttl;
    private _value?;
    private _validUntil?;
    constructor(ttl: number, value?: T);
    set value(value: T);
    get value(): T | undefined;
    getOrUpdate(resolve: Resolver<T>): Promise<T>;
}
export declare class CachedValueResolver<T> extends CachedValue<T> {
    private _resolver;
    constructor(ttl: number, resolver: Resolver<T>, value?: T);
    resolve(): Promise<T>;
}
export {};
