const usersRouter = require('./users');
const loginRouter = require('./login');


//App export
module.exports = app => {

    app.use('/users', usersRouter); //User route

    app.use('/auth', loginRouter); //Ruta de login

    app.use('/', function(req, res) {
        res.status(200).json({ ok: true, message: "Main page operative" });
    });


    //Error 404
    app.use(function(req, res, next) {
        return res.status(404).json("Page not found");
    });
};