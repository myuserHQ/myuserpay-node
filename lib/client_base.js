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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyUserClientBase = void 0;
const axios_1 = __importDefault(require("axios"));
const qs_1 = __importDefault(require("qs"));
const cached_value_1 = require("./cached_value");
const defaultError = {
    status: false,
    error: {
        code: "server_response",
        type: "request",
        message: "Sorry, some error happend",
    },
};
class MyUserClientBase {
    constructor() {
        this.client = axios_1.default.create({ responseType: "json" });
        this.params = new cached_value_1.CachedValueResolver(10000, this.requireParams.bind(this));
    }
    /**
     * Update private key
     * @param privateKey MyUser private API key
     */
    setPrivateKey(privateKey) {
        this.privateKey = privateKey;
        this.client.defaults.auth = {
            username: privateKey,
            password: "",
        };
    }
    /**
     * Send authorized data to MyUser
     * @param path Request path
     * @param data Request data
     * @returns Response data
     */
    request(path, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = yield this.params.resolve();
            try {
                const url = (/^https?:\/\//.test(params.url)
                    ? params.url + "/req_p_main_subdomain_api_1"
                    : "https://api.myuser.com") + `/pay/v1/${path}`;
                const response = yield this.client.request({
                    url: url,
                    method: "POST",
                    data: qs_1.default.stringify(data),
                    headers: {
                        "content-type": "application/x-www-form-urlencoded;charset=utf-8",
                    },
                });
                return typeof response.data === "object" && "status" in response.data
                    ? response.data
                    : defaultError;
            }
            catch (error) {
                return Object.assign(Object.assign({}, defaultError), { jsError: error });
            }
        });
    }
    requireParams() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.client.get("https://pay.myuser.com/get_connected_puatokenizer/" + this.privateKey);
                return response.data;
            }
            catch (error) {
                throw Error("Failed to request parameters.");
            }
        });
    }
}
exports.MyUserClientBase = MyUserClientBase;
//# sourceMappingURL=client_base.js.map