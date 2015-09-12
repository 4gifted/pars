'use strict';

var should  = require("should"),
    sinon = require('sinon');

var Pars = require('../lib/compati-pars');

describe('Access compatible APIs', () => {
    it ('should instantiate when given correct language', () => {
        let pars = new Pars('english');
        should(pars).be.an.instanceof(Pars);
    });

    it ('should throw exception when not given language', () => {
        should(() => { new Pars(undefined); }).throw(Error);
    });

    it ('should throw exception when given unsupported language', () => {
        should(() => { new Pars('français'); }).throw(Error);
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
            };
        }

        let pars = new Pars('english');
        pars.init('any');
        should(pars.register('dates', NonEnglishPlugin)).not.be.instanceof(Pars);
    });

    it ('should invoke the plugins `calls`', () => {
        let pluginSpy = sinon.spy();
        function Plugin () {
            this.languages = {
                english: true
            };
            this.calls = pluginSpy.bind(this);
        }

        let pars = new Pars('english');
        pars.init('any');
        pars.register('void', Plugin);
        pars.get('void');

        should(pluginSpy.calledOnce).be.true;
    });

    it ('should invoke the plugins `calls` with given arguments', () => {
        let pluginSpy = sinon.spy();
        function Plugin () {
            this.languages = {
                english: true
            };
            this.calls = pluginSpy.bind(this);
        }

        let pars = new Pars('english');
        pars.init('any');
        pars.register('plugin', Plugin);
        pars.get('plugin', 'p1', 5, {k: 'k'});

        should(pluginSpy.calledOnce).be.true;
        should(pluginSpy.calledWithExactly('plugin', 'p1', 5, {k: 'k'})).be.true;
    });

    it ('should return false when the plugins `calls` throw an exception', () => {
        let pluginSpy = sinon.spy(() => { throw new Error('Some error'); });
        function Plugin () {
            this.languages = {
                english: true
            };
            this.calls = pluginSpy.bind(this);
        }

        let pars = new Pars('english');
        pars.init('any');
        pars.register('plugin', Plugin);
        let result = pars.get('plugin');

        should(result).be.false;
        should(pluginSpy.threw()).be.true;
    });
});