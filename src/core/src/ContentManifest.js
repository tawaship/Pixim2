/**
 * @constructor Pixim~ContentManifest
 * @classdesc Class related to manifest by type of Pixim.Content.
 */
export default class Pixim_ContentManifest {
	constructor() {
		this._data = {};
	}
	
	/**
	 * Registered manifests.
	 * 
	 * @function Pixim~ContentImageManifest#add
	 * @param data {object<string, string>} Defined manifests.
	 */
	add(data) {
		for (var i in data) {
			this._data[i] = data[i];
		}
	}
	
	/**
	 * @typedef Pixim.ContentManifestErrorCallback {function}
	 * @param res {Pixim.Event} Error event.
	 */
	
	/**
	 * Load registered assets.
	 * 
	 * @function Pixim~ContentManifest#load
	 * @abstract
	 * @param basepath {string} Basement directory path of assets.
	 * @param contentResources {object}
	 * @param cb {function} Callback when assets loaded.
	 * @param ecb {Pixim.ContentManifestErrorCallback} Callback when error of loading assets.
	 */
	load(basepath, contentResources, cb, ecb) {
	}
	
	/**
	 * Copy manifests.
	 * 
	 * @function Pixim~ContentManifest#copy
	 */
	copy() {
		var res = new this.constructor();
		for (var i in this._data) {
			res._data[i] = this._data[i];
		}
		
		return res;
	}
	
	/**
	 * Normalize asset path.
	 * 
	 * @function Pixim~ContentImageManifest#_normalize
	 * @protected
	 * @param path {string} Asset path.
	 * @param basepath {string} Basement directory path of assets.
	 * @return {string}
	 */
	_normalize(path, basepath) {
		if (path.indexOf('http://') === 0 || path.indexOf('https://') === 0) {
			return path;
		} else {
			return basepath + path;
		}
	}
}