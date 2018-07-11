import {format} from './Formatter';

const defaultConsole = global.console.print
  ? createConsole(global.console)
  : global.console;

if (!defaultConsole.debug) {
  // The native node console has no "debug" method
  defaultConsole.debug = function(...args) {
    defaultConsole.log(...args);
  };
}

export const debug = function(...args) { defaultConsole.debug(...args); };
export const info = function(...args) { defaultConsole.info(...args); };
export const log = function(...args) { defaultConsole.log(...args); };
export const warn = function(...args) { defaultConsole.warn(...args); };
export const error = function(...args) { defaultConsole.error(...args); };

export function createConsole(nativeConsole) {
  let console = {};
  for (let level of ['debug', 'info', 'log', 'warn', 'error']) {
    console[level] = function(...args) {
      const message = format(...args);
      tabris.trigger('log', {level, message});
      nativeConsole.print(level, message);
    };
  }
  return console;
}
