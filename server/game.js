const http = require('http');

let number = Math.floor(Math.random() * (999)) + 1;
let answers = [];

const requestListener = function (req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    if (req.url != "/game") {
        res.writeHead(404);
        res.end();
        return;
    }
    if (req.method === "POST") {
        let body = "";
        req.on("data", chunk => {
            body += chunk;
        });
        req.on("end", () => {
            const a = +JSON.parse(body).data;
            answers.push(a);
            let result;
            if (a > number) {
                result = "Your number is more";
            } else if (a < number) {
                result = "Your number is less";
            } else if (a == number) {
                result = "You win!";
                number = Math.floor(Math.random() * (999)) + 1;
                answers = [];
            }
            res.writeHead(200);
            res.end(JSON.stringify({data: result}));
        });
    } else if (req.method === "GET") {
        res.writeHead(200);
        res.end(JSON.stringify({data: answers}));
    } else {
        res.writeHead(400);
        res.end();
    }
}

const server = http.createServer(requestListener);
server.listen(8085);
