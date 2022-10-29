/**
 * 
 * Package: 
 * Author: Ganesh B
 * Description: JS functions to check if the file is a ES Module or a CJS/ JS Module or Script
 * Install: npm i  --save
 * Github: https://github.com/ganeshkbhat/isesm
 * npmjs Link: 
 * File: index.mjs
 * File Description: 
 * 
*/

/* eslint no-console: 0 */

'use strict';


import { _getRoot, _getGitRoot, _getSvnRoot, _getFtpRoot, _getNodeModulesRoot, _getPackageJsonRoot, _createJscachePath } from './index.js';
import * as getroot from "./index.js";

export default getroot;
export { _getRoot, _getGitRoot, _getSvnRoot, _getFtpRoot, _getNodeModulesRoot, _getPackageJsonRoot, _createJscachePath };
