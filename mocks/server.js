var jsonServer = require('json-server')
var routeData = require('./routes.json')
var server = jsonServer.create()
var router = jsonServer.router('mocks/db.json')
var serverPort = process.argv[2];

server.use(jsonServer.rewriter(routeData))
// TODO: fix static file path
server.use(jsonServer.defaults([]))
// server.use(jsonServer.defaults(['./mocks/static'])) //for static files
server.use(router)

server.listen(serverPort, () => {
    console.log(`Mock server (JSON server) is up and running at port: ${serverPort}`);
});