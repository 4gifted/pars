'use strict';

var should  = require("should");
var Pars = require('compati-pars');

describe('Pars', () => {
    it ('instantiate when given correct language', () => {
        let pars = new Pars('english');
        should(pars).be.an.instanceof(Pars);
    });
});