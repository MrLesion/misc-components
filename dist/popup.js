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

/***/ "./src/pop-up/index.js":
/*!*****************************!*\
  !*** ./src/pop-up/index.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utillities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utillities */ \"./src/utillities/index.js\");\n﻿\r\n\r\ncustomElements.define('pop-up', class extends HTMLElement {\r\n    constructor(){\r\n        super();\r\n        this.shadow = this.attachShadow({mode: 'open'});\r\n        const style = `\r\n            .pop-up-btn{\r\n                cursor: pointer;\r\n                position: fixed;\r\n                padding: .5em 1em;\r\n                background: red;\r\n                color: white;\r\n                opacity:1;\r\n                transition: all .5s ease;\r\n                border-radius: 3px;\r\n                box-shadow: 0 3px 5px 0px rgba(0,0,0, .25);\r\n            }\r\n            .pop-up-content{\r\n                position: fixed;\r\n                padding: .5em 1em;\r\n                background: #ccc;\r\n                opacity:1;\r\n                transition: all .5s ease;\r\n                min-height: 100px;\r\n                min-width: 200px;\r\n                border-radius: 3px;\r\n                box-shadow: 0 1px 1px 0px rgba(0,0,0, .5);\r\n            }\r\n            .position-0{\r\n                bottom: 1em;\r\n                right: 1em;\r\n            }\r\n            .position-1{\r\n                bottom: 1em;\r\n                left: 1em;\r\n            }\r\n            .pop-up-content.position-0{\r\n                bottom: .5em;\r\n                right: .5em;\r\n            }\r\n            .pop-up-content.position-1{\r\n                bottom: .5em;\r\n                left: .5em;\r\n            }\r\n        `;\r\n        const styleSheet = (0,_utillities__WEBPACK_IMPORTED_MODULE_0__.buildHtmlElement)('style', {}, style);\r\n        this.options = {\r\n            buttonText: 'Pop me',\r\n            position: 0,\r\n            wait: 100,\r\n            content: null\r\n        };\r\n        this.shadow.appendChild(styleSheet);\r\n    }\r\n    connectedCallback(){\r\n        this.setOptionsByAttributes();\r\n        window.document.addEventListener( 'DOMContentLoaded', () => {\r\n            this.setTemplate();\r\n            this.renderButton();\r\n        });\r\n    }\r\n    \r\n    setOptionsByAttributes(){\r\n        const optionNames = this.getAttributeNames();\r\n        optionNames.forEach((optionName) =>{\r\n            this.options[optionName] = this.getAttribute(optionName);\r\n        });\r\n    }\r\n\r\n    setTemplate(){\r\n        const template = this.querySelector('template');\r\n        this.options.content = template !== null ? template.content : (0,_utillities__WEBPACK_IMPORTED_MODULE_0__.buildHtmlElement)('span', {}, '[template missing]');\r\n    }\r\n    \r\n    renderButton(){\r\n        const button = (0,_utillities__WEBPACK_IMPORTED_MODULE_0__.buildHtmlElement)('a', {class: `pop-up-btn`}, this.options.buttonText);\r\n        button.onclick = this.renderContent.bind(this);\r\n        this.renderElement.call(this, button);\r\n    }\r\n    renderContent(){\r\n        console.log(this.options.content);\r\n        const content = (0,_utillities__WEBPACK_IMPORTED_MODULE_0__.buildHtmlElement)('div', {class: 'pop-up-content'});\r\n        content.appendChild(this.options.content);\r\n        this.renderElement.call(this, content);\r\n    }\r\n    renderElement(domElement){\r\n        domElement.style.opacity = 0;\r\n        this.shadow.appendChild(domElement);\r\n        const height = domElement.offsetHeight;\r\n        domElement.style.bottom = `-${height}px`;\r\n\r\n        setTimeout(() =>{\r\n            domElement.classList.add(`position-${this.options.position}`);\r\n            domElement.style = '';\r\n        }, this.options.wait);\r\n    }\r\n});\n\n//# sourceURL=webpack://components/./src/pop-up/index.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/pop-up/index.js");
/******/ 	
/******/ })()
;