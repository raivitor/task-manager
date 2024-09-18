const express = require('express')
const routes = require('./routes')
const cors = require('cors')
require('./database');

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(cors())
    this.server.use(express.json());
    this.server.use(express.urlencoded({ extended: false }));
  }

  routes() {
    this.server.use('/api', routes);
  }
}

module.exports = new App();
