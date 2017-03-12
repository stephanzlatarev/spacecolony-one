import nconf from 'nconf';

const baseManager = {
  handle(app) {
    this.configureCommon(app);

    if (nconf.get('development')) {
      this.configureDevelopmentEnv(app);
    } else {
      this.configureProductionEnv(app);            
    }
  },

  configureCommon() {},

  configureProductionEnv() {},

  configureDevelopmentEnv() {}    
};

export default baseManager;
