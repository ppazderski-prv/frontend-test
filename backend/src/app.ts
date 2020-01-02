import { OptionsJson } from "body-parser";

const fs = require("fs");
const jsonServer = require("json-server");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

const server = jsonServer.create();
const serverDefaults: any = jsonServer.defaults();
const router = jsonServer.router("./data/db.json");
const db: { items: any[], users: any[] } = JSON.parse(fs.readFileSync("./data/db.json", "UTF-8"));

const SECRET_KEY = "G1a2t3F4c5d36a78ca9A";
const EXP_TIME = "1h";

server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json());
server.use(serverDefaults);

function createToken(payload): string {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: EXP_TIME });
}

function verifyToken(token): any {
  return  jwt.verify(token, SECRET_KEY, (err, decode) => decode !== undefined ?  decode : err);
}

function isAuthenticated({ email, password }): boolean {
  return db.users.findIndex((user) => user.email === email && user.password === password) !== -1;
}

server.post("/auth/login", (req, res) => {
  const { email, password } = req.body;
  console.log((req.body));
  if (isAuthenticated({ email, password }) === false) {
    const status = 401;
    const message = "Error - Incorrect email or password";
    res.status(status).json({ status, message });
    return;
  }
  const token = createToken({ email, password });
  res.status(200).json({ token });
});

server.use(/^(?!\/auth).*$/,  (req, res, next) => {
  if (req.headers.authorization === undefined || req.headers.authorization.split(" ")[0] !== "Bearer") {
    const status = 401;
    const message = "Error - Wrong authorization header format";
    const options = { message, status };
    res.status(status).json(options as OptionsJson);
    return;
  }
  try {
    const verifyTokenResult = verifyToken(req.headers.authorization.split(" ")[1]);
    if (verifyTokenResult instanceof Error) {
       const status = 401;
       const message = "Error - Access token not provided";
       const options = { message, status };
       res.status(status).json(options as OptionsJson);
       return;
     }
    next();
  } catch (err) {
    const status = 401;
    const message = "Error - Access token is revoked";
    const options = { message, status };
    res.status(status).json(options as OptionsJson);
  }
});

server.use(router);

server.listen(8000, () => {
  console.log("Run json-server with simple JWT auth");
});
