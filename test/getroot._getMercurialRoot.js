/**
 * 
 * Package: root-dirs
 * Author: Ganesh B
 * Description: Get root folders of git, svn, mercurial, ftp, nodejs node_modules, nodejs package.json, nodejs .jscache folder
 * Install: npm i root-dirs --save
 * Github: https://github.com/ganeshkbhat/get-root
 * npmjs Link: https://www.npmjs.com/package/root-dirs
 * File: index.js
 * File Description: Get root folders of git, svn, mercurial, ftp, nodejs node_modules, nodejs package.json, nodejs .jscache folder.
 * 
*/

/* eslint no-console: 0 */

'use strict';

const expect = require('chai').expect;
var getroot = require("../index.js");

describe('test-.mjs::root-dirs: Test Suite for root-dirs Files', function () {

    describe('test-.js::root-dirs: [Test A] Test Suite for root-dirs in main repo directory', function () {

        it('[Test A] Test for mercurial root using _getMercurialRoot', function (done) {
            // let result = getroot._getMercurialRoot(__dirname, { baseType: "mercurial", logger: console.log });
            // expect(result).to.equal("C:\\Users\\GB\\Documents\\projects\\requireurl\\get-root\\.hg");
            done();
        });

        it('[Test A] Test for mercurial root using getMercurialRoot', function (done) {
            // let result = getroot.getMercurialRoot(__dirname, { baseType: "mercurial", logger: console.log });
            // expect(result).to.equal("C:\\Users\\GB\\Documents\\projects\\requireurl\\get-root\\.hg");
            done();
        });

        it('[Test A] Test for hg root using _getMercurialRoot', function (done) {
            // let result = getroot._getMercurialRoot(__dirname, { baseType: "hg", logger: console.log });
            // expect(result).to.equal("C:\\Users\\GB\\Documents\\projects\\requireurl\\get-root\\.hg");
            done();
        });

        it('[Test A] Test for hg root using getMercurialRoot', function (done) {
            // let result = getroot.getMercurialRoot(__dirname, { baseType: "hg", logger: console.log });
            // expect(result).to.equal("C:\\Users\\GB\\Documents\\projects\\requireurl\\get-root\\.hg");
            done();
        });

        it('[Test A] Test for .hg root using _getMercurialRoot', function (done) {
            // let result = getroot._getMercurialRoot(__dirname, { baseType: ".hg", logger: console.log });
            // expect(result).to.equal("C:\\Users\\GB\\Documents\\projects\\requireurl\\get-root\\.hg");
            done();
        });

        it('[Test A] Test for .hg root using getMercurialRoot', function (done) {
            // let result = getroot.getMercurialRoot(__dirname, { baseType: ".hg", logger: console.log });
            // expect(result).to.equal("C:\\Users\\GB\\Documents\\projects\\requireurl\\get-root\\.hg");
            done();
        });

    });
});

