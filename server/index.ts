require("dotenv").config();

const Koa = require("koa");
const Router = require("koa-router");
const mysql = require("mysql");
const app = new Koa();
const router = new Router();
const port = process.env.DB_PORT;

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
});

router.get("/", (ctx: any, next: any) => {
  ctx.body = "home";
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(port, () => {
  console.log("the server running on 4000");
});
