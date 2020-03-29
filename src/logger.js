import chalk from 'chalk';

const { log } = console;

const logger = {
  debug(message) {
    log(chalk.cyan(message));
  },
  error(message) {
    log(chalk.red(message));
  },
  info(message) {
    log(chalk.blue(message));
  },
  json(obj) {
    this.debug(JSON.stringify(obj, null, 2));
  },
  success(message) {
    log(chalk.green(message));
  },
  warning(message) {
    log(chalk.yellow(message));
  },
};

export default logger;
