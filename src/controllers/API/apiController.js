const { createUser, findOneUser } = require("../../../migrations/services/users-sequelize.mjs");

server.post('/create-user', async(req, res, next) => {
    try {
        await connectDB();
        let result = await createUser(req);
        res.contentType = 'json';
        res.send(result);
        next(false);
    } catch (err) {
        res.send(500, err);
        next(false);
    }
});

server.post('/find-or-create', async(req, res, next) => {
    try {
        await connectDB();
        let user = await findOneUser(req.params.username);
        if (!user) {
            user = await createUser(req);
            if (!user) throw new Error('No user created');
        }
        res.contentType = 'json';
        res.send(user);
        return next(false);
    } catch (err) {
        res.send(500, err);
        next(false);
    }
});

server.get('/find/:username', async(req, res, next) => {
    try {
        await connectDB();
        const user = await findOneUser(req.params.username);
        if (!user) {
            res.send(404, new Error("Did not find " + req.params.username));
        } else {
            res.contentType = 'json';
            res.send(user);
        }
        next(false);
    } catch (err) {
        res.send(500, err);
        next(false);
    }
});

server.get('/list', async(req, res, next) => {
    try {
        await connectDB();
        let userlist = await SQUser.findAll({});
        userlist = userlist.map(user => sanitizedUser(user));
        if (!userlist) userlist = [];
        res.contentType = 'json';
        res.send(userlist);
        next(false);
    } catch (err) {
        res.send(500, err);
        next(false);
    }
});

server.post('/update-user/:username', async(req, res, next) => {
    try {
        await connectDB();
        let toupdate = userParams(req);
        await SQUser.update(toupdate, {
            where: {
                username: req.params.username
            }
        });
        const result = await findOneUser(req.params.username);
        res.contentType = 'json';
        res.send(result);
        next(false);
    } catch (err) {
        res.send(500, err);
        next(false);
    }
});

server.del('/destroy/:username', async(req, res, next) => {
    try {
        await connectDB();
        const user = await SQUser.findOne({
            where: { username: req.params.username }
        });
        if (!user) {
            res.send(404,
                new Error(`Did not find requested ${req.params.username}
    to delete`));
        } else {
            user.destroy();
            res.contentType = 'json';
            res.send({});
        }
        next(false);
    } catch (err) {
        res.send(500, err);
        next(false);
    }
});

server.post('/password-check', async(req, res, next) => {
    try {
        await connectDB();
        const user = await SQUser.findOne({
            where: { username: req.params.username }
        });
        let checked;
        if (!user) {
            checked = {
                check: false,
                username: req.params.username,
                message: "Could not find user"

            };
        } else if (user.username === req.params.username &&
            user.password === req.params.password) {
            checked = { check: true, username: user.username };
        } else {
            checked = {
                check: false,
                username: req.params.username,
                message: "Incorrect password"
            };
        }
        res.contentType = 'json';
        res.send(checked);
        next(false);
    } catch (err) {
        res.send(500, err);
        next(false);
    }
});