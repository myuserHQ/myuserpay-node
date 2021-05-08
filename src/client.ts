import { Dictionary, MyUserClientBase, MyUserResponse } from "./client_base";

type Result<T = {}> = Promise<MyUserResponse<T & Dictionary>>;

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

type ChargeRequest =
  | ChargeRequestWithoutSubscription
  | ChargeRequestWithSubscription;

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

export class MyUserClient extends MyUserClientBase {
  async charge(data: ChargeRequest & Dictionary): Result {
    return this.request("charges", data);
  }

  async refund(data: RefundRequest & Dictionary): Result {
    return this.request("refunds", data);
  }

  async getBalance(data?: Dictionary): Result {
    return this.request("balance", data);
  }

  async cancelSubscription(subscriptionId: string, data?: Dictionary): Result {
    return this.request(`subscriptions/${subscriptionId}?action=delete`, data);
  }

  async sendPayment(data: SendPaymentRequest & Dictionary): Result {
    return this.request("transfers?action=send_payment", data);
  }

  async createPaylink(data: CreatePaylinkRequest & Dictionary): Result {
    return this.request("transfers?action=create_paylink", data);
  }

  async reversePayment(data: Dictionary): Result {
    return this.request("transfers?action=take_payment_back", data);
  }

  async verifyWebhook(requestId: string, data: Dictionary | string): Result {
    return this.request(
      `/webhooks/?action=verify&request_id=${requestId}`,
      typeof data === "object" ? data : { verify_for: data }
    );
  }
}
