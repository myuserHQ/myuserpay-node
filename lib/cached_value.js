"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CachedValueResolver = exports.CachedValue = void 0;
class CachedValue {
    constructor(ttl, value) {
        this._ttl = ttl;
        this.value = value;
    }
    set value(value) {
        this._value = value;
        this._validUntil = Date.now() + this._ttl;
    }
    get value() {
        if (this._value && this._validUntil) {
            if (this._validUntil > Date.now()) {
                return this._value;
            }
        }
        return undefined;
    }
    getOrUpdate(resolve) {
        return __awaiter(this, void 0, void 0, function* () {
            const cachedValue = this.value;
            return cachedValue !== undefined
                ? cachedValue
                : (this.value = yield resolve());
        });
    }
}
exports.CachedValue = CachedValue;
class CachedValueResolver extends CachedValue {
    constructor(ttl, resolver, value) {
        super(ttl, value);
        this._resolver = resolver;
    }
    resolve() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getOrUpdate(this._resolver);
        });
    }
}
exports.CachedValueResolver = CachedValueResolver;
//# sourceMappingURL=cached_value.js.map