exports = module.exports = Pars;

/**
 * pars constructor
 *
 * @param {Object} [opts]
 * @param {String} [options.lang] case-insensitive language code (zh-cn, en-us)
 * @public
 */
function Pars (opts) {
    var options = opts || {},
        lang = options.lang;

    // language support
    if (typeof lang !== 'string' && !(lang instanceof String)) {
        throw new TypeError('expects lang for initialization');
    }

    if (lang != 'zh-cn') {
        throw new TypeError('expects supported lang for initialization');
    }
}