import { Dictionary, MyUserClientBase, MyUserResponse } from "./client_base";
declare type Result<T = {}> = Promise<MyUserResponse<T & Dictionary>>;
interface ChargeRequestBase {
    token?: string;
    MyUserToken?: string;
    amount: number;
    verify?: "verify_card" | undefined;
    save?: boolean | undefined;
}
interface ChargeRequestWithoutSubscription extends ChargeRequestBase {
    subscription?: false | undefined;
}
interface SubscriptionTrigger {
    success_url?: string;
    success_custom_data?: any;
    fail_url?: string;
    fail_custom_data?: any;
    trial_end_url?: string;
    trial_end_custom_data?: any;
}
interface ChargeRequestWithSubscription extends ChargeRequestBase {
    subscription: true;
    subs_plan: "monthly" | "yearly";
    trial_days?: number | undefined;
    triggers?: SubscriptionTrigger | SubscriptionTrigger[];
}
declare type ChargeRequest = ChargeRequestWithoutSubscription | ChargeRequestWithSubscription;
interface RefundRequest {
    charge: string;
    amount?: number | undefined;
}
interface SendPaymentRequest {
    amount: number;
}
interface CreatePaylinkRequest {
    amount: number;
}
export declare class MyUserClient extends MyUserClientBase {
    charge(data: ChargeRequest & Dictionary): Result;
    refund(data: RefundRequest & Dictionary): Result;
    getBalance(data?: Dictionary): Result;
    cancelSubscription(subscriptionId: string, data?: Dictionary): Result;
    sendPayment(data: SendPaymentRequest & Dictionary): Result;
    createPaylink(data: CreatePaylinkRequest & Dictionary): Result;
    reversePayment(data: Dictionary): Result;
    verifyWebhook(requestId: string, data: Dictionary | string): Result;
}
export {};
