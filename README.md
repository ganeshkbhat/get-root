# get-root
Get root folders of git, svn, mercurial, ftp, nodejs node_modules, nodejs package.json, nodejs .jscache folder


Find the demos in the [demos folder](./demos)


## getRoot

Usage: `getRoot(startdirectory, options = { baseType: "git" })`

Get the root folder of specified options.

```
/**
 *
 * @param {*} startdirectory
 * @param {string} [options={ baseType: "git", getRootCallback: callbackFunction }]
 * @return {*} 
 */
```


## getNodeModulesRoot

Usage: `getNodeModulesRoot(startdirectory, options)`

Get the root folder of node in the project.

```
/**
 *
 * @param {*} startdirectory
 * @param {*} options
 * @return {*} 
 */
```


## getGitRoot

Usage: `getGitRoot(startdirectory, options)`

Get the root folder of git in the project.

```
/**
 *
 * @param {*} startdirectory
 * @param {*} options
 * @return {*} 
 */
```


## getSvnRoot

Usage: `getSvnRoot(startdirectory, options)`

Get the root folder of svn in the project.

```
/**
 *
 * @param {*} startdirectory
 * @param {*} options
 * @return {*} 
 */
```


## getFtpRoot


Usage: `getFtpRoot(startdirectory, options)`

Get the root folder of ftp in the project.

```
/**
 *
 * @param {*} startdirectory
 * @param {*} options
 * @return {*} 
 */
```


## getMercurialRoot

Usage: `getMercurialRoot(startdirectory, options)`

Get the root folder of mercurial in the project.

```
/**
 *
 * @param {*} startdirectory
 * @param {*} options
 * @return {*} 
 * 
 */
```


## getPackageJsonRoot


Usage: `getPackageJsonRoot(startdirectory, options)`

Get the root folder of package.json in the project.

```
/**
 *
 * @param {*} startdirectory
 * @param {*} options
 * @return {*} 
 */
```


## createJscachePath


Usage: `createJscachePath(startdirectory, options)`

Get the root folder of jscache in the project.

```
/**
 *
 *
 * @param {*} startdirectory
 * @param {*} options
 * @return {*} 
 */
```


### Contributions

Contributions, Feature Improvements, Bugs, and Issues are invited. [raising an issue](https://github.com/ganeshkbhat/get-root/issues)


# License

[MIT License](./LICENSE)
