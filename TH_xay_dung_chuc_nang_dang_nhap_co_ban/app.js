const http = require('http');
http.createServer(function (req,res){
    let txt ='';
    if(req.url === "/login"){
        txt = "Login success";
    } else {
        txt = "Login fall";
    }
    res.end(txt);
}).listen(8080,'localhost');