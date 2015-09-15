var debug = require('debug')('Pars:Pars');

/**
 * expose the compatible pars
 */
exports = module.exports = Pars;

/**
 * pars constructor
 *
 * @param {Object} [opts]
 * @param {String} [options.lang] case-insensitive language code (zh-cn, en-us)
 * @param {Object} [options.plugins]
 * @public
 */
function Pars (opts) {
    var options = opts || {},
        lang = options.lang,
        plugins = options.plugins || {};

    // language support
    if (typeof lang !== 'string' && !(lang instanceof String)) {
        throw new TypeError('expects lang for initialization');
    }

    if (lang != 'zh-cn') {
        throw new TypeError('expects supported lang for initialization');
    }

    for (let prop in plugins) {
        if (Object.prototype.hasOwnProperty.call(plugins, prop) && !(prop in this)) {
            let eachPlug = plugins[prop];
            if (typeof eachPlug === 'function') {
                this[prop] = pluginCallback.bind(this, eachPlug);
                debug(`plugin ${prop} registered`);
            }
        }
    }
}

function pluginCallback (pluginFn, text) {
    var context = {
        originText: text
    };

    let len = arguments.length;
    if (len < 3) {
        pluginFn.call(undefined, context);
    } else {
        // ignore the first one
        let argsLength = len - 1;
        let args = new Array();
        args[0] = context;
        // push extra arguments
        for (let i = 1; i < argsLength; ++i) {
            args[i] = arguments[i + 1];
        }

        debug(`pass to plugin extra arguments '${args}'`);
        pluginFn.apply(undefined, args);
    }
}