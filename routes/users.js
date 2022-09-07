const express = require('express')
const router = express.Router()
var format = require('util').format;
var multiparty = require('multiparty');


// const app = express()

const path = require('path');
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

//user controller
var userController = require('../src/controllers/userController')

var db = require('../db/db');
const _dirname = '../views/';
// middleware that is specific to this router





//user routes
router.get('/users/', userController.get_users);
router.get('/users/create', userController.user_create);
router.post('/users/form', userController.user_save);
router.get('/users/:id', userController.user_detail);
router.get('/login', function(req, res, next) {
    try {
        res.render('../views/users/login.hbs', { title: "Login to Notes", user: req.user, });
    } catch (e) { next(e); }
});
router.post('/login', async(req, res) => {

    // Our register logic starts here
    try {
        // Get user input
        const { firstName, lastName, email, password } = req.body;

        // Validate user input
        if (!(email && password && firstName && lastName)) {
            res.status(400).send("All input is required");
        }

        // check if user already exist
        // Validate if user exist in our database
        const oldUser = await User.findOne({ email });
        console.log(oldUser);
        if (oldUser) {
            return res.status(409).send("User Already Exist. Please Login");
        }

        //Encrypt user password
        encryptedUserPassword = await bcrypt.hash(password, 10);

        // Create user in our database
        const user = await User.create({
            first_name: firstName,
            last_name: lastName,
            email: email.toLowerCase(), // sanitize
            password: encryptedUserPassword,
        });

        // Create token
        const token = jwt.sign({ user_id: user._id, email },
            process.env.TOKEN_KEY, {
                expiresIn: "5h",
            }
        );
        // save user token
        user.token = token;

        // return new user
        res.status(201).json(user);
    } catch (err) {
        console.log(err);
    }
    // Our register logic ends here
});
router.get('/signup', function(req, res, next) {
    try {
        res.render('login', { title: "Login to Notes", user: req.user, });
    } catch (e) { next(e); }
});

router.get('/logout', function(req, res, next) {
    try {
        req.session.destroy();
        req.logout();
        res.clearCookie(sessionCookieName);
        res.redirect('/');
    } catch (e) { next(e); }
});

// passport.use(new LocalStrategy(
//     async(username, password, done) => {
//         try {
//             var check = await usersModel.userPasswordCheck(username,
//                 password);
//             if (check.check) {
//                 done(null, { id: check.username, username: check.username });
//             } else {
//                 done(null, false, check.message);
//             }
//         } catch (e) { done(e); }
//     }
// ));

module.exports = router