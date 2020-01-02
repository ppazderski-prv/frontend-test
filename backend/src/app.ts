import { OptionsJson } from "body-parser";

const fs = require("fs");
const jsonServer = require("json-server");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

interface IUser {
  id: number;
  email: string;
  username: string;
  password: string;
}

interface IItem {
  id: number;
  title: string;
  parent_id: number | null;
}

const server = jsonServer.create();
const serverDefaults: any = jsonServer.defaults();
const router = jsonServer.router("./data/db.json");
const db: { items: IItem[], users: IUser[] } = JSON.parse(fs.readFileSync("./data/db.json", "UTF-8"));

const SECRET_KEY = "G1a2t3F4c5d36a78ca9A";
const EXP_TIME = "1h";

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(serverDefaults);

function createToken(payload): string {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: EXP_TIME });
}

function verifyToken(token): any {
  return  jwt.verify(token, SECRET_KEY, (err, decode) => decode !== undefined ?  decode : err);
}

function getUser({ email, password }): IUser | null {
  return db.users.find((user) => user.email === email && user.password === password);
}

server.post("/auth/login", (req, res) => {
  const { email, password } = req.body;
  const user = getUser({ email, password });
  if (!user) {
    const status = 401;
    const message = "Error - Incorrect email or password";
    res.status(status).json({ status, message });
    return;
  }
  const obfuscatedUser =  Object.assign({}, user);
  delete obfuscatedUser.password;

  const token = createToken(obfuscatedUser);
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
