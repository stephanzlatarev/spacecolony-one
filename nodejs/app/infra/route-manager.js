import bodyParser from 'body-parser';
import express from 'express';
import fs from 'fs';

import baseManager from './base-manager';

const routeManager = Object.assign({}, baseManager, {
  configureDevelopmentEnv(app) {
    app.use(bodyParser.json());

    const router = express.Router();

    router.get('/content/*', (req, res) => {
      fs.readFile('./app/content/' + req.params[0], 'utf8', function(error, input) {
        res.json(JSON.parse(input));
      });
    });

    router.get('*', (req, res) => {
      res.render('index');
    });

    app.use('/', router);
  }

});

export default routeManager;
