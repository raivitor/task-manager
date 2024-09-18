require("dotenv").config();
const app = require("./src/app")

const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';
console.log("Executando na porta:", PORT)
module.exports = app.server.listen(PORT, HOST);
