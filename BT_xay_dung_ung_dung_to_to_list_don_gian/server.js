const http = require('http');
const fs = require('fs');
const qs = require('qs');

const server = http.createServer(function (req,res){
    if(req.url === '/' && req.method === 'GET') {
        fs.readFile('todo.html', function (err,data){
            res.writeHead(200,{'Content-Type': 'text/html'})
            res.write(data)
            return res.end();
        });
    }
    if (req.url === '/' && req.method === 'POST') {
        let data = ''
        let todoList = []
        req.on('data', function (chunk){
            data += chunk
        })
        req.on('end', function (){
            const todoInfo = qs.parse(data)
            todoList.push(todoInfo)
            fs.readFile('display.html', 'utf-8', function (err, datahtml){
                if (err) {
                    console.log(err)
                }
                let table = ` <tr>
                              <th>job</th>
                              </tr>`
                for (let i = 0; i < todoList.length; i++) {
                    table += `<tr>
                              <td>${todoList[i].job}</td>
                              </tr>`
                }
                datahtml = datahtml.replace(`{table data}`, table)
                res.writeHead(200, {'Content-Type': 'text/html'})
                res.write(datahtml)
                return res.end()
            })
        })
        req.on('error', () => {
            console.log('error')
        })
    }
});
server.listen(8080, function (){
    console.log('server running at localhost:8080 ')
})