import Constants from './Constants.js';
import Emitter from './Emitter.js';
import ContentData from './ContentData.js';
import ContentImageManifest from './ContentImageManifest.js';
import ContentSpritesheetManifest from './ContentSpritesheetManifest.js';

let webFontObj = null;

function loadFontLoader(callback) {
	var loader = new PIXI.loaders.Loader();
	loader.add('loader', (location.protocol === 'https:' ? 'https:' : 'http:') + '//ajax.googleapis.com/ajax/libs/webfont/1/webfont.js');
	loader.load(function(loader, resources) {
		if (webFontObj) {
			callback();
			return;
		}
		
		eval(resources.loader.data);
		webFontObj = window.WebFont;
		window.WebFont = null;
		if (webFontObj) {
			callback();
		}
	});
}

function loadGoogleFont(fonts, callback) {
	if (!webFontObj) {
		loadFontLoader(function() {
			loadGoogleFont(fonts, callback);
		});
		return;
	}
	
	var c = 0;
	var cb = function() {
		if (++c === fonts.length) {
			callback();
		}
	}
	
	webFontObj.load({
		async: true,
		classes: false,
		google: {
			families: fonts
		},
		fontactive: cb,
		fontinactive: cb
	});
	/*
	webFontObj.load({
		async: true,
		classes: false,
		google: {
			families: fonts
		},
		active: callback,
		inactive: callback
	});
	*/
}

function loadAudioSprite(path, key, callback) {
	var loader = new PIXI.loaders.Loader();
	loader.add('loader', path);
	loader.load(function(loader, resources) {
		callback(key, resources.loader.data);
	});
}

function loadAsset(stateKey, eventName, errorEventName, manifest, basepath) {
	this._pixim[stateKey] = Constants.loadingState.Started;
	
	var self = this;
	var loaderCount = 0;
	var loadedLoaderCount = 0;
	var loaderData;
	var hasError = false;
	
	function successHandler() {
		if (++loadedLoaderCount < loaderCount) {
			return;
		}
		
		self._pixim[stateKey] = Constants.loadingState.Finished;
		self.emit(eventName);
		//self._epixim.emit(eventName);
		//self.emit(eventName);
	}
	
	function faildHandler(e) {
		self.emit(errorEventName, e);
		self.emit(Constants.events.loadedError, e);
		//self._epixim.emit(errorEventName, e);
		//self.emit(Constants.events.loadedError, e);
	}
	
	loaderCount = Object.keys(manifest).length;
	if (loaderCount === 0) {
		this._pixim[stateKey] = Constants.loadingState.Finished;
		this.emit(eventName);
		//this._epixim.emit(eventName);
		//this.emit(eventName);
		return;
	}
	
	for (var i in manifest) {
		manifest[i].load(basepath, this._pixim.resources, successHandler, faildHandler);
	}
}

function build(self, cb) {
	var root = Object.create(self._pixim.lib.root.prototype);
	self._pixim.data._pixim.root = root;
	self._pixim.data.fps = self._pixim.config.fps;
	self._pixim.lib.root.call(root, self._pixim.data);
	self._pixim.isBuilt = true;
	
	cb(root);
}

class LoaderData {
	constructor(loader, count) {
		this.loader = loader;
		this.count = count;
	}
}

class PiximStaticData {
	constructor(loader, count) {
		this.config = {
			fps: 60,
			width: 450,
			height: 800,
		};
		
		this.manifest = {};
		this.subManifest = {};
		//this.googleFonts = [];
		
		this.library = function() {};
	}
}

class PiximData {
	constructor(cls, basepath) {
		this.data = new ContentData();
		
		this.data._pixim.basepath = basepath;
		
		this.data._pixim.lib = this.lib = new cls._pixim.library();
		
		this.config = {
			fps: cls._pixim.config.fps,
			width: cls._pixim.config.width,
			height: cls._pixim.config.height,
		};
		
		this.data._pixim.fps = this.config.fps;
		this.data._pixim.width = this.config.width;
		this.data._pixim.height = this.config.height;
		
		this.manifests = {};
		for (var i in cls._pixim.manifest) {
			this.manifests[i] = cls._pixim.manifest[i].copy();
		}
		/*
		this.subManifests = {};
		for (var i in cls._pixim.subManifest) {
			this.subManifests[i] = cls._pixim.subManifest[i];
		}
		*/
		this.additionalManifests = {};
		
		/*
		this.googleFonts = [];
		for (var i = 0; i < cls._pixim.googleFonts.length; i++) {
			this.googleFonts.push(cls._pixim.googleFonts[i]);
		}
		*/
		
		this.data._pixim.vars = this.vars = {};
		this.data._pixim.resources = this.resources = {};
		
		this.preloadState = Constants.loadingState.None;
		this.postloadState = Constants.loadingState.None;
		this.unrequiredPreloadState = Constants.loadingState.None;
		this.unrequiredPostloadState = Constants.loadingState.None;
		this.isBuilt = false;
	}
}

const _contents = {};

export default class Pixim_Content extends Emitter {
	constructor(options) {
		super();
		
		options = options || {};
		options.preload = options.preload || false;
		options.basepath = options.basepath || '';
		
		this.basepath = options.basepath.replace(/([^/])$/, '$1/');
		this._pixim = new PiximData(this.constructor, this.basepath);
		
		if (options.preload) {
			this.preload();
		}
	}
	
	/**
	 * Get content.
	 * 
	 * @function Pixim.Content.getContent
	 * @param key {string}
	 * @return {Pixim.Content}
	 */
	static getContent(key) {
		return _contents[key] || null;
	}
	
	/**
	 * Remove content.
	 * 
	 * @function Pixim.Content.removeContent
	 * @param key {string}
	 */
	static removeContent(key) {
		delete(_contents[key]);
	}
	
	/**
	 * Initialize contents.
	 * 
	 * @function Pixim.Content.create
	 * @param [key] {string} Name when saving content.
	 * @return {Pixim.Content}
	 */
	static create(key) {
		class Pixim_ContentClone extends Pixim_Content {
			constructor(options) {
				super(options);
				if (!(this._pixim.data._pixim.lib.root instanceof Function)) {
					throw new Error('There is no library named "root" in the content.');
					return;
				}
			}
		}
		
		Object.defineProperties(Pixim_ContentClone, {
			_pixim: {
				value: new PiximStaticData()
			}
		});
		
		if (!key || key in _contents) {
			return Pixim_ContentClone;
		}
		
		return _contents[key] = Pixim_ContentClone;
	}
	
	/**
	 * Change the setting.
	 * 
	 * @function Pixim.Content.setConfig
	 * @param data {Pixim.ContentConfig} Config data.
	 */
	static setConfig(data) {
		var v;
		for (var i in data) {
			v = Math.max(1, data[i]);
			this._pixim.config[i] = v;
		}
	}
	
	/**
	 * @typedef Pixim.Content~ManifestData {object<string, string>}<br />
	 *     key: Asset name.<br />
	 *     value: Asset path.
	 */
	
	/**
	 * Define manifests of image.
	 * 
	 * @function Pixim.Content.defineImages
	 * @param data {Pixim.Content~ManifestData} Required manifest data.
	 * @param subData {Pixim.Content~ManifestData} Unrequired manifest data.
	 */
	static defineImages(data, subData) {
		this._pixim.manifest.images = this._pixim.manifest.images || new ContentImageManifest();
		this._pixim.manifest.images.add(data);
		/*
		this._pixim.subManifest.images = this._pixim.subManifest.images || new ContentSpritesheetManifest();
		this._pixim.subManifest.images.add(subData);
		*/
	}
	
	/**
	 * Define manifests of spritesheet.
	 * 
	 * @function Pixim.Content.defineSpritesheets
	 * @param data {Pixim.Content~ManifestData} Required manifest data.
	 * @param subData {Pixim.Content~ManifestData} Unrequired manifest data.
	 */
	static defineSpritesheets(data, subData) {
		this._pixim.manifest.spritesheets = this._pixim.manifest.spritesheets || new ContentSpritesheetManifest();
		this._pixim.manifest.spritesheets.add(data);
		/*
		this._pixim.subManifest.spritesheets = this._pixim.subManifest.spritesheets || new ContentSpritesheetManifest();
		this._pixim.subManifest.spritesheets.add(subData);
		*/
	}
	
	/**
	 * Define manifests of google font.
	 * 
	 * @function Pixim.Content.defineGoogleFonts
	 * @param fonts {array<string>} Google font names.
	 */
	static defineGoogleFonts(fonts) {
		var i;
		
		if (typeof fonts !== 'object') {
			fonts = [fonts];
		}
		
		if (fonts instanceof Array) {
			for (i = 0; i < fonts.length; i++) {
				this._pixim.googleFonts.push(fonts[i]);
			}
		} else {
			for (i in fonts) {
				this._pixim.googleFonts.push(fonts[i]);
			}
		}
	}
	
	/**
	 * Define libraries that is material of the content.<br />
	 * In the constructor named root, Pixim.Application passes a reference to Pixim.ContentData as an argument.<br />
	 * By giving this argument to the child further, you will be able to access the data freely from anywhere.
	 * ```
	 * var Test = Pixim.Content.create();
	 * Test.defineLibraries({
	 *     root: Class(function Root($) {
	 *         this.super();
	 *         this.addChild(new $.lib.child($));
	 *     }).extend(Pixim.Container)
	 * });
	 * ```
	 * 
	 * @function Pixim.Content.defineLibraries
	 * @param data {object<string, function(Pixim.ContentData)>} Library data.<br />
	 *     key: Library name.<br />
	 *     value: Class constructor.
	 */
	static defineLibraries(data) {
		for (var i in data) {
			this._pixim.library.prototype[i] = data[i];
		}
	}
	
	/**
	 * Manifest data to be preloaded(require).
	 * 
	 * @member Pixim.Content.manifests
	 * @readonly
	 * @return {object}
	 */
	get manifests() {
		return this._pixim.manifests;
	}
	
	set manifests(v) {
	}
	
	/**
	 * Manifest data to be postloaded.
	 * 
	 * @member Pixim.Content.additionalManifests
	 * @readonly
	 * @return {object}
	 */
	get additionalManifests() {
		return this._pixim.additionalManifests;
	}
	
	set additionalManifests(v) {
	}
	
	/**
	 * Get content width.
	 * 
	 * @function Pixim.Content#getWidth
	 * @return {number}
	 */
	getWidth() {
		return this._pixim.config.width;
	}
	
	/**
	 * Get content height.
	 * 
	 * @function Pixim.Content#getHeight
	 * @return {number}
	 */
	getHeight() {
		return this._pixim.config.height;
	}
	
	/**
	 * Whether content has been built.
	 * 
	 * @member Pixim.Content#isBuilt {bool}
	 * @readonly
	 */
	get isBuilt() {
		return this._pixim.isBuilt;
	}
	
	set isBuilt(v) {
	}
	
	/**
	 * State of assets preloading.
	 * 
	 * @member Pixim.Content#preloadState {Pixim.loadingState}
	 * @readonly
	 */
	get preloadState() {
		return this._pixim.preloadState;
	}
	
	set preloadState(v) {
	}
	
	/**
	 * Clear state of preload.
	 * 
	 * @function Pixim.Content#clearPreload
	 */
	clearPreload() {
		this._pixim.preloadState = Constants.loadingState.None;
	}
	
	/**
	 * State of assets postloading.
	 * 
	 * @member Pixim.Content#postloadState {Pixim.loadingState}
	 * @readonly
	 */
	get postloadState() {
		return this._pixim.postloadState;
	}
	
	set postloadState(v) {
	}
	
	/**
	 * Clear all additional manifests.
	 * 
	 * @function Pixim.Content#clearAdditionalManifest
	 */
	clearAdditionalManifest() {
		this._pixim.postloadState = Constants.loadingState.None;
		this._pixim.additionalManifests = {};
	}
	
	/**
	 * Add manifests of image.
	 * 
	 * @function Pixim.Content#addImages
	 * @param data {object<string, string>} Manifest data.<br />
	 *     key: Manifest name.<br />
	 *     value: Resource path.
	 */
	addImages(data) {
		if (this._pixim.postloadState !== Constants.loadingState.None) {
			this.clearAdditionalManifest();
		}
		
		this._pixim.additionalManifests.images = this._pixim.additionalManifests.images || new ContentImageManifest();
		this._pixim.additionalManifests.images.add(data);
	}
	
	/**
	 * Add manifests of spritesheet.
	 * 
	 * @function Pixim.Content#addSpritesheets
	 * @param data {object<string, string>} Manifest data.<br />
	 *     key: Manifest name.<br />
	 *     value: Resource path.
	 */
	addSpritesheets(data) {
		if (this._pixim.postloadState !== Constants.loadingState.None) {
			this.clearAdditionalManifest();
		}
		
		this._pixim.additionalManifests.spritesheets = this._pixim.additionalManifests.spritesheets || new ContentSpritesheetManifest();
		this._pixim.additionalManifests.spritesheets.add(data);
	}
	
	defineVars(data) {
		for (var i in data) {
			 this._pixim.vars[i] = data[i];
		}
	}
	
	/**
	 * Prepare content.
	 * 
	 * @function Pixim.Content#prepare
	 * @param cb {function}
	 * @param {Pixi.Container}
	 */
	prepare(cb) {
		var self = this;
		
		this.once(Constants.events.preloaded, function() {
			//self.unrequiredPreload();
			self.once(Constants.events.postloaded, function() {
				cb && cb();
			});
			this.postload();
		});
		
		//this.requiredPreload();
		this.preload();
	}
	
	/**
	 * Build content.
	 * 
	 * @function Pixim.Content#build
	 * @param cb {function}
	 * @param {Pixi.Container}
	 */
	build(cb) {
		if (this._pixim.postloadState !== Constants.loadingState.Finished) {
			var self = this;
			
			this.prepare(function() {
				build(self, cb);
			});
		} else {
			build(this, cb);
		}
	}
	
	/**
	 * Register stage container.
	 * 
	 * @function Pixim.Content#setStage
	 * @param stage {PIXI.Container}
	 */
	setStage(stage) {
		this._pixim.data._pixim.stage = stage;
	}
	
	/**
	 * Preloads assets.
	 * 
	 * @function Pixim.Content#preload
	 * @fire Pixim.events.requiredPreloaded
	 */
	preload() {
		var self = this;
		
		//var se = Constants.events.requiredPreloaded;
		//var ee = Constants.events.requiredPreloadedError;
		
		var se = Constants.events.preloaded;
		var ee = Constants.events.preloadedError;
		
		if (this._pixim.preloadState === Constants.loadingState.Finished) {
			this.emit(se);
			return;
		} else if (this._pixim.preloadState === Constants.loadingState.Started) {
			return;
		}
		
		loadAsset.call(this, 'preloadState', se, ee, this._pixim.manifests, this.basepath);
	}
	
	/**
	 * Postload srequired assets.
	 * 
	 * @function Pixim.Content#requiredPostload
	 * @fire Pixim.events.requiredPostloaded
	 */
	postload() {
		var self = this;
		
		//var se = Constants.events.requiredPostloaded;
		//var ee = Constants.events.requiredPostloadedError;
		
		var se = Constants.events.postloaded;
		var ee = Constants.events.postloadedError;
		
		if (this._pixim.postloadState === Constants.loadingState.Finished) {
			this.emit(se);
			return;
		} else if (this._pixim.postloadState === Constants.loadingState.Started) {
			return;
		}
		
		loadAsset.call(this, 'postloadState', se, ee, this._pixim.additionalManifests, '');
	}
	
	/**
	 * Destroy content and all assets.
	 * 
	 * @function Pixim.Content#destroy
	 */
	destroy() {
		this.clear();
		for (let i in this._pixim.resources.sounds) {
			this._pixim.resources.sounds[i].howl.unload();
		}
		for (let i in this._pixim.resources.spritesounds) {
			this._pixim.resources.spritesounds[i].howl.unload();
		}
	}
}