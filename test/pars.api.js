'use strict';

var should  = require("should"),
    sinon = require('sinon');

var Pars = require('../lib/pars');

describe('Access Pars.js APIs', () => {
    it ('should instantiate when given correct language', () => {
        let pars = new Pars({
            lang: 'zh-cn'
        });
        should(pars).be.an.instanceof(Pars);
    });

    it ('should throw exception when not given language', () => {
        should(() => { new Pars(undefined); }).throw(TypeError);
    });

    it ('should throw exception when given unsupported language', () => {
        should(() => { new Pars({ lang: 'fr' } ); }).throw(Error);
    });

    it ('should throw exception when given invalid lang property', () => {
        should(() => { new Pars({ lang: 5 } ); }).throw(TypeError);
    });

    it ('should throw exception when given invalid lang property', () => {
        should(() => { new Pars({ lang: 5 } ); }).throw(TypeError);
    });

    it('should init plugin function property when given valid plugin', () => {
        function pluginFn () {}
        let pars = new Pars({
            lang: 'zh-cn',
            plugins: {
                fn: pluginFn
            }
        });

        should(pars.fn).be.an.Function;
    });

    it('should no such function property when given invalid plugin', () => {
        let pars = new Pars({
            lang: 'zh-cn',
            plugins: {
                fn: 'any string'
            }
        });

        should(pars.fn).not.be.an.Function;
    });

    it('should invoke the plugin when plugin initialized successfully', () => {
        let pluginSpy = sinon.spy();

        let pars = new Pars({
            lang: 'zh-cn',
            plugins: {
                fn: pluginSpy
            }
        });

        pars.fn('process text');
        should(pluginSpy.calledOnce).be.true;
    });

    it('should pass the extra arguments to plugin', () => {
        let pluginSpy = sinon.spy();

        let pars = new Pars({
            lang: 'zh-cn',
            plugins: {
                fn: pluginSpy
            }
        });

        pars.fn('process text', 'extra1', 50, {arg: 1.0, arg1: ['a', 'b']});
        should(pluginSpy.calledOnce).be.true;
        should(pluginSpy.calledWith(sinon.match.object, 'extra1', 50, {arg: 1.0, arg1: ['a', 'b']})).be.true;
    });
});