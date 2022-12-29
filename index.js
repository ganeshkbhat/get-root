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
    function cbs(fullPath, options) {
        if ((!!options.fileFolder && options.fileFolder !== "folder") && options.baseType === "git" && !fs.lstatSync(fullPath).isDirectory()) {
            var content = fs.readFileSync(fullPath, { encoding: 'utf-8' });
            var match = /^gitdir: (.*)\s*$/.exec(content);
            console.log(match, path.normalize(match[1]))
            if (match) {
                return path.normalize(match[1]);
            }
        }
        return path.normalize(fullPath);
    }

    if (!options.getRootCallback) {
        options["getRootCallback"] = cbs
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
        (!!options.logger) ? options.logger('[get-root]: index.js: repo base git/ or node_modules/ or package.json not found in path') : null;
        throw new Error('[get-root]: index.js: repo base git/ or node_modules/ not found in path');
    }

    startdirectory.pop();

    if (options.baseType === "git" || options.baseType === "hg" || options.baseType === "svn" || options.baseType === "jscache") {
        options.baseType = "." + options.baseType;
    }

    var fullPath = path.join(startdirectory.join(path.sep), options.baseType);

    if (fs.existsSync(fullPath)) {
        return options["getRootCallback"](fullPath, options);
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
        console.log
        if ((!!options.fileFolder && options.fileFolder !== "folder") && (options.baseType === "node_modules") && !fs.lstatSync(fullPath).isDirectory()) {
            var content = fs.readFileSync(fullPath, { encoding: 'utf-8' });
            var match = /^node_modulesdir: (.*)\s*$/.exec(content);
            if (match) {
                return path.normalize(match[1]);
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
        if ((!!options.fileFolder && options.fileFolder !== "folder") && (options.baseType === "git" || options.baseType === ".git") && !fs.lstatSync(fullPath).isDirectory()) {
            var content = fs.readFileSync(fullPath, { encoding: 'utf-8' });
            var match = /^gitdir: (.*)\s*$/.exec(content);
            if (match) {
                return path.normalize(match[1]);
            }
        }
        return path.normalize(fullPath);
    }

    if (options.baseType === "gitlab" || options.baseType === "bitbucket") {
        options.baseType = "git";
    }
    options.baseType = "git";
    return _getRoot(startdirectory, { ...options, fileFolder: options.fileFolder, baseType: options.baseType, getRootCallback: cb });
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
        if ((!!options.fileFolder && options.fileFolder !== "folder") && (options.baseType === ".svn" || options.baseType === "svn") && !fs.lstatSync(fullPath).isDirectory()) {
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
        if ((!!options.fileFolder && options.fileFolder !== "folder") && (options.baseType === ".hg" || options.baseType === "hg") && !fs.lstatSync(fullPath).isDirectory()) {
            var content = fs.readFileSync(fullPath, { encoding: 'utf-8' });
            var match = /^hgdir: (.*)\s*$/.exec(content);
            if (match) {
                return path.normalize(match[1]);
            }
        }
        return path.normalize(fullPath);
    }
    if (options.baseType === "mercurial") {
        options.baseType = "hg"
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
        if ((!!options.fileFolder && options.fileFolder !== "folder") && (options.baseType === "package.json" || options.baseType === "package-lock.json") && !fs.lstatSync(fullPath).isDirectory()) {
            var content = fs.readFileSync(fullPath, { encoding: 'utf-8' });
            var match = /^node_modulesdir: (.*)\s*$/.exec(content);
            if (match) {
                return path.normalize(match[1]);
            }
        }
        return path.normalize(fullPath);
    }

    options.baseType = "package.json";
    return _getRoot(startdirectory, { ...options, fileFolder: options.fileFolder, baseType: options.baseType, getRootCallback: cb });
}


/**
 *
 *
 * @param {*} startdirectory
 * @param {*} options
 * @return {*} 
 */
function _getJscachePath(startdirectory, options) {
    function cb(fullPath, options) {
        if ((!!options.fileFolder && options.fileFolder !== "folder") && (options.baseType === "jscache" || options.baseType === ".jscache") && !fs.lstatSync(fullPath).isDirectory()) {
            var content = fs.readFileSync(fullPath, { encoding: 'utf-8' });
            var match = /^jscachedir: (.*)\s*$/.exec(content);
            if (match) {
                return path.normalize(match[1]);
            }
        }
        return path.normalize(fullPath);
    }
    options.baseType = "jscache";
    return _getRoot(startdirectory, { ...options, fileFolder: options.fileFolder, baseType: options.baseType, getRootCallback: cb });
}

/**
 *
 *
 * @param {*} startdirectory
 * @param {*} options
 */
function _createJscachePath(startdirectory, options) {
    return "[ERROR]: NOT IMPLEMENTED YET";
}


module.exports._getRoot = _getRoot;
module.exports._getGitRoot = _getGitRoot;
module.exports._getSvnRoot = _getSvnRoot;
module.exports._getFtpRoot = _getFtpRoot;
module.exports._getMercurialRoot = _getMercurialRoot;
module.exports._getNodeModulesRoot = _getNodeModulesRoot;
module.exports._getPackageJsonRoot = _getPackageJsonRoot;
module.exports._getPackageLockJsonRoot = _getPackageJsonRoot;
module.exports._getJscachePath = _getJscachePath;

module.exports.getRoot = _getRoot;
module.exports.getGitRoot = _getGitRoot;
module.exports.getSvnRoot = _getSvnRoot;
module.exports.getFtpRoot = _getFtpRoot;
module.exports.getMercurialRoot = _getMercurialRoot;
module.exports.getNodeModulesRoot = _getNodeModulesRoot;
module.exports.getPackageJsonRoot = _getPackageJsonRoot;
module.exports.getPackageLockJsonRoot = _getPackageJsonRoot;
module.exports.getJscachePath = _getJscachePath;


module.exports.default = _getRoot;
