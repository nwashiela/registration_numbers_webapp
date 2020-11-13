const express = require("express");
const exphbs = require("express-handlebars");
const flash = require("express-flash");
const session = require("express-session");
const bodyParser = require("body-parser");
const pg = require("pg");
const Pool = pg.Pool;
const Reg = require("./registration");
const Routes = require("./routes");

const app = express();
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(
  session({
    secret: "<add a secret string here>",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(flash());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://codex:pg1212@localhost:5432/registration";

const pool = new Pool({
  connectionString,
});
const registration = Reg(pool);
const catchReg = Routes(registration);

app.use(express.static("public"));

app.get("/", catchReg.dFRouts);

app.post("/reg_numbers", catchReg.pstMessageList);

app.get("/reg_numbers", catchReg.filterTown);

app.get("/clearAll",catchReg.clear);

const PORT = process.env.PORT || 3010;
app.listen(PORT, function () {
  console.log("App starting on port", PORT);
});

