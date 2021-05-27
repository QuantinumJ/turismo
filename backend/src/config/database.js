const mongo = require('mongoose');
const conn = mongo.connection;


/**
 * Event on open database conection
 */
conn.once('open', () => {
    console.log("Connected to " + process.env.MONGO_URI);
});

//Try-catch connecting to db
try {
    mongo.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    });
} catch (err) {
    console.log("Connection error: " + err);
}

/**
 * Function close db connection
 */
module.exports.close = async function() {
    await conn.close();
}