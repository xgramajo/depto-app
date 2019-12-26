const http = require("http");
const app = require("./app");

//"process.env" accede a las variables del entorno. " || 8080 lo usa si no hay ninguna variable creada"
const port = process.env.PORT || 8080;

const server = http.createServer(app);

server.listen(port);