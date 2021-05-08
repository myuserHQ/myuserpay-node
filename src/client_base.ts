import axios, { AxiosInstance } from "axios";
import qs from "qs";
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

export type Dictionary = { [key: string]: any };
export type MyUserResponse<T> = (MyUserErrorResponse | { status: true }) & T;

const defaultError: MyUserResponse<{}> = {
  status: false,
  error: {
    code: "server_response",
    type: "request",
    message: "Sorry, some error happend",
  },
};

export class MyUserClientBase {
  private client: AxiosInstance;
  private privateKey: string;
  protected params: CachedValueResolver<MyUserParams>;

  public constructor() {
    this.client = axios.create({ responseType: "json" });
    this.params = new CachedValueResolver<MyUserParams>(
      10000,
      this.requireParams.bind(this)
    );
  }

  /**
   * Update private key
   * @param privateKey MyUser private API key
   */
  public setPrivateKey(privateKey: string): void {
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
  public async request<T = Dictionary>(
    path: string,
    data?: any
  ): Promise<MyUserResponse<T>> {
    const params = await this.params.resolve();

    try {
      const url =
        (/^https?:\/\//.test(params.url)
          ? params.url + "/req_p_main_subdomain_api_1"
          : "https://api.myuser.com") + `/pay/v1/${path}`;

      const response = await this.client.request({
        url: url,
        method: "POST",
        data: qs.stringify(data),
        headers: {
          "content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      });

      return typeof response.data === "object" && "status" in response.data
        ? response.data
        : defaultError;
    } catch (error) {
      return { ...defaultError, jsError: error };
    }
  }

  private async requireParams(): Promise<MyUserParams> {
    try {
      const response = await this.client.get(
        "https://pay.myuser.com/get_connected_puatokenizer/" + this.privateKey
      );
      return response.data;
    } catch (error) {
      throw Error("Failed to request parameters.");
    }
  }
}
