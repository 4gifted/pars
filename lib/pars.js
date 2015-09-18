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

    let plugs = [];
    for (let prop in plugins) {
        plugs.push(prop);
    }

    // all the wrapped plugin objects will attach to the host
    let pluginsHost = this;

    // # `filter` `map` and `reduce` need polyfills for being introduced in ES5
    plugs.filter((plugName) => {
        return Object.prototype.hasOwnProperty.call(plugins, plugName) &&
               !(plugName in pluginsHost) &&
               typeof plugins[plugName] === 'function';
    }).map((plugName) => {
        // wrapped the user given plugin function
        return {
            name: plugName,
            plugin: function pluginFnWrapper (text, ...extraArgs) {
                var context = {
                    originText: text,
                    // split the text into sentences
                    // period, exclamation mark and question mark
                    sentences: text.split(options.toleratedPeriod === true ? /[\u3002\uFF1F\uFF01\.\!\?]+/ : /[\u3002\uFF1F\uFF01]+/).filter(Boolean)
                };

                plugins[plugName].apply(undefined, [context, ...extraArgs]);
                debug(`pass to plugin extra arguments '${extraArgs.length > 0 ? extraArgs : 'none'}'`);
            }
        };
    }).reduce((host, plugInfo) => {
        // attach all the plugins to the host
        host[plugInfo.name] = plugInfo.plugin;
        debug(`plugin ${plugInfo.name} registered`);
        return host;
    }, pluginsHost);
}