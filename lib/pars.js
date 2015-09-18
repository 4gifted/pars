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
 * @param {Boolean} [options.toleratedPeriod] '.', '!', '?' will be allowed when using as a period in sentences
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

    let pluginsHost = this;
    RegisterPlugins.call(pluginsHost, plugins, (pluginFn) => {
        return function pluginCallback (text, ...extraArgs) {
            var context = {
                originText: text,
                // split the text into sentences
                // period, exclamation mark and question mark
                // # `filter` needs polyfill for being introduced in ES5
                sentences: text.split(options.toleratedPeriod === true ? /[\u3002\uFF1F\uFF01\.\!\?]+/ : /[\u3002\uFF1F\uFF01]+/).filter(Boolean)
            };

            pluginFn.apply(undefined, [context, ...extraArgs]);
            debug(`pass to plugin extra arguments '${extraArgs.length > 0 ? extraArgs : 'none'}'`);
        };
    });
}

function RegisterPlugins (plugins, eachCallback) {
    for (let prop in plugins) {
        if (Object.prototype.hasOwnProperty.call(plugins, prop) && !(prop in this)) {
            let eachPlug = plugins[prop];
            if (typeof eachPlug === 'function') {
                this[prop] = eachCallback(eachPlug);
                debug(`plugin ${prop} registered`);
            }
        }
    }
}