const _dirname = '../views/';
const path = require('path');
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
const { body, validationResult } = require('express-validator');
const { sequelize, Post, User } = require('../../models');
const user = require('../../models/user');
// const { post } = require('../../routes/router');
var db = path.basename('/db/db.js')
    // Display list of all books.
exports.post_create = function(req, res) {
    var row = 4444
    res.render('../views/posts/create.hbs', { row })
}
exports.posts = function(req, res) {
        try {
            var sm = Post.findAll({
                include: {
                    model: User
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
    }
    // Display detail page for a specific Genre.
exports.post_save = [
    body('title', 'Title must not be empty.').trim().isLength({ min: 1 }).escape(),
    body('content', 'Message must not be empty.').trim().isLength({ min: 1 }).escape(),

    // Process request after validation and sanitization.
    async(req, res, next) => {
        try {
            var userId = await User.findOne({
                where: {
                    id: 1
                }
            });
            console.log(req.body);
            // Extract the validation errors from a request.
            const errors = validationResult(req);
            var u = await Post.create({
                title: req.body.title,
                content: req.body.content,
                user_id: userId.id
            })

            if (!errors.isEmpty()) {
                res.render('../views/posts/create.hbs', { title: 'Create Book', errors: errors.array() });
                return;
            } else {

                // res.redirect(status, url) 
                res.redirect('/posts/create');

            }
        } catch (error) {
            console.log(error);
        }


    }
];
// server.post('/find-or-create', async(req, res, next) => {
//     try {
//         await connectDB();
//         let user = await findOneUser(req.params.username);
//         if (!user) {
//             user = await createUser(req);
//             if (!user) throw new Error('No user created');
//         }
//         res.contentType = 'json';
//         res.send(user);
//         return next(false);
//     } catch (err) {
//         res.send(500, err);
//         next(false);
//     }
// });