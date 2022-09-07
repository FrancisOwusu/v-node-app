// Mimic API Key authentication.
var apiKeys = [{ user: 'them', key: 'D4ED43C0-8BD6-4FE2-B358-7C0E230D11EF' }];

function check(req, res, next) {
    if (req.authorization && req.authorization.basic) {
        var found = false;

        for (let auth of apiKeys) {
            if (auth.key === req.authorization.basic.password &&
                auth.user === req.authorization.basic.username) {
                found = true;
                break;
            }
        }
        if (found) next();
        else {
            res.send(401, new Error("Not authenticated"));
            next(false);
        }
    } else {
        res.send(500, new Error('No Authorization Key'));
        next(false);
    }
}

export async function create(username, password,
    provider, familyName, givenName, middleName,
    emails, photos) {
    var res = await request
        .post(reqURL('/create-user'))
        .send({
            username,
            password,
            provider,
            familyName,
            givenName,
            middleName,
            emails,
            photos
        })
        .set('Content-Type', 'application/json')
        .set('Acccept', 'application/json')
        .auth(authid, authcode);
    return res.body;
}
export async function update(username, password,
    provider, familyName, givenName, middleName,
    emails, photos) {
    var res = await request
        .post(reqURL(`/update-user/${username}`))
        .send({
            username,
            password,
            provider,
            familyName,
            givenName,
            middleName,
            emails,
            photos

        })
        .set('Content-Type', 'application/json')
        .set('Acccept', 'application/json')
        .auth(authid, authcode);
    return res.body;
}

export async function find(username) {
    var res = await request
        .get(reqURL(`/find/${username}`))
        .set('Content-Type', 'application/json')
        .set('Acccept', 'application/json')
        .auth(authid, authcode);
    return res.body;
}
export async function userPasswordCheck(username, password) {
    var res = await request
        .post(reqURL(`/password-check`))
        .send({ username, password })
        .set('Content-Type', 'application/json')
        .set('Acccept', 'application/json')
        .auth(authid, authcode);
    return res.body;
}

export async function findOrCreate(profile) {
    var res = await request
        .post(reqURL('/find-or-create'))
        .send({
            username: profile.id,
            password: profile.password,
            provider: profile.provider,
            familyName: profile.familyName,
            givenName: profile.givenName,
            middleName: profile.middleName,
            emails: profile.emails,
            photos: profile.photos
        }).set('Content-Type', 'application/json')
        .set('Acccept', 'application/json')
        .auth(authid, authcode);
    return res.body;
}

export async function listUsers() {
    var res = await request
        .get(reqURL('/list'))
        .set('Content-Type', 'application/json')
        .set('Acccept', 'application/json')
        .auth(authid, authcode);
    return res.body;
}

export function initPassport(app) {
    app.use(passport.initialize());
    app.use(passport.session());
}
export function ensureAuthenticated(req, res, next) {
    try {
        // req.user is set by Passport in the deserialize function
        if (req.user) next();
        else res.redirect('/users/login');
    } catch (e) { next(e); }
}