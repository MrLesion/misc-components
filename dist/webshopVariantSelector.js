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

/***/ "./src/webshop/variant-selector/index.js":
/*!***********************************************!*\
  !*** ./src/webshop/variant-selector/index.js ***!
  \***********************************************/
/***/ (() => {

eval("﻿customElements.define('webshop-variant-selector', class extends HTMLElement {\r\n\r\n    static get observedAttributes() {\r\n        return ['value'];\r\n    }\r\n\r\n    get value() {\r\n        return this.getAttribute( 'value' );\r\n    }\r\n\r\n    set value( val ) {\r\n        this.setAttribute( 'value', val );\r\n    }\r\n\r\n    get label() {\r\n        return this.getAttribute( 'label' );\r\n    }\r\n    constructor(){\r\n        super();\r\n        this.options = this.querySelector('select');\r\n        this.options.addEventListener('change', this, false);\r\n        \r\n    }\r\n    connectedCallback(){\r\n        customElements.whenDefined('webshop-variant-combinations').then(() =>{\r\n            this.combinationsElement = this.closest('webshop-variant-combinations');\r\n        })\r\n    }\r\n\r\n    attributeChangedCallback(name, oldValue, newValue){\r\n        if (oldValue === null || oldValue === newValue) return;\r\n        if(name === 'value'){\r\n            this.querySelector('select').value = newValue;\r\n        }\r\n        console.log(`${name} changed from ${oldValue} to ${newValue}`);\r\n    }\r\n\r\n    handleEvent(event){\r\n        switch ( event.type ){\r\n            case 'change':\r\n                this.setVariant(event);\r\n                break;\r\n        }\r\n    }\r\n    setVariant(event){\r\n        this.value = event.target.value;\r\n        if(this.combinationsElement === undefined){\r\n            return alert('Missing parent element <webshop-variant-combinations>')\r\n        }\r\n        this.combinationsElement.dispatchEvent(new CustomEvent('variant.update'));\r\n    }\r\n});\n\n//# sourceURL=webpack://components/./src/webshop/variant-selector/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/webshop/variant-selector/index.js"]();
/******/ 	
/******/ })()
;