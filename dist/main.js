/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _scripts_game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scripts/game */ \"./src/scripts/game.js\");\n\ndocument.addEventListener('DOMContentLoaded', function () {\n  var g = new _scripts_game__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n  g.animate(); // Handling window resize logic\n\n  window.addEventListener('resize', onWindowResize, false);\n\n  function onWindowResize() {\n    // setting camera frustrum (basically viewport/how big the screen is)\n    g.camera.aspect = window.innerWidth / window.innerHeight; // necessary after updating the aspect of our camera field\n\n    g.camera.updateProjectionMatrix();\n    g.renderer.setSize(window.innerWidth, window.innerHeight);\n    g.animate();\n  }\n\n  ;\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaW5kZXguanMuanMiLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUdBQyxRQUFRLENBQUNDLGdCQUFULENBQTBCLGtCQUExQixFQUE4QyxZQUFNO0FBQ2hELE1BQU1DLENBQUMsR0FBRyxJQUFJSCxxREFBSixFQUFWO0FBQ0FHLEVBQUFBLENBQUMsQ0FBQ0MsT0FBRixHQUZnRCxDQUloRDs7QUFDQUMsRUFBQUEsTUFBTSxDQUFDSCxnQkFBUCxDQUF3QixRQUF4QixFQUFrQ0ksY0FBbEMsRUFBa0QsS0FBbEQ7O0FBRUEsV0FBU0EsY0FBVCxHQUEwQjtBQUN0QjtBQUNBSCxJQUFBQSxDQUFDLENBQUNJLE1BQUYsQ0FBU0MsTUFBVCxHQUFrQkgsTUFBTSxDQUFDSSxVQUFQLEdBQW1CSixNQUFNLENBQUNLLFdBQTVDLENBRnNCLENBSXRCOztBQUNBUCxJQUFBQSxDQUFDLENBQUNJLE1BQUYsQ0FBU0ksc0JBQVQ7QUFDQVIsSUFBQUEsQ0FBQyxDQUFDUyxRQUFGLENBQVdDLE9BQVgsQ0FBbUJSLE1BQU0sQ0FBQ0ksVUFBMUIsRUFBc0NKLE1BQU0sQ0FBQ0ssV0FBN0M7QUFDQVAsSUFBQUEsQ0FBQyxDQUFDQyxPQUFGO0FBQ0g7O0FBQUE7QUFFSixDQWpCRCIsInNvdXJjZXMiOlsid2VicGFjazovL05vSGVzaS8uL3NyYy9pbmRleC5qcz9iNjM1Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBHYW1lIGZyb20gXCIuL3NjcmlwdHMvZ2FtZVwiO1xyXG5cclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XHJcbiAgICBjb25zdCBnID0gbmV3IEdhbWUoKTtcclxuICAgIGcuYW5pbWF0ZSgpO1xyXG5cclxuICAgIC8vIEhhbmRsaW5nIHdpbmRvdyByZXNpemUgbG9naWNcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBvbldpbmRvd1Jlc2l6ZSwgZmFsc2UpO1xyXG4gICAgXHJcbiAgICBmdW5jdGlvbiBvbldpbmRvd1Jlc2l6ZSgpIHtcclxuICAgICAgICAvLyBzZXR0aW5nIGNhbWVyYSBmcnVzdHJ1bSAoYmFzaWNhbGx5IHZpZXdwb3J0L2hvdyBiaWcgdGhlIHNjcmVlbiBpcylcclxuICAgICAgICBnLmNhbWVyYS5hc3BlY3QgPSB3aW5kb3cuaW5uZXJXaWR0aC8gd2luZG93LmlubmVySGVpZ2h0O1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIG5lY2Vzc2FyeSBhZnRlciB1cGRhdGluZyB0aGUgYXNwZWN0IG9mIG91ciBjYW1lcmEgZmllbGRcclxuICAgICAgICBnLmNhbWVyYS51cGRhdGVQcm9qZWN0aW9uTWF0cml4KCk7XHJcbiAgICAgICAgZy5yZW5kZXJlci5zZXRTaXplKHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQpOyBcclxuICAgICAgICBnLmFuaW1hdGUoKTtcclxuICAgIH07XHJcbiAgICBcclxufSk7XHJcblxyXG5cclxuIl0sIm5hbWVzIjpbIkdhbWUiLCJkb2N1bWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJnIiwiYW5pbWF0ZSIsIndpbmRvdyIsIm9uV2luZG93UmVzaXplIiwiY2FtZXJhIiwiYXNwZWN0IiwiaW5uZXJXaWR0aCIsImlubmVySGVpZ2h0IiwidXBkYXRlUHJvamVjdGlvbk1hdHJpeCIsInJlbmRlcmVyIiwic2V0U2l6ZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/index.js\n");

/***/ }),

/***/ "./src/scripts/game.js":
/*!*****************************!*\
  !*** ./src/scripts/game.js ***!
  \*****************************/
/***/ (function() {

throw new Error("Module build failed (from ./node_modules/babel-loader/lib/index.js):\nSyntaxError: /mnt/c/Users/farza/Documents/Projects/NoHesi/src/scripts/game.js: 'Const declarations' require an initialization value. (410:30)\n\n\u001b[0m \u001b[90m 408 |\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m 409 |\u001b[39m                     \u001b[90m// Prevents car from spawning too close to player before they reach a certain score\u001b[39m\u001b[0m\n\u001b[0m\u001b[31m\u001b[1m>\u001b[22m\u001b[39m\u001b[90m 410 |\u001b[39m                     \u001b[36mconst\u001b[39m min2\u001b[33m;\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m     |\u001b[39m                               \u001b[31m\u001b[1m^\u001b[22m\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m 411 |\u001b[39m                     \u001b[36mif\u001b[39m (\u001b[36mthis\u001b[39m\u001b[33m.\u001b[39mscore \u001b[33m>\u001b[39m \u001b[35m4000\u001b[39m) { \u001b[0m\n\u001b[0m \u001b[90m 412 |\u001b[39m                         min2 \u001b[33m=\u001b[39m \u001b[33mMath\u001b[39m\u001b[33m.\u001b[39mfloor(\u001b[35m250\u001b[39m)\u001b[33m;\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m 413 |\u001b[39m                     }\u001b[36melse\u001b[39m {\u001b[0m\n    at Parser._raise (/mnt/c/Users/farza/Documents/Projects/NoHesi/node_modules/@babel/parser/lib/index.js:541:17)\n    at Parser.raiseWithData (/mnt/c/Users/farza/Documents/Projects/NoHesi/node_modules/@babel/parser/lib/index.js:534:17)\n    at Parser.raise (/mnt/c/Users/farza/Documents/Projects/NoHesi/node_modules/@babel/parser/lib/index.js:495:17)\n    at Parser.parseVar (/mnt/c/Users/farza/Documents/Projects/NoHesi/node_modules/@babel/parser/lib/index.js:13813:18)\n    at Parser.parseVarStatement (/mnt/c/Users/farza/Documents/Projects/NoHesi/node_modules/@babel/parser/lib/index.js:13623:10)\n    at Parser.parseStatementContent (/mnt/c/Users/farza/Documents/Projects/NoHesi/node_modules/@babel/parser/lib/index.js:13208:21)\n    at Parser.parseStatement (/mnt/c/Users/farza/Documents/Projects/NoHesi/node_modules/@babel/parser/lib/index.js:13139:17)\n    at Parser.parseBlockOrModuleBlockBody (/mnt/c/Users/farza/Documents/Projects/NoHesi/node_modules/@babel/parser/lib/index.js:13728:25)\n    at Parser.parseBlockBody (/mnt/c/Users/farza/Documents/Projects/NoHesi/node_modules/@babel/parser/lib/index.js:13719:10)\n    at Parser.parseBlock (/mnt/c/Users/farza/Documents/Projects/NoHesi/node_modules/@babel/parser/lib/index.js:13703:10)");

/***/ }),

/***/ "./src/index.scss":
/*!************************!*\
  !*** ./src/index.scss ***!
  \************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaW5kZXguc2Nzcy5qcyIsIm1hcHBpbmdzIjoiO0FBQUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9Ob0hlc2kvLi9zcmMvaW5kZXguc2Nzcz85NzQ1Il0sInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/index.scss\n");

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
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	__webpack_require__("./src/index.js");
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.scss");
/******/ 	
/******/ })()
;