import { CachedValueResolver } from "./cached_value";
interface MyUserParams {
    url?: string;
    class_name?: string;
}
interface MyUserErrorResponse {
    status: false;
    error: {
        type?: "request" | "response" | "internal" | string;
        code?: string;
        message: string;
    };
}
export declare type Dictionary = {
    [key: string]: any;
};
export declare type MyUserResponse<T> = (MyUserErrorResponse | {
    status: true;
}) & T;
export declare class MyUserClientBase {
    private client;
    private privateKey;
    protected params: CachedValueResolver<MyUserParams>;
    constructor();
    /**
     * Update private key
     * @param privateKey MyUser private API key
     */
    setPrivateKey(privateKey: string): void;
    /**
     * Send authorized data to MyUser
     * @param path Request path
     * @param data Request data
     * @returns Response data
     */
    request<T = Dictionary>(path: string, data?: any): Promise<MyUserResponse<T>>;
    private requireParams;
}
export {};
