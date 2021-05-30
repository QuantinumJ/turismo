//Requires
require("dotenv").config();
require('./config/database');
const express = require('express');
const bodyparser = require('body-parser');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const router = require("./routes/index");
var cors = require("cors");




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
        app.use(cors());

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