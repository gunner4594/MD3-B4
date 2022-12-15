const http = require('http')
const fs = require('fs')
const qs = require('qs')

const server = http.createServer(function (req,res){
    if (req.method === 'GET') {
        fs.readFile('./calculator.html',function (err,data){
            res.writeHead(200,{'Content-Type': 'text/html'})
            res.write(data)
            return res.end()
        })
    } else {
        let data = ''
        req.on('data', function (chunk){
            data += chunk
        })
        req.on('end',function (){
            const calculation = qs.parse(data)
            fs.readFile('./calculator.html','utf8',function (err,dataHTML){
                dataHTML = dataHTML.replace('{result}',eval(calculation.math))
                res.writeHead(200,{'Content-Type':'text/html'})
                res.write(dataHTML)
                return res.end()
            })
        })
    }
})
server.listen(8080, function (){
    console.log('server running at localhost:8080 ')
})