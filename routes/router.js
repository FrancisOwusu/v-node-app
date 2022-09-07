const express = require('express')
const router = express.Router()
var format = require('util').format;
var multiparty = require('multiparty');


const app = express()

const path = require('path');


//user controller
var userController = require('../src/controllers/userController')

var db = require('../db/db');
const _dirname = '../views/';
// middleware that is specific to this router
// router.get('/form', function(req, res) {
//     res.send('<form action="/formData" method="post" enctype="multipart/form-data">' +
//         '<p>Title: <input type="text" name="title" /></p>' +
//         '<p>Image: <input type="file" name="image" /></p>' +
//         '<p><input type="submit" value="Upload" /></p>' +
//         '</form>');
// });




// router.get('/user', (req, res) => {
//     res.send('Got a PUT request at /user')
// })
router.get('/hedoo', (req, res) => {
        let responseText = 'Hello World!<br>'
        responseText += `<small>Requested at: ${req.requestTime}</small>`
        res.send(responseText)

        // res.send('Got a PUT request at /user')
    })
    // router.get('/hello', function(req, res) {
    //     var row = 4444
    //     res.render('../views/home.hbs', { row })
    //         //res.sendFile(path.join(__dirname,'views', 'hello.html'))
    // })




router.post('/formData', function(req, res, next) {
    // create a form to begin parsing
    var form = new multiparty.Form();
    var image;
    var title;



    // parse a file upload
    var form = new multiparty.Form();

    form.parse(req, function(err, fields, files) {
        res.writeHead(200, { 'content-type': 'text/plain' });
        res.write('received upload:\n\n');
        res.end(format.inspect({ fields: fields, files: files }));
    });
    console.log(form);
    return form;
    form.on('error', next);
    form.on('close', function() {
        res.send(format('\nuploaded %s (%d Kb) as %s', image.filename, image.size / 1024 | 0, title));
    });

    // listen on field event for title
    form.on('field', function(name, val) {
        if (name !== 'title') return;
        title = val;
    });

    // listen on part event for image file
    form.on('part', function(part) {
        if (!part.filename) return;
        if (part.name !== 'image') return part.resume();
        image = {};
        image.filename = part.filename;
        image.size = 0;
        part.on('data', function(buf) {
            image.size += buf.length;
        });
    });


    // parse the form
    console.log(form.parse(req));
});

module.exports = router