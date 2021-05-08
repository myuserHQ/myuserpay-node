import { MyUserClient } from "./client";

function createClient(privateKey: string): MyUserClient {
  const client = new MyUserClient();
  client.setPrivateKey(privateKey);
  return client;
}

createClient.default = createClient;
createClient.MyUserClient = MyUserClient;

export = createClient;
