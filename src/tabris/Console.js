import {format} from './Formatter';
import {getStackTrace, getCurrentLine} from './util-stacktrace';

export const toXML = Symbol();

export default class Console {

  constructor() {
    this._registerPrintMethods(arguments[0]);
    this._prefixSpaces = 0;
    this._count = {};
  }

  trace() {
    this.log(getStackTrace(new Error('StackTrace')));
  }

  assert(expression, ...args) {
    if (!expression) {
      args[0] = `Assertion failed${args.length === 0 ? '' : `: ${args[0]}`}`;
      this.error(...args);
    }
  }

  count(label) {
    label = label ? label : 'default';
    if (!this._count[label]) {
      this._count[label] = 0;
    }
    this.log('%s: %s', label, ++this._count[label]);
  }

  countReset(label) {
    label = label ? label : 'default';
    this.log('%s: %s', label, this._count[label] = 0);
  }

  dirxml(obj) {
    if (obj && obj[toXML] instanceof Function) {
      this.log(obj[toXML]());
    } else {
      this.log(obj);
    }
  }

  group(...args) {
    this.log(...args);
    this._prefixSpaces += 2;
  }

  groupEnd() {
    if (this._prefixSpaces > 0) {
      this._prefixSpaces -= 2;
    }
  }

  debug(...args) {
    this._console.debug(...args);
  }

  info(...args) {
    this._console.info(...args);
  }

  log(...args) {
    this._console.log(...args);
  }

  warn(...args) {
    this._console.warn(...args);
  }

  error(...args) {
    this._console.error(...args);
  }

  _registerPrintMethods(nativeConsole) {
    this._console = {};
    for (const level of ['debug', 'info', 'log', 'warn', 'error']) {
      this._console[level] = (...args) => {
        const message = this._prepareOutput(...args);
        tabris.trigger('log', {level, message});
        nativeConsole.print(level, message);
      };
    }
  }

  _prepareOutput(...args) {
    let output = format(...args);
    if (this._prefixSpaces > 0) {
      output = `${' '.repeat(this._prefixSpaces)}${output}`;
    }
    return output;
  }

}

export function createConsole(nativeConsole) {
  return new Console(nativeConsole);
}

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

let inHint = false;

export const hint = function(source, message) {
  if (inHint) {
    return; // prevent potential stack overflow
  }
  inHint = true;
  let line = '';
  let prefix = '';
  try {
    line = getCurrentLine(new Error());
    if (source && typeof source === 'string') {
      prefix = source + ': ';
    } else if (source && source[toXML]) { // Alternative to using instanceof to avoid circular dependency
      prefix = (source._disposedToStringValue || source.toString()) + ': ';
    } else if (source && (source instanceof Function)) {
      prefix = source.name + ': ';
    } else if (source && (source.constructor instanceof Function)) {
      prefix = source.constructor.name + ': ';
    } else if (source) {
      prefix = source + ' ';
    }
  } catch (ex) {
    // ensure warning is printed in any case
  }
  defaultConsole.warn(prefix + message + (line ? `\nSource: ${line}` : ''));
  inHint = false;
};
