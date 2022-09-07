const _dirname = '../views/';

const path = require('path');
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
const { body, validationResult } = require('express-validator');
const { sequelize, User, Post } = require('../../models');
const { posts } = require('./postController');
var db = path.basename('/db/db.js')
    // Display list of all books.
exports.get_users = function(req, res) {
    var row = 4444
    var users = User.findAll();

    try {
        var sm = User.findAll({
            include: {
                model: Post
            }
        }).then(function(entry) {
            res.status(200).json(entry);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "An error occurred while finding the productions."
            });
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Something went wrong" })
    }



    // res.render('list', { users: db.users });
    res.render('../views/users/index.hbs', { users })
}


// Display detail page for a specific book.
exports.user_detail = function(req, res) {
    // if the user ID is 0, skip to the next route
    try {
        var sm = User.findOne({
            limit: 1,
            where: {
                id: req.params.id,
            },
            include: {
                model: Post
            }
        }).then(function(entry) {
            res.status(200).json(entry);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "An error occurred while finding the productions."
            });
        });;
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Something went wrong" })
    }

};
exports.user_find = function(req, res) {
    var id = req.params.id;
    var bdData = null;
    var sql = `SELECT * FROM users where ID="${id}"`;
    db.query(sql, function(err, result) {
        if (err) throw err;
        console.log('record found');
        bdData = result[0];
        res.send(bdData.firstName);
        console.log(result);
    });
};

// Display book create form on GET.
exports.user_create = function(req, res) {
    res.render('../views/users/create')
};

// Display detail page for a specific Genre.
exports.user_save = [
    // Validate and sanitize fields.
    body('first_name', 'Firstname must not be empty.').trim().isLength({ min: 1 }).escape(),
    body('last_name', 'Lastname must not be empty.').trim().isLength({ min: 1 }).escape(),
    body('email', 'Email must not be empty.').trim().isLength({ min: 1 }).escape(),

    // Process request after validation and sanitization.
    async(req, res, next) => {
        try {
            console.log(req.body);
            // Extract the validation errors from a request.
            const errors = validationResult(req);
            var u = await User.create({
                firstName: req.body.first_name,
                lastName: req.body.last_name,
                email: req.body.email
            });


            if (!errors.isEmpty()) {
                res.render('../views/users/create.hbs', { title: 'Create Book', errors: errors.array() });

                return;
            } else {
                // Data from form is valid. Save book.

                // res.redirect(status, url) 
                res.redirect('/users');

                // u.save(function(err) {
                //     if (err) { return next(err); }
                //     //successful - redirect to new book record.
                //     // res.redirect('');



            }
        } catch (error) {
            console.log(error);
        }


    }
];