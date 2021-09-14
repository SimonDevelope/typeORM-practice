require("dotenv").config();

const Koa = require("koa");
const Router = require("koa-router");
const mysql = require("mysql");
const cors = require("@koa/cors");
const bodyParser = require("koa-bodyparser");
const app = new Koa();
const router = new Router();
const port = process.env.DB_PORT;

app.use(bodyParser());
app.use(cors());

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
});
connection.connect((err: any) => {
  if (err) throw err;
  console.log("connected");
});

router.get("/siple", async (ctx: any, next: any) => {
  const sql = "SELECT * FROM siple";
  const item = await new Promise((resolve: any, reject: any) => {
    connection.query(sql, (err: any, result: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
        console.log(result);
      }
    });
  });
  ctx.body = item;
  next();
});

router.post("/sipal", bodyParser(), async (ctx: any, next: any) => {
  ctx.set("Access-Control-Allow-Origin", "*");
  const sql = `INSERT INTO siple (title, content) VALUES ('gatsby', 'lenardo')`;
  const item = await new Promise((resolve: any, reject: any) => {
    connection.query(sql, (err: any, result: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
  ctx.body = item;
  next();
});

router.all(/^\/oldRoute\//, (ctx: any) => {
  console.log("-- gets pattern --", ctx.url);
  const newUrl = ctx.url.replace(/^\/oldRoute\/(.*)/, "/newRoute/$1");

  ctx.redirect(newUrl);
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(port, () => {
  console.log("the server running on 4000");
});
