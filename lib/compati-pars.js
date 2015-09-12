var debug = require('debug')('Pars:compatible');

/**
 * expose the compatible pars
 */
exports = module.exports = CompatiPars;

/**
 * Compatible pars constructor
 *
 * @param {String} [lang] language
 *  ONLY 'english' is supported and all the input language will auto convert to lower case
 * @public
 */
function CompatiPars (lang) {
    if (lang === undefined || lang.toLowerCase() != 'english') throw new Error ('Language not supported');
    this.language = lang;
    // empty plugins
    this.plugins = {};
    debug(`constructed with language ${lang}`);
}

/**
 * initialize Pars with given text
 *
 * @param {String} [text] text
 * @return {Array} words
 *  text sliced into single words
 * @public
 */
CompatiPars.prototype.init = function init (text) {
    if (text == null) throw new TypeError ('expect not null text');
    // empty string must return empty array
    if (text.length === 0) return [];

    // english
    let plainText = text.replace(/[,?!]/g, '');
    return plainText.split(/[\n ]+/);
};

/**
 * register plugin constructor with given unique name
 *
 * @param {String} [name] plugin unique name
 *  you will later access `get` via the name
 *  any duplicated plugins will be overwritten
 * @return {CompatiPars|boolean} success will return this otherwise return false
 * @public
 */
CompatiPars.prototype.register = function register (name, PluginConstrutor) {
    // construct the plugin
    let plugin = new PluginConstrutor(this);

    if (plugin && plugin.languages !== undefined) {
        let matched = plugin.languages[this.language];
        if (matched != null && matched !== false) {
            this.plugins[name] = plugin;
            debug(`register plugin ${name} OK`);
            return this;
        }
    }

    debug(`register plugin ${name} FAIL`);
    return false;
};

/**
 * parse out the result via given parse plugin
 *
 * @param {String} [name] already registered plugin name
 * @param {any} [...] will pass to plugin `calls` when invoking
 * @return {any|boolean} success will return plugin processed result otherwise return false
 * @public
 */
CompatiPars.prototype.get = function get (name) {
    let plugin = this.plugins[name];

    if (plugin != null && typeof plugin.calls === 'function') {
        try {
            return plugin.calls.apply(plugin, arguments);
        } catch (e) {
            debug(`something wrong when get the result ${e}`);
        }
    } else {
        debug(`no such plugin [${name}] or plugin has no 'calls' implementations`);
    }

    return false;
};