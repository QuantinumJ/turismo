//Requires
require("dotenv").config();
require('./config/database');
const express = require('express');
const bodyparser = require('body-parser');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const router = require("./routes/index");

const { ENGINE_METHOD_ALL } = require("constants");



let _server; //Server variable

//Server
const server = {
    start() { //Server start
        const app = express();

        //App configs
        app.set('env', process.env.NODE_ENV);
        app.use(bodyparser.json());
        app.use(bodyparser.urlencoded({ extended: false }));
        app.disable("x-powered-by");
        app.use(cookieParser());




        // error handler
        app.use(function(err, req, res, next) {
            // set locals, only providing error in development
            res.locals.message = err.message;
            res.locals.error = req.app.get('env') === 'development' ? err : {};

            // render the error page
            res.status(err.status || 500);
            res.render('error');
        });


        //Test
        if (process.env.NODE_ENV !== 'test')
            app.use(morgan('[:date[clf]] | :remote-addr - :remote-user ":url :method " :status :res[content-length] ":referrer" :req[params]'));

        //Global route config
        app.use(function(req, res, next) {
            res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
            next();
        });

        try {
            router(app); //Router call
        } catch (err) {
            console.log(app, err);
        }

        //Server port listener
        _server = app.listen(process.env.NODE_PORT, () => {
            console.log("Server on port: " + process.env.NODE_PORT);
        });
    },
    close() { //Server closure
        _server.close();
    }
};

//Export
module.exports = server;

//Server started
server.start();