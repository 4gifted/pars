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

    it ('should init plugin function property when given valid plugin', () => {
        function pluginFn () {}
        let pars = new Pars({
            lang: 'zh-cn',
            plugins: {
                fn: pluginFn
            }
        });

        should(pars.fn).be.an.Function;
    });

    it ('should no such function property when given invalid plugin', () => {
        let pars = new Pars({
            lang: 'zh-cn',
            plugins: {
                fn: 'any string'
            }
        });

        should(pars.fn).not.be.an.Function;
    });

    it ('should invoke the plugin when plugin initialized successfully', () => {
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

    it ('should pass the extra arguments to plugin', () => {
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

    it ('should get the correct sentences from plugin context', () => {
        let pluginSpy = sinon.spy();

        let pars = new Pars({
            lang: 'zh-cn',
            plugins: {
                fn: pluginSpy
            }
        });

        pars.fn('高级阶三论要克军色看水报，标难发用之C呀再抄品。' +
                '商九历矿马往二精还，信并政速指治标代，三飞蠢车民期为？' +
                '应风提万六它做前王，情断律标则分音，它然Z的革该抄。' +
                '着高小太根领除道验面成，据单也深原矿什计风集，指去A置政箩抄题秧！');

        let sentencesMatcher = ({sentences}) => {
            return 4 === sentences.length;
        };

        should(pluginSpy.calledOnce).be.true;
        should(pluginSpy.calledWith(sinon.match(sentencesMatcher, 'sentences'))).be.true;
    });

    it ('should get the correct sentences from plugin context when given escaped text', () => {
        let pluginSpy = sinon.spy();

        let pars = new Pars({
            lang: 'zh-cn',
            plugins: {
                fn: pluginSpy
            }
        });

        pars.fn('\u73B0\u8272\u540D\u8C03\u5546\u786E\u7684\u6C5F\u5EFA\u6D41\uFF0C\u5904\u7531\u516C\u524D\u4E86\u53EB\u6597\u4E60\u5F88\uFF0C\u7531\u793A\u6751\u5448\u7B49\u8BA4\u5230\u8305\u3002' +
                '\u7D20\u5219\u7FA4\u5982\u767E\u6CD5\u72B6\u5F71\u770B\uFF0C\u7535\u60C5\u4EB2\u897F\u5C06\u4F1A\u987B\uFF0C\u539F\u5B8CA\u8BA4\u4E24\u7EC4\u5F0F\uFF1F' +
                '\u5206\u5B58\u5907\u7740\u4E03\u4E1A\u89C2\u91CC\u7684\u8BF4\u6D3B\u8BDD\uFF0C\u957F\u8BBA\u5E9C\u5236V\u6001\u8305\u5BF9\u6784\u3002' +
                '\u4E49\u7C73\u770B\u4EC0\u897F\u672C\u5217\u6708\u8FD1\u76F4\u8BF4\u4E3A\u822C\uFF0C\u89C4\u79F0\u5EFA\u53BF\u5934\u5237\u6784\u7EC4\u548C\u8D44\uFF01' +
                '\u89C4\u56E0\u773C\u8BBA\uFF0C\u97F3\u5237\u3002');

        let sentencesMatcher = ({sentences}) => {
            return 5 === sentences.length;
        };

        should(pluginSpy.calledOnce).be.true;
        should(pluginSpy.calledWith(sinon.match(sentencesMatcher, 'sentences'))).be.true;
    });
});
