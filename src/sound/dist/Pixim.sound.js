/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/sound/src/entry.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/sound/src/Sound.js":
/*!********************************!*\
  !*** ./src/sound/src/Sound.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\n/**\r\n * @constructor Pixim~Sound\r\n * @classdesc Manifest of sounds.\r\n * @param howl {Howler}\r\n */\nvar Pixim_Sound = function () {\n\tfunction Pixim_Sound(howl) {\n\t\t_classCallCheck(this, Pixim_Sound);\n\n\t\tthis.howl = howl;\n\t\tthis._instanceIds = [];\n\t}\n\n\t_createClass(Pixim_Sound, [{\n\t\tkey: \"play\",\n\t\tvalue: function play() {\n\t\t\tvar id = this.howl.play.apply(this.howl, arguments);\n\t\t\tthis._instanceIds.push(id);\n\n\t\t\treturn id;\n\t\t}\n\t}, {\n\t\tkey: \"mute\",\n\t\tvalue: function mute() {\n\t\t\tthis.howl.mute.apply(this.howl, arguments);\n\t\t}\n\t}, {\n\t\tkey: \"loop\",\n\t\tvalue: function loop() {\n\t\t\tthis.howl.loop.apply(this.howl, arguments);\n\t\t}\n\t}, {\n\t\tkey: \"volume\",\n\t\tvalue: function volume() {\n\t\t\tthis.howl.volume.apply(this.howl, arguments);\n\t\t}\n\t}, {\n\t\tkey: \"pause\",\n\t\tvalue: function pause() {\n\t\t\tthis.howl.pause.apply(this.howl, arguments);\n\t\t}\n\t}, {\n\t\tkey: \"stop\",\n\t\tvalue: function stop(id) {\n\t\t\tif (id) {\n\t\t\t\tthis.howl.stop(id);\n\t\t\t\treturn;\n\t\t\t}\n\n\t\t\tvar p = this._instanceIds;\n\t\t\tfor (var i = 0; i < p.length; i++) {\n\t\t\t\tthis.howl.stop(p[i]);\n\t\t\t}\n\t\t}\n\t}], [{\n\t\tkey: \"create\",\n\t\tvalue: function create(key, data, cb, ecb) {\n\t\t\tdata = data || {};\n\n\t\t\tdata.onload = function () {\n\t\t\t\tcb(key, new Sound(this));\n\t\t\t};\n\n\t\t\tdata.onloaderror = function (e) {\n\t\t\t\tvar ev = new Pixim.Event(Pixim.events.soundLoadedError);\n\t\t\t\tev.detail = e;\n\t\t\t\tecb(ev);\n\n\t\t\t\tcb(key, new Sound(this));\n\t\t\t};\n\n\t\t\tnew Howl(data);\n\t\t}\n\t}]);\n\n\treturn Pixim_Sound;\n}();\n\nexports.default = Pixim_Sound;\n\n//# sourceURL=webpack:///./src/sound/src/Sound.js?");

/***/ }),

/***/ "./src/sound/src/entry.js":
/*!********************************!*\
  !*** ./src/sound/src/entry.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _Sound = __webpack_require__(/*! ./Sound.js */ \"./src/sound/src/Sound.js\");\n\nvar _Sound2 = _interopRequireDefault(_Sound);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n/*!\r\n * Pixim.sound.js\r\n * \r\n * @requires Pixim.js 2.0.0\r\n * @requires howler.core.js v2.0.1\r\n * @author makazu.mori@gmail.com (tawaship)\r\n * @copylight (c) tawaship\r\n * @license MIT License\r\n */\nObject.defineProperties(Pixim, {\n  Sound: {\n    value: _Sound2.default\n  }\n});\n\n//# sourceURL=webpack:///./src/sound/src/entry.js?");

/***/ })

/******/ });