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


import {
    _getRoot, _getGitRoot, _getSvnRoot, _getNodeModulesRoot, _getPackageJsonRoot, _getJscachePath, _getMercurialRoot,
    getRoot, getGitRoot, getSvnRoot, getNodeModulesRoot, getPackageJsonRoot, getPackageLockJsonRoot, getJscachePath, getMercurialRoot,
} from './index.js';
import * as getroot from "./index.js";

export default getroot;

export {
    _getRoot, _getGitRoot, _getSvnRoot, _getNodeModulesRoot, _getPackageJsonRoot, _getJscachePath, _getMercurialRoot,
    getRoot, getGitRoot, getSvnRoot, getNodeModulesRoot, getPackageJsonRoot, getPackageLockJsonRoot, getJscachePath, getMercurialRoot,
};
