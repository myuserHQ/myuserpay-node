type Resolver<T> = () => Promise<T>;

export class CachedValue<T> {
  private readonly _ttl: number;
  private _value?: T;
  private _validUntil?: number;

  public constructor(ttl: number, value?: T) {
    this._ttl = ttl;
    this.value = value;
  }

  public set value(value: T) {
    this._value = value;
    this._validUntil = Date.now() + this._ttl;
  }

  public get value(): T | undefined {
    if (this._value && this._validUntil) {
      if (this._validUntil > Date.now()) {
        return this._value;
      }
    }
    return undefined;
  }

  public async getOrUpdate(resolve: Resolver<T>): Promise<T> {
    const cachedValue = this.value;
    return cachedValue !== undefined
      ? cachedValue
      : (this.value = await resolve());
  }
}

export class CachedValueResolver<T> extends CachedValue<T> {
  private _resolver: Resolver<T>;

  public constructor(ttl: number, resolver: Resolver<T>, value?: T) {
    super(ttl, value);
    this._resolver = resolver;
  }

  public async resolve(): Promise<T> {
    return await this.getOrUpdate(this._resolver);
  }
}
