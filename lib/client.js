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
exports.MyUserClient = void 0;
const client_base_1 = require("./client_base");
class MyUserClient extends client_base_1.MyUserClientBase {
    charge(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request("charges", data);
        });
    }
    refund(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request("refunds", data);
        });
    }
    getBalance(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request("balance", data);
        });
    }
    cancelSubscription(subscriptionId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request(`subscriptions/${subscriptionId}?action=delete`, data);
        });
    }
    sendPayment(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request("transfers?action=send_payment", data);
        });
    }
    createPaylink(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request("transfers?action=create_paylink", data);
        });
    }
    reversePayment(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request("transfers?action=take_payment_back", data);
        });
    }
    verifyWebhook(requestId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request(`/webhooks/?action=verify&request_id=${requestId}`, typeof data === "object" ? data : { verify_for: data });
        });
    }
}
exports.MyUserClient = MyUserClient;
//# sourceMappingURL=client.js.map