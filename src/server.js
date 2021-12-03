const http = require('http')
const { getPersons, getPerson, createPerson, updatePerson, removePerson } = require('./controlers/personControler');

const vailidUUID = /\/person\/([0-9a-z]+)/i

require('dotenv').config() 
const port = process.env.PORT

const server = http.createServer((req, res)=>{
    if(req.url === '/person' && req.method === 'GET'){
        getPersons(req, res)
    } else if(req.url.match(vailidUUID) && req.method === 'GET') {
        const id = req.url.split('/')[2]
        getPerson(req, res, id)
    }else if(req.url === '/person' && req.method === 'POST'){
        createPerson(req, res)
    }else if(req.url.match(vailidUUID) && req.method === 'PUT'){
        const id = req.url.split('/')[2]
        updatePerson(req, res, id)
    }else if(req.url.match(vailidUUID) && req.method === 'DELETE'){
        const id = req.url.split('/')[2]
        removePerson(req, res, id)
    }else {
        res.writeHead(404, {'Content-Type' : 'application/json'})
        res.end(JSON.stringify({message : 'Route not found'}))
    }
})

 
server.listen(port, 'localhost', (err) => {
    err ? console.log(err) : console.log(`Server listening at port ${port}`)
})



