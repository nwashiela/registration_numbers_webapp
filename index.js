const express = require('express');
const exphbs = require('express-handlebars');
const flash = require('express-flash');
const session = require('express-session');
const bodyParser = require('body-parser');
const pg = require("pg");
const Pool = pg.Pool;
const Reg = require('./registration')

const app = express()
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(session({
    secret: "<add a secret string here>",
    resave: false,
    saveUninitialized: true
  }));

  app.use(flash());

  app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const connectionString = process.env.DATABASE_URL || 'postgresql://codex:pg1212@localhost:5432/registration';

const pool = new Pool({
    connectionString
  })
  const registration = Reg(pool)

  app.use(express.static('public'))

  app.get('/', async function(req,res){

    res.render('index', {
      list: await registration.listAll(),
      messages: "" 
      // registration.regCheck(regEntered)
    })
  })

app.post('/registration', async function(req, res){
const regEntered = req.body.regName

if(!regEntered){
  req.flash('info', 'registration is not entered');
  res.render('index');
}

await registration.setRegNumbers(regEntered)

res.render('index',{
  list: await registration.listAll(),
  message: await registration.regCheck(regEntered) 
  // registration.regCheck(regEntered)
})

})

app.get('/reg_numbers',async function(req, res){

  res.redirect('index')
})

app.get('/clearAll',async function(req, res) {
  try {
    await registration.deleleBtn();
    res.redirect("/")
  } 
  catch (err) {
    console.log({err});
    res.redirect("/")
  }

})

const PORT = process.env.PORT || 3001;
  app.listen(PORT,function(){
      console.log('App starting on port',PORT);
  })