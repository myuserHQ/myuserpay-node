import express from "express";
import createMyUser from "myuserpay";
import fs from "fs";

// Those keys are only valid for testing purposes, you should replace them
// with your own keys.
const publicKey = "pk_test_055f54a952e5e4e97709facc15451217";
const privateKey = "sk_test_1acfafc08b2d76cf4eba232ce270c8b6";

const app = express();
const myuser = createMyUser(privateKey);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req, res) => {
  fs.readFile("public/index.html", "utf-8", (_err, data) => {
    res
      .contentType("text/html")
      .send(data.split("{{publicKey}}").join(publicKey));
  });
});

app.post("/save", async (req, res) => {
  const result = await myuser.charge({
    token: req.body.token,
    amount: 1000,
    save: true,
  });

  res.json(result);
});

app.post("/charge", async (req, res) => {
  const result = await myuser.charge({
    MyUserToken: req.body.token,
    amount: 1000,
  });

  res.json(result);
});

app.post("/refund", async (req, res) => {
  const result = await myuser.refund({
    charge: req.body.charge,
    amount: 1000,
  });

  res.json(result);
});

app.listen(3000, () =>
  console.log("Server is running at http://localhost:3000")
);
