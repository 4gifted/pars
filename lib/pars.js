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

function pluginCallback (pluginFn, text, ...extraArgs) {
    var context = {
        originText: text,
        // split the text into sentences
        // period, exclamation mark and question mark
        // # `filter` needs polyfill for being introduced in ES5
        sentences: text.split(/[\u3002\uFF1F\uFF01]+/).filter(Boolean)
    };

    pluginFn.apply(undefined, [context, ...extraArgs]);
    debug(`pass to plugin extra arguments '${extraArgs.length > 0 ? extraArgs : 'none'}'`);
}