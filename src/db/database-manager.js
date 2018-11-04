const mongoose = require('mongoose');
const {log} = require('../lib/logger');
const Drug = require('./drug');

const MONGO_URL = process.env.MONGO_URL;

class DatabaseManager {

  constructor() {
    mongoose.Promise = global.Promise;
  }

  async connect() {
    try {
      const options = {
        server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
        replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }
      };
      this.db = await mongoose.connect(MONGO_URL, options);
      log.info(`Database connection is established. MONGO URL is ${MONGO_URL}`);

      return this.db;
    }
    catch (error) {
      log.warn(`Failed to establish database connection. MONGO URL ${MONGO_URL}`);
      log.error(error);

      throw error;
    }
  }

  async presetModels() {

    await Drug.findOneAndUpdate(
      {name: 'No shpa'},
      {$set: {price: 50, description: 'Narcological', name: 'No shpa'}},
      {new: true, upsert: true}
    );
  }
}

module.exports = new DatabaseManager();

