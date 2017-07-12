const restify = require('restify');
const server = restify.createServer();
const router = require('./routes/index');
const mongoose = require('mongoose');
const morgan = require('morgan');
const config = require('./config');
const bcrypt = require('bcrypt');
const corsMiddleware = require('restify-cors-middleware')
var serveStatic = require('serve-static-restify')
mongoose.Promise = global.Promise;

const cors = corsMiddleware({
    origins: ['*'],
})

server.pre(cors.preflight)
server.use(cors.actual)
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());
server.use(morgan('dev'));

// server.get('', restify.serveStatic({
//     directory: '../Client/dist',
//     default: 'index.html'
// }));

mongoose.connect(config.DbString, {
    useMongoClient: true
}, (err, data) => {
    if (err)
        console.log('db connection error' + err)
    else
        console.log('Connected');
});

router(server);

server.pre(serveStatic(__dirname + '/dist', { 'index': ['index.html', 'default.htm'] }))

server.listen(3000, function () {
    console.log('Booming on ' + server.url);
});

