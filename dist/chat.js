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

/***/ "./src/chat/index.js":
/*!***************************!*\
  !*** ./src/chat/index.js ***!
  \***************************/
/***/ (() => {

eval("﻿const socket = new WebSocket('ws://127.0.0.1:5000');\r\n\r\nsocket.addEventListener('open', (event) => {\r\n    console.log('WebSocket connection opened:', event);\r\n});\r\n\r\nsocket.addEventListener('message', (event) => {\r\n    const outputDiv = document.getElementById('output');\r\n    outputDiv.innerHTML += '<p>' + event.data + '</p>';\r\n});\r\n\r\nsocket.addEventListener('close', (event) => {\r\n    console.log('WebSocket connection closed:', event);\r\n});\r\n\r\nfunction sendMessage() {\r\n    const inputElement = document.getElementById('input');\r\n    const message = inputElement.value;\r\n    socket.send(message);\r\n    inputElement.value = '';\r\n}\n\n//# sourceURL=webpack://components/./src/chat/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/chat/index.js"]();
/******/ 	
/******/ })()
;