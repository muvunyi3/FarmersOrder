import http, {IncomingMessage, Server, ServerResponse} from 'http';

const hostname:string = '127.0.0.1'
const port:number = 5000

const server:Server = http.createServer((request:IncomingMessage, response: ServerResponse) => {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/html');
    response.end(`Welcome to Farmers Order System`);

});

server.listen(port, hostname, () => {
    console.log(`Node Js Server is started ...`);
});