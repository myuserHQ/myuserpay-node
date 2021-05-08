"use strict";
const client_1 = require("./client");
function createClient(privateKey) {
    const client = new client_1.MyUserClient();
    client.setPrivateKey(privateKey);
    return client;
}
createClient.default = createClient;
createClient.MyUserClient = client_1.MyUserClient;
module.exports = createClient;
//# sourceMappingURL=index.js.map