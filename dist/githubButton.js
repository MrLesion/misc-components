/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/github-button/index.js":
/*!************************************!*\
  !*** ./src/github-button/index.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utillities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utillities */ \"./src/utillities/index.js\");\n\r\n\r\ncustomElements.define('github-button', class extends HTMLElement {\r\n    constructor() {\r\n        super();\r\n        this.shadow = this.attachShadow( { mode: 'closed' } );\r\n        const styleSheet = document.createElement('style');\r\n        const style = `\r\n            .github-button{\r\n                font-family:Arial, Helvetica, sans-serif;\r\n                cursor:pointer;\r\n                border: 1px solid #555;\r\n                background-color: #f9f9f9;\r\n                border-radius: 5px;\r\n                display:inline-flex;\r\n                justify-content:center;\r\n                align-items:center;\r\n                padding: .75em 1.2em;\r\n                box-shadow: 0 1px 2px 0 rgba(0,0,0,0.2), 0 1px 3px 0 rgba(0,0,0,0.19);\r\n                transition: all .2s ease-in-out;\r\n            }\r\n            .github-button:hover {\r\n                border-color:#000;\r\n                background-color: #f1f1f1;\r\n            }\r\n            .github-button svg{\r\n                width: 20px;\r\n                margin-right: 5px;\r\n            }\r\n        `;\r\n        styleSheet.textContent = style;\r\n        this.shadow.appendChild(styleSheet)\r\n    }\r\n    connectedCallback(){\r\n        this.link = this.getAttribute('link');\r\n        this.text = this.getAttribute('text');\r\n        const svg = `<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z\"></path></svg>`;\r\n        const button = (0,_utillities__WEBPACK_IMPORTED_MODULE_0__.buildHtmlElement)('span', {class: 'github-button'}, `${svg} ${this.text}`);\r\n        this.onclick = (event) =>{\r\n            event.preventDefault();\r\n            window.open(this.link);\r\n        };\r\n        this.shadow.appendChild( button );\r\n    }\r\n});\n\n//# sourceURL=webpack://components/./src/github-button/index.js?");

/***/ }),

/***/ "./src/utillities/index.js":
/*!*********************************!*\
  !*** ./src/utillities/index.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   buildHtmlElement: () => (/* binding */ buildHtmlElement),\n/* harmony export */   formatOptionAttribute: () => (/* binding */ formatOptionAttribute),\n/* harmony export */   formatOptionValue: () => (/* binding */ formatOptionValue),\n/* harmony export */   generateGuid: () => (/* binding */ generateGuid),\n/* harmony export */   minifyStyle: () => (/* binding */ minifyStyle)\n/* harmony export */ });\n﻿const buildHtmlElement = ( tagName, attributes = {}, content = '' ) => {\r\n    const htmlElement = document.createElement( tagName );\r\n    Object.keys( attributes ).forEach( key => htmlElement.setAttribute( key, attributes[ key ] ) );\r\n    if ( content !== '' ) {\r\n        htmlElement.innerHTML = content;\r\n    }\r\n    return htmlElement;\r\n}\r\nconst formatOptionAttribute = ( strOptionsAttributeName ) => {\r\n    return strOptionsAttributeName.split( '-' ).map( ( char, index ) => index ? char.charAt( 0 ).toUpperCase() + char.slice( 1 ).toLowerCase() : char.toLowerCase() ).join( '' );\r\n}\r\nconst formatOptionValue = ( strAttribute ) => {\r\n    let value = Number( strAttribute );\r\n    if ( isNaN( value ) ) {\r\n        value = strAttribute;\r\n        if ( value.toLowerCase() === 'true' ) {\r\n            value = true;\r\n        }\r\n        else if ( value.toLowerCase() === 'false' ) {\r\n            value = false;\r\n        }\r\n        else if ( value.indexOf( ',' ) > -1 ) {\r\n            value = value.split( ',' ).map( ( str ) => str );\r\n        }\r\n    }\r\n    return value;\r\n}\r\n\r\nconst generateGuid = () => {\r\n    const array = new Uint32Array(4);\r\n    crypto.getRandomValues(array);\r\n\r\n    return `${toHex(array[0], 8)}-${toHex(array[1], 4)}-${toHex(array[2], 4)}-${toHex(array[3], 8)}`;\r\n}\r\n\r\nconst toHex = (value, length) => {\r\n    let hex = value.toString(16);\r\n    while (hex.length < length) {\r\n        hex = '0' + hex;\r\n    }\r\n    return hex;\r\n}\r\n\r\nconst minifyStyle = (input) =>{\r\n    let output = input;\r\n    output = output.replace(/\\/\\*[\\s\\S]*?\\*\\//g, '');\r\n    output = output.replace(/\\s+/g, ' ');\r\n    output = output.trim();\r\n    return output;\r\n}\r\n\r\n\r\n\n\n//# sourceURL=webpack://components/./src/utillities/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/github-button/index.js");
/******/ 	
/******/ })()
;