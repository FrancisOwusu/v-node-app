const express = require('express')
const app = express()
const router = require('./routes/router');

const session = require('express-session')
const userRouter = require('./routes/users');
const postRouter = require('./routes/postRouter');
const exphbs = require('express-handlebars');
const port = 3000

const path = require('path');
const { use } = require('express/lib/application');

const errorHandler = require('./middleware/errorHandler');
const CORS = require('cors');

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));







app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//user error handler
// app.use(errorHandler);
// app.use(CORS);
//set view template engine
app.engine('hbs', exphbs.engine({
    extname: '.hbs',
    defaultLayout: 'users/login',
    layoutsDir: __dirname + '/views'
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '/views'));






// app.use((req, res, next) => {
//     const err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });

// app.use((err, req, res, next) => {
//     res.locals.error = err;
//     const status = err.status || 500;
//     res.status(status);
//     res.render('error');
// });


//middleware example
// const myLogger = function(req, res, next) {

//     var u = User.create({
//         firstName: "G"
//     })
//     console.log(u);
//     console.log('LOGGED')
//     const timeT = req.requestTime = Date.now()
//     console.log(timeT);
//     next()
// }
// app.use(myLogger)
app.use(router);
app.use(userRouter);
app.use(postRouter);
app.use(express.static('public'))

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})