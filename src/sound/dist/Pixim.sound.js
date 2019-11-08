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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/entry.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/ContentSoundManifest.js":
/*!*************************************!*\
  !*** ./src/ContentSoundManifest.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _Sound = __webpack_require__(/*! ./Sound.js */ \"./src/Sound.js\");\n\nvar _Sound2 = _interopRequireDefault(_Sound);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\n/**\r\n * @constructor Pixim~ContentSoundManifest\r\n * @classdesc Manifest of sounds.\r\n * @extends Pixim~ContentManifest\r\n */\nvar Pixim_ContentSoundManifest = function (_Pixim$ContentManifes) {\n\t_inherits(Pixim_ContentSoundManifest, _Pixim$ContentManifes);\n\n\tfunction Pixim_ContentSoundManifest() {\n\t\t_classCallCheck(this, Pixim_ContentSoundManifest);\n\n\t\treturn _possibleConstructorReturn(this, (Pixim_ContentSoundManifest.__proto__ || Object.getPrototypeOf(Pixim_ContentSoundManifest)).apply(this, arguments));\n\t}\n\n\t_createClass(Pixim_ContentSoundManifest, [{\n\t\tkey: 'load',\n\n\t\t/**\r\n   * Load registered assets.\r\n   * \r\n   * @function Pixim~ContentSoundManifest#load\r\n   * @override\r\n   * @see Pixim~ContentManifest#load\r\n   */\n\t\tvalue: function load(basepath, contentResources, cb, ecb) {\n\t\t\tvar manifest = this._data;\n\n\t\t\tif (Object.keys(manifest).length === 0) {\n\t\t\t\tcb();\n\t\t\t\treturn;\n\t\t\t}\n\n\t\t\tvar p = contentResources.sounds = contentResources.sounds || {};\n\n\t\t\tfunction handler(key, howl) {\n\t\t\t\tp[key] = howl;\n\n\t\t\t\tif (++loadedCount < loadCount) {\n\t\t\t\t\treturn;\n\t\t\t\t}\n\n\t\t\t\tcb();\n\t\t\t}\n\n\t\t\tvar loader = new PIXI.loaders.Loader();\n\t\t\tvar loadCount = 0;\n\t\t\tvar loadedCount = 0;\n\n\t\t\tfor (var i in manifest) {\n\t\t\t\tif (!manifest[i]) {\n\t\t\t\t\tcontinue;\n\t\t\t\t}\n\n\t\t\t\t++loadCount;\n\t\t\t}\n\n\t\t\tfor (var i in manifest) {\n\t\t\t\tif (!manifest[i]) {\n\t\t\t\t\tcontinue;\n\t\t\t\t}\n\n\t\t\t\t_Sound2.default.create(i, { src: this._normalize(manifest[i], basepath) }, handler, ecb);\n\t\t\t}\n\t\t}\n\t}]);\n\n\treturn Pixim_ContentSoundManifest;\n}(Pixim.ContentManifest);\n\nexports.default = Pixim_ContentSoundManifest;\n\n\nObject.defineProperties(Pixim.Content, {\n\t/**\r\n  * Define manifests of sound.\r\n  * \r\n  * @function Pixim.Content.defineSounds\r\n  * @param data {Pixim.Content~ManifestData} Required manifest data.\r\n  * @param subData {Pixim.Content~ManifestData} Unrequired manifest data.\r\n  */\n\tdefineSounds: {\n\t\tvalue: function value(data, subData) {\n\t\t\tthis._pixim.manifest.sounds = this._pixim.manifest.sounds || new Pixim_ContentSoundManifest();\n\t\t\tthis._pixim.manifest.sounds.add(data);\n\t\t\t/*\r\n   this._pixim.subManifest.sounds = this._pixim.subManifest.sounds || new ContentSoundManifest();\r\n   this._pixim.subManifest.sounds.add(subData);\r\n   */\n\t\t}\n\t}\n});\n\nObject.defineProperties(Pixim.Content.prototype, {\n\t/**\r\n  * Add manifests of sound.\r\n  * \r\n  * @function Pixim.Content#addSounds\r\n  * @param data {Pixim.Content~ManifestData} Required manifest data.\r\n  */\n\taddSounds: {\n\t\tvalue: function value(data) {\n\t\t\tif (this._pixim.postloadState !== Pixim.loadingState.None) {\n\t\t\t\tthis.clearAdditionalManifest();\n\t\t\t}\n\n\t\t\tthis._pixim.additionalManifests.sounds = this._pixim.additionalManifests.sounds || new Pixim_ContentSoundManifest();\n\t\t\tthis._pixim.additionalManifests.sounds.add(data);\n\t\t}\n\t}\n});\n\nObject.defineProperties(Pixim.ContentData.prototype, {\n\t/**\r\n  * Load sounds.\r\n  * \r\n  * @function Pixim.ContentData#loadSounds\r\n  * @param data {Pixim.Content~ManifestData}\r\n  * @param cb {function}\r\n  * @param ecb {function}\r\n  */\n\tloadSounds: {\n\t\tvalue: function value(data, cb, ecb) {\n\t\t\tvar c = new Pixim_ContentSoundManifest();\n\t\t\tvar p = this._pixim;\n\t\t\tc.add(data);\n\n\t\t\tvar isError = false;\n\t\t\tc.load(p.basepath, p.resources, function () {\n\t\t\t\tif (isError) {\n\t\t\t\t\treturn;\n\t\t\t\t}\n\n\t\t\t\tcb && cb();\n\t\t\t}, function () {\n\t\t\t\tisError = true;\n\t\t\t\tecb && ecb();\n\t\t\t});\n\t\t}\n\t}\n});\n\nObject.defineProperties(Pixim.events, {\n\t/**\r\n  * Fires when a sound loading error occurs.\r\n  * @event Pixim.events.soundLoadedError\r\n  */\n\tsoundLoadedError: {\n\t\tvalue: 'soundLoadedError'\n\t}\n});\n\n//# sourceURL=webpack:///./src/ContentSoundManifest.js?");

/***/ }),

/***/ "./src/ContentSpritesoundManifest.js":
/*!*******************************************!*\
  !*** ./src/ContentSpritesoundManifest.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _Sound = __webpack_require__(/*! ./Sound.js */ \"./src/Sound.js\");\n\nvar _Sound2 = _interopRequireDefault(_Sound);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nfunction loadAudioSprite(path, key, cb) {\n\tvar loader = new PIXI.loaders.Loader();\n\tloader.add('loader', path);\n\tloader.load(function (loader, resources) {\n\t\tcb(key, resources.loader.data);\n\t});\n}\n\n/**\r\n * @constructor Pixim~ContentSpritesoundManifest\r\n * @classdesc Manifest of spritesounds.\r\n * @requires howler.core.js v2.0.1\r\n * @extends Pixim~ContentManifest\r\n */\n\nvar Pixim_ContentSpritesoundManifest = function (_Pixim$ContentManifes) {\n\t_inherits(Pixim_ContentSpritesoundManifest, _Pixim$ContentManifes);\n\n\tfunction Pixim_ContentSpritesoundManifest() {\n\t\t_classCallCheck(this, Pixim_ContentSpritesoundManifest);\n\n\t\treturn _possibleConstructorReturn(this, (Pixim_ContentSpritesoundManifest.__proto__ || Object.getPrototypeOf(Pixim_ContentSpritesoundManifest)).apply(this, arguments));\n\t}\n\n\t_createClass(Pixim_ContentSpritesoundManifest, [{\n\t\tkey: 'load',\n\n\t\t/**\r\n   * Load registered assets.\r\n   * \r\n   * @function Pixim~ContentSpritesoundManifest#load\r\n   * @override\r\n   * @see Pixim~ContentManifest#load\r\n   */\n\t\tvalue: function load(basepath, contentResources, cb, ecb) {\n\t\t\tvar manifest = this._data;\n\n\t\t\tif (Object.keys(manifest).length === 0) {\n\t\t\t\tcb();\n\t\t\t\treturn;\n\t\t\t}\n\n\t\t\tvar p = contentResources.spritesounds = contentResources.spritesounds || {};\n\n\t\t\tfunction handler(key, howl) {\n\t\t\t\tp[key] = howl;\n\n\t\t\t\tif (++loadedCount < loadCount) {\n\t\t\t\t\treturn;\n\t\t\t\t}\n\n\t\t\t\tcb();\n\t\t\t}\n\n\t\t\tvar loader = new PIXI.loaders.Loader();\n\t\t\tvar loadCount = 0;\n\t\t\tvar loadedCount = 0;\n\t\t\tvar self = this;\n\n\t\t\tfor (var i in manifest) {\n\t\t\t\tif (!manifest[i]) {\n\t\t\t\t\tcontinue;\n\t\t\t\t}\n\n\t\t\t\t++loadCount;\n\t\t\t}\n\n\t\t\tfor (var i in manifest) {\n\t\t\t\tif (!manifest[i]) {\n\t\t\t\t\tcontinue;\n\t\t\t\t}\n\n\t\t\t\tloadAudioSprite(this._normalize(manifest[i], basepath), i, function (key, data) {\n\t\t\t\t\tvar ext;\n\t\t\t\t\tdata = data || {};\n\n\t\t\t\t\tif (!data.src) {\n\t\t\t\t\t\t_Sound2.default.create(key, { src: '.mp3' }, handler, ecb);\n\t\t\t\t\t\treturn;\n\t\t\t\t\t}\n\n\t\t\t\t\tfor (var j = 0; j < data.src.length; j++) {\n\t\t\t\t\t\text = data.src[j].split('.');\n\t\t\t\t\t\tdata.src[j] = self._normalize(manifest[key], basepath).replace('.json', '.' + ext[ext.length - 1]);\n\t\t\t\t\t}\n\n\t\t\t\t\t_Sound2.default.create(key, data, handler, ecb);\n\t\t\t\t});\n\t\t\t}\n\t\t}\n\t}]);\n\n\treturn Pixim_ContentSpritesoundManifest;\n}(Pixim.ContentManifest);\n\nexports.default = Pixim_ContentSpritesoundManifest;\n\n\nObject.defineProperties(Pixim.Content, {\n\t/**\r\n  * Define manifests of audio sprite.\r\n  * \r\n  * @function Pixim.Content.defineSpritesounds\r\n  * @param data {Pixim.Content~ManifestData} Required manifest data.\r\n  * @param subData {Pixim.Content~ManifestData} Unrequired manifest data.\r\n  */\n\tdefineSpritesounds: {\n\t\tvalue: function value(data, subData) {\n\t\t\tthis._pixim.manifest.spritesounds = this._pixim.manifest.spritesounds || new Pixim_ContentSpritesoundManifest();\n\t\t\tthis._pixim.manifest.spritesounds.add(data);\n\t\t\t/*\r\n   this._pixim.subManifest.spritesounds = this._pixim.subManifest.spritesounds || new ContentSpritesoundManifest();\r\n   this._pixim.subManifest.spritesounds.add(subData);\r\n   */\n\t\t}\n\t}\n});\n\nObject.defineProperties(Pixim.Content.prototype, {\n\t/**\r\n  * Add manifests of audio sprite.\r\n  * \r\n  * @function Pixim.Content#addSpritesounds\r\n  * @param data {Pixim.Content~ManifestData} Required manifest data.\r\n  */\n\taddSpritesounds: {\n\t\tvalue: function value(data) {\n\t\t\tif (this._pixim.postloadState !== Pixim.loadingState.None) {\n\t\t\t\tthis.clearAdditionalManifest();\n\t\t\t}\n\n\t\t\tthis._pixim.additionalManifests.spritesounds = this._pixim.additionalManifests.spritesounds || new Pixim_ContentSpritesoundManifest();\n\t\t\tthis._pixim.additionalManifests.spritesounds.add(data);\n\t\t}\n\t}\n});\n\nObject.defineProperties(Pixim.ContentData.prototype, {\n\t/**\r\n  * Load spritesounds.\r\n  * \r\n  * @function Pixim.ContentData#loadSpritesounds\r\n  * @param data {Pixim.Content~ManifestData}\r\n  * @param cb {function}\r\n  * @param ecb {function}\r\n  */\n\tloadSpritesounds: {\n\t\tvalue: function value(data, cb, ecb) {\n\t\t\tvar c = new Pixim_ContentSpritesoundManifest();\n\t\t\tvar p = this._pixim;\n\t\t\tc.add(data);\n\n\t\t\tvar isError = false;\n\t\t\tc.load(p.basepath, p.resources, function () {\n\t\t\t\tif (isError) {\n\t\t\t\t\treturn;\n\t\t\t\t}\n\n\t\t\t\tcb && cb();\n\t\t\t}, function () {\n\t\t\t\tisError = true;\n\t\t\t\tecb && ecb();\n\t\t\t});\n\t\t}\n\t}\n});\n\nObject.defineProperties(Pixim.events, {\n\t/**\r\n  * Fires when a spritesound loading error occurs.\r\n  * @event Pixim.events.spritesoundLoadedError\r\n  */\n\tspritesoundLoadedError: {\n\t\tvalue: 'spritesoundLoadedError'\n\t}\n});\n\n//# sourceURL=webpack:///./src/ContentSpritesoundManifest.js?");

/***/ }),

/***/ "./src/Sound.js":
/*!**********************!*\
  !*** ./src/Sound.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\n/**\r\n * @constructor Pixim~Sound\r\n * @classdesc Manifest of sounds.\r\n * @param howl {Howler}\r\n */\nvar Pixim_Sound = function () {\n\tfunction Pixim_Sound(howl) {\n\t\t_classCallCheck(this, Pixim_Sound);\n\n\t\tthis.howl = howl;\n\t}\n\n\t_createClass(Pixim_Sound, [{\n\t\tkey: \"play\",\n\t\tvalue: function play() {\n\t\t\treturn this.howl.play.apply(this.howl, arguments);\n\t\t}\n\t}, {\n\t\tkey: \"mute\",\n\t\tvalue: function mute() {\n\t\t\treturn this.howl.mute.apply(this.howl, arguments);\n\t\t}\n\t}, {\n\t\tkey: \"loop\",\n\t\tvalue: function loop() {\n\t\t\treturn this.howl.loop.apply(this.howl, arguments);\n\t\t}\n\t}, {\n\t\tkey: \"volume\",\n\t\tvalue: function volume() {\n\t\t\treturn this.howl.volume.apply(this.howl, arguments);\n\t\t}\n\t}, {\n\t\tkey: \"pause\",\n\t\tvalue: function pause() {\n\t\t\treturn this.howl.pause.apply(this.howl, arguments);\n\t\t}\n\t}, {\n\t\tkey: \"stop\",\n\t\tvalue: function stop() {\n\t\t\treturn this.howl.stop.apply(this.howl, arguments);\n\t\t}\n\t}], [{\n\t\tkey: \"create\",\n\t\tvalue: function create(key, data, cb, ecb) {\n\t\t\tdata = data || {};\n\n\t\t\tdata.onload = function () {\n\t\t\t\tcb(key, new Pixim_Sound(this));\n\t\t\t};\n\n\t\t\tdata.onloaderror = function (e) {\n\t\t\t\tvar ev = new Pixim.Event(Pixim.events.soundLoadedError);\n\t\t\t\tev.detail = e;\n\t\t\t\tecb(ev);\n\n\t\t\t\tcb(key, new Pixim_Sound(this));\n\t\t\t};\n\n\t\t\tnew Howl(data);\n\t\t}\n\t}, {\n\t\tkey: \"muteAll\",\n\t\tvalue: function muteAll(isMute) {}\n\t}]);\n\n\treturn Pixim_Sound;\n}();\n\nexports.default = Pixim_Sound;\n\n//# sourceURL=webpack:///./src/Sound.js?");

/***/ }),

/***/ "./src/entry.js":
/*!**********************!*\
  !*** ./src/entry.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _Sound = __webpack_require__(/*! ./Sound.js */ \"./src/Sound.js\");\n\nvar _Sound2 = _interopRequireDefault(_Sound);\n\n__webpack_require__(/*! ./ContentSoundManifest.js */ \"./src/ContentSoundManifest.js\");\n\n__webpack_require__(/*! ./ContentSpritesoundManifest.js */ \"./src/ContentSpritesoundManifest.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n/*!\r\n * Pixim.sound.js\r\n * \r\n * @requires Pixim.js 2.0.0\r\n * @requires howler.core.js v2.0.1\r\n * @author makazu.mori@gmail.com (tawaship)\r\n * @copylight (c) tawaship\r\n * @license MIT License\r\n */\nObject.defineProperties(Pixim, {\n  Sound: {\n    value: _Sound2.default\n  }\n});\n\n//# sourceURL=webpack:///./src/entry.js?");

/***/ })

/******/ });