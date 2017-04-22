import bodyParser from 'body-parser';
import express from 'express';
import fs from 'fs';

import baseManager from './base-manager';

const routeManager = Object.assign({}, baseManager, {
  configureDevelopmentEnv(app) {
    app.use(bodyParser.json());

    const router = express.Router();

    let readContent = function(request) {
      let file = request.params[0].replace(/\//g, '');
      if (!file || !file.length) {
        file = 'Home';
      }
      return fs.readFileSync('./app/content/' + file, 'utf8');
    };

    router.get('/content/*', (req, res) => {
      res.json(JSON.parse(readContent(req)));
    });

    router.get('*', (req, res) => {
      if (req.params[0].indexOf('.') < 0) {
        res.render('index', {
          data: readContent(req)
        });
      } else {
        res.status(404).send('Not found');
      }
    });

    app.use('/', router);
  }

});

export default routeManager;
