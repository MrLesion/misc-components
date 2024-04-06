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

/***/ "./src/webshop/variant-combinations/index.js":
/*!***************************************************!*\
  !*** ./src/webshop/variant-combinations/index.js ***!
  \***************************************************/
/***/ (() => {

eval("﻿customElements.define('webshop-variant-combinations', class extends HTMLElement {\r\n\r\n    static get observedAttributes() {\r\n        return ['value'];\r\n    }\r\n\r\n    get value() {\r\n        return this.getAttribute( 'value' );\r\n    }\r\n\r\n    set value( val ) {\r\n        this.setAttribute( 'value', val );\r\n    }\r\n    constructor(){\r\n        super();\r\n        this.selectors = Array.from(this.querySelectorAll('webshop-variant-selector'));\r\n        \r\n    }\r\n    connectedCallback(){\r\n        customElements.whenDefined('webshop-variant-selector').then(() =>{\r\n            this.setSelectors();\r\n        });\r\n        this.addEventListener('variant.update', this, false);\r\n        this.querySelector('form').addEventListener('submit', this, false);\r\n    }\r\n\r\n    attributeChangedCallback(name, oldValue, newValue){\r\n        if (oldValue === null || oldValue === newValue) return;\r\n        console.log(`${name} changed from ${oldValue} to ${newValue}`);\r\n        if(name === 'value'){\r\n            this.updateFormFields();\r\n            this.fetchNewData();\r\n        }\r\n    }\r\n\r\n    handleEvent(event){\r\n        console.log(`Handle event: ${event.type}`);\r\n        switch ( event.type ){\r\n            case 'variant.update':\r\n                this.setCombination(event);\r\n                break;\r\n            case 'submit':\r\n                this.addToCart(event);\r\n        }\r\n    }\r\n    setSelectors(){\r\n        const currentCombination = this.value.split('.');\r\n        this.selectors.forEach((selector, index) =>{\r\n            selector.value = currentCombination[index];\r\n            selector.selectedIndex = index;\r\n        });\r\n        this.validateSelectors();\r\n    }\r\n    setCombination(){\r\n        this.value = this.selectors.map(vs => vs.value).join('.');\r\n        this.validateSelectors();\r\n    }\r\n\r\n    updateFormFields(){\r\n        this.querySelector('input[name=\"VariantId\"]').value = this.value;\r\n    }\r\n    \r\n    validateSelectors(){\r\n        const validCombinations = [\r\n            ['VO12', 'VO22'],\r\n            ['VO12', 'VO23'],\r\n            ['VO12', 'VO24'],\r\n            ['VO12', 'VO25'],\r\n            ['VO13', 'VO22'],\r\n            ['VO13', 'VO24'],\r\n            ['VO13', 'VO25'],\r\n            ['VO14', 'VO22'],\r\n            ['VO14', 'VO23'],\r\n            ['VO14', 'VO24'],\r\n            ['VO15', 'VO22'],\r\n            ['VO15', 'VO23'],\r\n            ['VO15', 'VO24'],\r\n            ['VO15', 'VO25']\r\n        ];\r\n\r\n        const selectors = this.selectors;\r\n\r\n        let current = null;\r\n        let map = {};\r\n        validCombinations.forEach(combination => {\r\n            \r\n            \r\n            if(current !== combination[0]){\r\n                current = combination[0];\r\n                map[combination[0]] = validCombinations.filter(v => v[0] === current ).map(v => v[1]);\r\n            }\r\n        });\r\n        \r\n        Object.keys(map).forEach((mapKey) =>{\r\n            const selectedValue = this.selectors[0].querySelector('select').value;\r\n            if(selectedValue === mapKey){\r\n                const possibleSelect = this.selectors[1].querySelector('select');\r\n                Array.from(possibleSelect.options).forEach((option) =>{\r\n                    option.disabled = !(map[mapKey].includes(option.value));\r\n                    console.log(`Validating ${mapKey}.${option.value} - should disable: ${!(map[mapKey].includes(option.value))}`);\r\n                })\r\n            }\r\n        })\r\n        \r\n    }\r\n    \r\n    \r\n    \r\n    fetchNewData(){\r\n        console.log(`fetch new data based upon ${this.value}`);\r\n       \r\n    }\r\n\r\n    addToCart(event){\r\n        event.preventDefault();\r\n        const formData = new FormData(event.target);\r\n        fetch('/', {\r\n            method: 'post',\r\n            body: formData\r\n        })\r\n    }\r\n});\n\n//# sourceURL=webpack://components/./src/webshop/variant-combinations/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/webshop/variant-combinations/index.js"]();
/******/ 	
/******/ })()
;