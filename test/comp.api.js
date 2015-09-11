'use strict';

var should  = require("should"),
    sinon = require('sinon');

var Pars = require('compati-pars');

describe('Access compatible APIs', () => {
    it ('should instantiate when given correct language', () => {
        let pars = new Pars('english');
        should(pars).be.an.instanceof(Pars);
    });

    it ('should instantiate return null when given unsupported language', () => {
        let pars = new Pars('français');
        should(pars).not.be.ok;
    });

    it ('should return an array when calling `init`', () => {
        let pars = new Pars('english');
        let words = pars.init('any words');
        should(words).be.an.Array;
    });

    it ('should return an empty array with empty string given when calling `init`', () => {
        let pars = new Pars('english');
        let words = pars.init('');
        should(words).be.empty;
    });

    it ('should throw TypeError with nothing given when calling `init`', () => {
        let pars = new Pars('english');
        should(() => { pars.init(); }).throw(TypeError);
    });

    it ('should return false with nothing get registered when calling `get`', () => {
        let pars = new Pars('english');
        pars.init('any');
        should(pars.get('dates')).be.false;
    });

    it ('should not return Pars instance when registering plugin language is not existed', () => {
        let pars = new Pars('english');
        pars.init('any');
        should(pars.register('dates', Object /* has no property languages */)).not.be.instanceof(Pars);
    });

    it ('should not return Pars instance when registering plugin language is not supported', () => {
        function NonEnglishPlugin () {
            this.languages = {
                english: false
            }
        };

        let pars = new Pars('english');
        pars.init('any');
        should(pars.register('dates', NonEnglishPlugin)).not.be.instanceof(Pars);
    });

    it ('should invoke the plugins `calls`', () => {
        let pluginSpy = sinon.spy({ calls: () => {} }, "calls");
        function VoidPlugin () {
            return pluginSpy;
        }

        let pars = new Pars('english');
        pars.init('any');
        pars.register('void', VoidPlugin);
        pars.get('void');

        should(pluginSpy.calledOnce).be.true;
    });

    it ('should invoke the plugins `calls` with given arguments', () => {
        let pluginSpy = sinon.spy({ calls: (plugin, a, b, c) => {} }, "calls");
        function Plugin () {
            return pluginSpy;
        }

        let pars = new Pars('english');
        pars.init('any');
        pars.register('plugin', Plugin);
        pars.get('plugin', 'p1', 5, {k: 'k'});

        should(pluginSpy.calledOnce).be.true;
        should(pluginSpy.calledWithExactly('plugin', 'p1', 5, {k: 'k'})).be.true;
    });

    it ('should return false when the plugins `calls` throw an exception', () => {
        let pluginSpy = sinon.spy({ calls: () => { throw new Error('Some error'); } }, "calls");
        function Plugin () {
            return pluginSpy;
        }

        let pars = new Pars('english');
        pars.init('any');
        pars.register('plugin', Plugin);
        let result = pars.get('plugin');

        should(result).be.false;
        should(pluginSpy.threw()).be.true;
    });
});