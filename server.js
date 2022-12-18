"use strict";

var fs = require('fs');
var path = require('path');
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    var resolvedBase = path.resolve("./");
    var safeSuffix = path.normalize(req.url).replace(/^(\.\.[\/\\])+/, '');

    if(safeSuffix === "\\") {
        safeSuffix="\\index.html";
    }

    var fileLoc = path.join(resolvedBase, safeSuffix);

    fs.readFile(fileLoc, function(err, data) {
        if (err) {
            res.writeHead(404, 'Not Found');
            res.write('404: File Not Found!');
            return res.end();
        }
        
        res.statusCode = 200;

        res.write(data);
        return res.end();
    });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});