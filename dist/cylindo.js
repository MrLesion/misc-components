/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/cylindo/index.js":
/*!******************************!*\
  !*** ./src/cylindo/index.js ***!
  \******************************/
/***/ (() => {

eval("﻿const getCylindoFeatures = () =>{\r\n    let returnValue = {};\r\n    const initialState = document.querySelector('.js-initial-cylindo-state').textContent;\r\n    let splitInitialState = initialState.split(' ');\r\n    returnValue[splitInitialState[0]] = splitInitialState[1];\r\n\r\n    const variants = document.querySelectorAll(\".js-cylindo-variants\");\r\n    const optionals = document.querySelectorAll('.js-cylindo-optional');\r\n\r\n    Array.from(variants).forEach(variant => {\r\n        returnValue[variant.name] = variant.value;\r\n    });\r\n\r\n    Array.from(optionals).filter(o => o.checked === true).forEach(optional => {\r\n        returnValue[optional.name] = optional.value;\r\n    });\r\n    \r\n    console.log('features', returnValue);\r\n    \r\n    return returnValue;\r\n}\r\n\r\nconst setCylindoFeatures = (viewer) =>{\r\n    viewer.features = getCylindoFeatures();\r\n}\r\n\r\nconst updateViewers = () =>{\r\n    const viewers = document.querySelectorAll(\"cylindo-viewer\");\r\n    viewers.forEach((viewer) =>{\r\n        setCylindoFeatures(viewer);\r\n    });\r\n}\r\n\r\nconst init = () =>{\r\n    const variants = document.querySelectorAll(\".js-cylindo-variants\");\r\n    const optionals = document.querySelectorAll('.js-cylindo-optional');\r\n    \r\n    variants.forEach(variant => {\r\n        variant.addEventListener(\"change\", event => {\r\n            updateViewers();\r\n        });\r\n    });\r\n\r\n    optionals.forEach(optional => {\r\n        optional.addEventListener(\"change\", event => {\r\n            updateViewers();\r\n        });\r\n    });\r\n\r\n    updateViewers();\r\n}\r\n\r\ndocument.addEventListener('DOMContentLoaded', () =>{\r\n    init();\r\n});\r\n\r\n\n\n//# sourceURL=webpack://components/./src/cylindo/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/cylindo/index.js"]();
/******/ 	
/******/ })()
;