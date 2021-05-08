import { MyUserClient } from "./client";
declare function createClient(privateKey: string): MyUserClient;
declare namespace createClient {
    var _a: typeof createClient;
    export var MyUserClient: typeof import("./client").MyUserClient;
    export { _a as default };
}
export = createClient;
