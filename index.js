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


const path = require('path');
const fs = require('fs');


/**
 *
 *
 * @param {*} startdirectory
 * @param {string} [options={ baseType: "git" }]
 * @return {*} 
 */
function _getRoot(startdirectory, options = { baseType: "git" }) {
    function cb(fullPath) {
        if (options.fileFolder === "folder" && options.baseType === "git" && !fs.lstatSync(fullPath).isDirectory()) {
            var content = fs.readFileSync(fullPath, { encoding: 'utf-8' });
            var match = /^gitdir: (.*)\s*$/.exec(content);
            if (match) {
                return path.normalize(match[1]);
            }
        }
        return path.normalize(fullPath);
    }

    if (!options.getRootCallback) {
        options["getRootCallback"] = cb
    }

    startdirectory = startdirectory || module.parent.filename;
    if (typeof startdirectory === 'string') {
        if (startdirectory[startdirectory.length - 1] !== path.sep) {
            startdirectory += path.sep;
        }
        startdirectory = path.normalize(startdirectory);
        startdirectory = startdirectory.split(path.sep);
    }

    if (!startdirectory.length) {
        options.logger('[require-urls]: index.js: repo base git/ or node_modules/ or package.json not found in path');
        throw new Error('[require-urls]: index.js: repo base git/ or node_modules/ not found in path');
    }

    startdirectory.pop();
    var fullPath = path.join(startdirectory.join(path.sep), "." + options.baseType);

    if (fs.existsSync(fullPath)) {
        return cb(fullPath);
    } else {
        return _getRoot(startdirectory, options);
    }
}

/**
 *
 *
 * @param {*} startdirectory
 * @param {*} options
 * @return {*} 
 */
function _getNodeModulesRoot(startdirectory, options) {
    function cb(fullPath, options) {
        if ((options.baseType === "node_modules") && !fs.lstatSync(fullPath).isDirectory()) {
            if (!fs.lstatSync(fullPath).isDirectory()) {
                var content = fs.readFileSync(fullPath, { encoding: 'utf-8' });
                var match = /^node_modulesdir: (.*)\s*$/.exec(content);
                if (match) {
                    return path.normalize(match[1]);
                }
            }
        }
        return path.normalize(fullPath);
    }
    options.baseType = "node_modules";
    return _getRoot(startdirectory, { ...options, baseType: options.baseType, getRootCallback: cb });
}

/**
 *
 *
 * @param {*} startdirectory
 * @param {*} options
 * @return {*} 
 */
function _getGitRoot(startdirectory, options) {
    function cb(fullPath, options) {
        if ((options.baseType === "git" || options.baseType === "gitlab" || options.baseType === "bitbucket") && !fs.lstatSync(fullPath).isDirectory()) {
            var content = fs.readFileSync(fullPath, { encoding: 'utf-8' });
            var match = /^gitdir: (.*)\s*$/.exec(content);
            if (match) {
                return path.normalize(match[1]);
            }
        }
        return path.normalize(fullPath);
    }
    options.baseType = "git";
    return _getRoot(startdirectory, { ...options, baseType: options.baseType, getRootCallback: cb });
}

/**
 *
 *
 * @param {*} startdirectory
 * @param {*} options
 * @return {*} 
 */
function _getSvnRoot(startdirectory, options) {
    function cb(fullPath, options) {
        if ((options.baseType === ".svn" || options.baseType === "svn") && !fs.lstatSync(fullPath).isDirectory()) {
            var content = fs.readFileSync(fullPath, { encoding: 'utf-8' });
            var match = /^svndir: (.*)\s*$/.exec(content);
            if (match) {
                return path.normalize(match[1]);
            }
        }
        return path.normalize(fullPath);
    }
    options.baseType = "svn";
    return _getRoot(startdirectory, { ...options, baseType: options.baseType, getRootCallback: cb });
}

/**
 *
 *
 * @param {*} startdirectory
 * @param {*} options
 * @return {*} 
 */
function _getFtpRoot(startdirectory, options) {
    return "[ERROR]: NOT IMPLEMENTED YET";
    function cb(fullPath, options) {

        return path.normalize(fullPath);
    }
    options.baseType = "ftp";
    return _getRoot(startdirectory, { ...options, baseType: options.baseType, getRootCallback: cb });
}

/**
 *
 *
 * @param {*} startdirectory
 * @param {*} options
 * @return {*} 
 */
function _getMercurialRoot(startdirectory, options) {
    function cb(fullPath, options) {
        if ((options.baseType === ".hg" || options.baseType === "hg" || options.baseType === "mercurial") && !fs.lstatSync(fullPath).isDirectory()) {
            var content = fs.readFileSync(fullPath, { encoding: 'utf-8' });
            var match = /^hgdir: (.*)\s*$/.exec(content);
            if (match) {
                return path.normalize(match[1]);
            }
        }
        return path.normalize(fullPath);
    }
    options.baseType = "hg";
    return _getRoot(startdirectory, { ...options, baseType: options.baseType, getRootCallback: cb });
}

/**
 *
 *
 * @param {*} startdirectory
 * @param {*} options
 * @return {*} 
 */
function _getPackageJsonRoot(startdirectory, options) {
    function cb(fullPath, options) {
        if ((options.baseType === "package.json") && !fs.lstatSync(fullPath).isDirectory()) {
            if (!fs.lstatSync(fullPath).isDirectory()) {
                var content = fs.readFileSync(fullPath, { encoding: 'utf-8' });
                var match = /^node_modulesdir: (.*)\s*$/.exec(content);
                if (match) {
                    return path.normalize(match[1]);
                }
            }
        }
        return path.normalize(fullPath);
    }
    options.baseType = "package.json";
    return _getRoot(startdirectory, { ...options, baseType: options.baseType, getRootCallback: cb });
}

/**
 *
 *
 * @param {*} startdirectory
 * @param {*} options
 * @return {*} 
 */
function _createJscachePath(startdirectory, options) {
    function cb(fullPath, options) {
        if ((options.baseType === ".jscache" || options.baseType === "jscache") && !fs.lstatSync(fullPath).isDirectory()) {
            if (!fs.lstatSync(fullPath).isDirectory()) {
                var content = fs.readFileSync(fullPath, { encoding: 'utf-8' });
                var match = /^jscachedir: (.*)\s*$/.exec(content);
                if (match) {
                    return path.normalize(match[1]);
                }
            }
        }
        return path.normalize(fullPath);
    }
    options.baseType = "jscache";
    return _getRoot(startdirectory, { ...options, baseType: options.baseType, getRootCallback: cb });
}


module.exports._getRoot = _getRoot;
module.exports._getGitRoot = _getGitRoot;
module.exports._getSvnRoot = _getSvnRoot;
module.exports._getFtpRoot = _getFtpRoot;
module.exports._getNodeModulesRoot = _getNodeModulesRoot;
module.exports._getPackageJsonRoot = _getPackageJsonRoot;
module.exports._createJscachePath = _createJscachePath;
module.exports.default = _getRoot;
