const server = require('./src/config')

const port = server.get('port')

server.listen(port, () => console.log(`Servidor rodando na porta ${port}`))

