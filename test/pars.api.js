'use strict';

var should  = require("should");

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
});