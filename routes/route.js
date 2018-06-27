// module.exports = function(app) {
//     app.use('/', require('./login'));
//     app.use('/index', require('./index'));
//     app.use('/users', require('./users'));
// }


var index = require('./index');
var user = require('./user');
var login = require('./login');
var document = require('./document');
var upload_image = require('./upload_image');



module.exports = function(app) {
    app.use('/index', index);
    app.use('/user', user);
    app.use('/document', document);
    app.use('/upload_image', upload_image);
    app.use('/', login);

}