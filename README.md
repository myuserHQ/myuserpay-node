# myuserpay

Myuser.com API implementation for JavaScript based backends.

### Installation

You can install package to your project using _npm_ or _yarn_.

```bash
npm install myuserpay
# or
yarn add myuserpay
```

# Getting Started

You have to obtain your free account from [myuser.com](https://myuser.com) to get started. After creating your account you'll get your private and public keys which is required to use this library.

```js
// CommonJS
const myuser = require("myuserpay")("your-private-key");

// EcmaScript / TypeScript
import createMyuser from "myuserpay";

const myuser = createMyuser("your-private-key");
```

## Charge

Capture funds from customer's credit card.

```js
app.post("/charge", async (req, res) => {
  const result = myuser.charge({
    token: req.body.MyUserToken,
    amount: 1000, // 10 USD
  });

  if (result.status) {
    // Save payment to database ...
  } else {
    // Show error message
  }
});
```

# Example

Check out `/example` directory for the example usage of this library.
