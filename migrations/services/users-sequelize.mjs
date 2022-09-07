export async function findOneUser(username) {
    let user = await SQUser.findOne({ where: { username: username } });
    user = user ? sanitizedUser(user) : undefined;
    return user;
}
export async function createUser(req) {
    let tocreate = userParams(req);
    await SQUser.create(tocreate);
    const result = await findOneUser(req.params.username);
    return result;
}
export function sanitizedUser(user) {
    var ret = {
        id: user.username,
        username: user.username,
        provider: user.provider,
        familyName: user.familyName,
        givenName: user.givenName,
        middleName: user.middleName
    };
    try {
        ret.emails = JSON.parse(user.emails);
    } catch (e) { ret.emails = []; }
    try {
        ret.photos = JSON.parse(user.photos);
    } catch (e) { ret.photos = []; }
    return ret;
}

export function userParams(req) {
    return {
        username: req.params.username,
        password: req.params.password,
        provider: req.params.provider,
        familyName: req.params.familyName,

        givenName: req.params.givenName,
        middleName: req.params.middleName,
        emails: JSON.stringify(req.params.emails),
        photos: JSON.stringify(req.params.photos)
    };
}