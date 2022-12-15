const http = require('http');
const fs = require('fs');
const qs = require('querystring');

const server = http.createServer(function (req, res) {
    if (req.method === 'GET') {
        fs.readFile('./views/register.html', function (err, data) {
            res.writeHead(200, {'Content-Type': 'text/html'}); // Thêm header
            res.write(data);
            return res.end();
        })
    } else {
        let data = ''; // Biến để chứa body

        // Bắt sự kiện data trong streams
        req.on('data', chunk => {
            data += chunk;
        })

        // Bắt sự kiện end trong streams
        req.on('end', () => {

            // Phân tích body
            const userInfo = qs.parse(data);
            fs.readFile('./views/info.html', 'utf8', function (err, datahtml) {
                if (err) {
                    console.log(err);
                }
                datahtml = datahtml.replace('{name}', userInfo.name);
                datahtml = datahtml.replace('{email}', userInfo.email);
                datahtml = datahtml.replace('{password}', userInfo.password);
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(datahtml);
                return res.end();
            });
        })
        req.on('error', () => {
            console.log('error')
        })
    }
});

server.listen(8080, function () {
    console.log('server running at localhost: 8080')
});

