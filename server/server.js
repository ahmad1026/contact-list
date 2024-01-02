const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const fs = require('fs')
const path = require('path')
const cors = require('cors')




server.use(cors())
server.use(jsonServer.bodyParser)


const DB = JSON.parse(fs.readFileSync(path.join(__dirname, './db.json'), 'utf-8'))


server.use(router)


server.listen(3100, () => {
    console.log('Customized JSON-Server is running at http://localhost:3100/')
})
