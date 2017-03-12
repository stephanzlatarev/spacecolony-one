import bodyParser from 'body-parser';
import express from 'express';

import baseManager from './base-manager';

const routeManager = Object.assign({}, baseManager, {
  configureDevelopmentEnv(app) {
    app.use(bodyParser.json());

    const router = express.Router();
    router.get('*', (req, res) => {
      res.render('index');
    });

    app.use('/', router);
  }

});

export default routeManager;
