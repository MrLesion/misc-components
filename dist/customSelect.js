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

/***/ "./src/custom-select/index.js":
/*!************************************!*\
  !*** ./src/custom-select/index.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utillities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utillities */ \"./src/utillities/index.js\");\n﻿\r\n\r\nclass CustomSelect extends HTMLElement {\r\n    static formAssociated = true;\r\n\r\n    constructor () {\r\n        super();\r\n        this.shadow            = this.attachShadow( {\r\n            mode: 'open',\r\n            delegatesFocus: true\r\n        } );\r\n        this.name              = '';\r\n        this.default           = '';\r\n        this.search           = false;\r\n        this.height            = 40;\r\n        this.internals         = this.attachInternals();\r\n        this.selected          = {\r\n            value: '',\r\n            text: ''\r\n        };\r\n        const styleSheet       = document.createElement( 'style' );\r\n        const style            = `\r\n            :host {\r\n                position: relative;\r\n                height: 40px;\r\n                width:100%;\r\n                display:block;\r\n                font-family: Arial, Helvetica, sans-serif;\r\n                font-size: .95em;\r\n            }\r\n            :host:focus {\r\n              box-shadow: 0  0 6px rgba(0,0,0,0.5);\r\n            }\r\n            .custom-select-list {\r\n                position:absolute;\r\n                padding:0;\r\n                margin:0;\r\n                list-style:none;\r\n                overflow: hidden;\r\n                width:100%;\r\n                height: ${this.height}px;\r\n                border: 1px solid #ccc;\r\n                border-radius: 3px;\r\n                background-color:#f1f1f1;\r\n                box-shadow: 0 2px 0 rgba(0,0,0, 0);\r\n                transition: all .2s ease;\r\n                \r\n            }\r\n            .custom-select-list.open {\r\n                box-shadow: 0 1px 5px rgba(0,0,0, .2);\r\n                z-index: 9;\r\n            }\r\n            .custom-select-list li {\r\n                display:block;\r\n                padding:10px;\r\n                height: 20px;\r\n                cursor: pointer;\r\n                transition: all .2s ease;\r\n                background-color: transparent;\r\n            }\r\n            .custom-select-list li:hover {\r\n                background-color: #e1e1e1;\r\n            }\r\n            .custom-select-list li.custom-select-list-default {\r\n                border-bottom: 1px solid #ccc\r\n            }\r\n            .custom-select-list li.custom-select-list-default::after {\r\n                content: '\\u25BC';\r\n                position: absolute;\r\n                right: 10px;\r\n                top: 15px;\r\n                font-size: 10px;\r\n                color: currentColor;\r\n            }\r\n            .custom-select-list li.custom-select-list-default.error {\r\n                 box-shadow: inset 0 0 6px rgba(255,0,0,0.5);\r\n                  outline: 0;\r\n            }\r\n        `;\r\n        styleSheet.textContent = style;\r\n        window.document.addEventListener( 'DOMContentLoaded', () => {\r\n            this.tabIndex = 0;\r\n            if ( !this.hasAttribute( 'role' ) ) {\r\n                this.setAttribute( 'role', 'select' );\r\n            }\r\n            if ( this.hasAttribute( 'required' ) ) {\r\n                this.setAttribute( 'aria-valid', 'false' );\r\n            }\r\n            this.name                     = this.getAttribute( 'name' );\r\n            this.default                  = this.getAttribute( 'default' );\r\n            this.search                  = String(this.getAttribute( 'search' )) === 'true';\r\n            this.selected                 = {\r\n                value: '',\r\n                text: this.default\r\n            };\r\n            this.fakeSelect               = (0,_utillities__WEBPACK_IMPORTED_MODULE_0__.buildHtmlElement)( 'ul', { class: `custom-select-list custom-select-list-${this.name}` } );\r\n            this.defaultOption            = (0,_utillities__WEBPACK_IMPORTED_MODULE_0__.buildHtmlElement)( 'li', { class: 'custom-select-list-default' }, this.selected.text );\r\n            \r\n            if(this.search === true){\r\n                this.searcher               = (0,_utillities__WEBPACK_IMPORTED_MODULE_0__.buildHtmlElement)( 'div', { class: ``, contenteditable: true } );\r\n            }\r\n            const defaultSelectableOption = (0,_utillities__WEBPACK_IMPORTED_MODULE_0__.buildHtmlElement)( 'li', {}, this.default );\r\n            defaultSelectableOption.addEventListener( 'click', this.reset.bind( this ) );\r\n            this.defaultOption.addEventListener( 'click', () => {\r\n                this.toggle.call( this );\r\n            } );\r\n            this.fakeSelect.appendChild( this.defaultOption );\r\n\r\n            this.fakeSelect.appendChild( defaultSelectableOption );\r\n\r\n            const options = this.querySelectorAll( 'slot' );\r\n            options.forEach( ( option ) => {\r\n                const value      = option.getAttribute( 'value' );\r\n                const fakeOption = (0,_utillities__WEBPACK_IMPORTED_MODULE_0__.buildHtmlElement)( 'li', {}, option.textContent );\r\n                this.fakeSelect.appendChild( fakeOption );\r\n                fakeOption.addEventListener( 'click', () => {\r\n                    this.selected = {\r\n                        value: value,\r\n                        text: option.textContent\r\n                    };\r\n                    this.setOption.call( this );\r\n                } );\r\n            } );\r\n            this.shadow.appendChild( styleSheet );\r\n            this.shadow.appendChild( this.fakeSelect );\r\n            this.setValidity.call( this );\r\n        } );\r\n    }\r\n\r\n    setHeight () {\r\n        let height = this.fakeSelect.children.length * 40;\r\n        if ( this.fakeSelect.classList.contains( 'open' ) ) {\r\n            height = 40;\r\n        }\r\n        this.fakeSelect.style.height = `${height}px`;\r\n    }\r\n\r\n    toggle () {\r\n        this.setHeight();\r\n        this.fakeSelect.classList.toggle( 'open' );\r\n    }\r\n\r\n    reset () {\r\n        this.selected = {\r\n            value: '',\r\n            text: this.default\r\n        };\r\n        this.setOption.call( this );\r\n    }\r\n\r\n    setOption () {\r\n        this.testValidity.call( this );\r\n        this.internals.setFormValue( this.selected.value );\r\n        this.defaultOption.textContent = this.selected.text;\r\n        this.toggle.call( this );\r\n    }\r\n\r\n    testValidity () {\r\n        if ( !this.matches( ':disabled' ) && this.hasAttribute( 'required' ) && !this.selected.value ) {\r\n            this.internals.setValidity( { customError: true }, 'Required' );\r\n            this.focus();\r\n            this.defaultOption.classList.add( 'error' );\r\n        }\r\n        else {\r\n            this.internals.setValidity( {} );\r\n            this.defaultOption.classList.remove( 'error' );\r\n        }\r\n    }\r\n\r\n    setValidity () {\r\n        if ( !this.matches( ':disabled' ) && this.hasAttribute( 'required' ) && !this.selected.value ) {\r\n            this.internals.setValidity( { customError: true }, 'Required' );\r\n        }\r\n        else {\r\n            this.internals.setValidity( {} );\r\n        }\r\n    }\r\n}\r\n\r\ncustomElements.define( 'custom-select', CustomSelect );\n\n//# sourceURL=webpack://components/./src/custom-select/index.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/custom-select/index.js");
/******/ 	
/******/ })()
;