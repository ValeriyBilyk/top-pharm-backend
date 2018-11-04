'use strict';

const COLORS = {
  black: '\x1b[30m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
};

const BACKGROUND_COLORS = {
  black: '\x1b[40m',
  red: '\x1b[41m',
  green: '\x1b[42m',
  yellow: '\x1b[43m',
  blue: '\x1b[44m',
  magenta: '\x1b[45m',
  cyan: '\x1b[46m',
  white: '\x1b[47m',
};


class CustomLogger {
  constructor() {
    this.environments = ['dev'];
    this.settings = '';
    this.splitter = '';
  }

  /**
   * Function that defines environments where logs will be printed
   * @param {array} data
   * @return {CustomLogger}
   */
  env(data) {
    this.environments = data;
    return this;
  }

  bold() {
    this.settings += '\x1b[1m';
    return this;
  }

  pointer() {
    this.splitter = '-------------------------------->';
    return this;
  }

  color(data) {
    this.settings += COLORS[data];
    return this;
  }

  background(data) {
    this.settings += BACKGROUND_COLORS[data];
    return this;
  }

  print(...args) {
    this.settings += `${this.splitter} ${'%o'.repeat(args.length)}`;
    this.settings += '\x1b[0m'; // 'reset' code for settings
    (~this.environments.indexOf(process.env.NODE_ENV)) && console.log(this.settings, ...args);
    this.settings = '';
  }

}

const customLogger = new CustomLogger();
module.exports = customLogger;