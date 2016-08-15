process.env.DEBUG = 'app*';

var debug = require('debug')('app');
var Koa = require('koa');
var app = new Koa();
var router = require('koa-router')();
var views = require('koa-views');
var json = require('koa-json');
var onerror = require('koa-onerror');
var bodyparser = require('koa-bodyparser');
var logger = require('koa-logger');
// var mailchimp = require('./mailchimp')('c3a19ad948ea82482dbd35e91bf899e7-us14'); 
var mailchimp = require('./mailchimp')('ca75b520f82da31ea393e6a5ffe8952e-us13'); 

// ============================
// SETUP
//=============================

onerror(app);
// app.use(logger());
app.use(bodyparser());
app.use(json());

app.use(require('koa-static')(__dirname + '/public'));

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}));

// ============================
// ROUTES
//=============================

//INDEX ROUTE
router.get('/', function* () {
  yield this.render("index");
});

//CONTACT US ROUTE
router.get("/contact_us", function* () {
  yield this.render("contact_us");
});

//VACANCIES ROUTE
router.get("/vacancies", function* () {
  yield this.render("vacancies");
});

//SUBSCRIBE
router.post('/subscribe', function* () {
  var form = this.request.body;
  debug(form);
//   var {res, body} = yield mailchimp.subscribe('1f3ac96379', {
  var {res, body} = yield mailchimp.subscribe('5d5684952b', {
    email: form.subFormEmail,
    first_name: form.subFormName
  });
  debug(body);
});

// use routes
app.use(router.routes()).use(router.allowedMethods());

// process.env.PORT = 80; process.env.IP = 'localhost';
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Evricamp landing server running now!");
});
