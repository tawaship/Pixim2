import Sound from './Sound.js';

function loadAudioSprite(path, key, cb) {
	var loader = new PIXI.loaders.Loader();
	loader.add('loader', path);
	loader.load(function(loader, resources) {
		cb(key, resources.loader.data);
	});
}

/**
 * @constructor Pixim~ContentSpritesoundManifest
 * @classdesc Manifest of spritesounds.
 * @requires howler.core.js v2.0.1
 * @extends Pixim~ContentManifest
 */
export default class Pixim_ContentSpritesoundManifest extends Pixim.ContentManifest {
	/**
	 * Load registered assets.
	 * 
	 * @function Pixim~ContentSpritesoundManifest#load
	 * @override
	 * @see Pixim~ContentManifest#load
	 */
	load(basepath, contentResources, cb, ecb) {
		var manifest = this._data;
		
		if (Object.keys(manifest).length === 0) {
			cb();
			return;
		}
		
		var p = contentResources.spritesounds = contentResources.spritesounds || {};
		
		function handler(key, howl) {
			p[key] = howl;
			
			if (++loadedCount < loadCount) {
				return;
			}
			
			cb();
		}
		
		var loader = new PIXI.loaders.Loader();
		var loadCount = 0;
		var loadedCount = 0;
		var self = this;
		
		for (var i in manifest) {
			if (!manifest[i]) {
				continue;
			}
			
			++loadCount;
		}
		
		for (var i in manifest) {
			if (!manifest[i]) {
				continue;
			}
			
			loadAudioSprite(this._normalize(manifest[i], basepath), i, function(key, data) {
				var ext;
				data = data || {};
				
				if (!data.src) {
					Sound.create(key, {src: '.mp3'}, handler, ecb);
					return;
				}
				
				for (var j = 0; j < data.src.length; j++) {
					ext = data.src[j].split('.');
					data.src[j] = (self._normalize(manifest[key], basepath)).replace('.json', '.' + ext[ext.length - 1]);
				}
				
				Sound.create(key, data, handler, ecb);
			});
		}
	}
}

Object.defineProperties(Pixim.Content, {
	/**
	 * Define manifests of audio sprite.
	 * 
	 * @function Pixim.Content.defineSpritesounds
	 * @param data {Pixim.Content~ManifestData} Required manifest data.
	 * @param subData {Pixim.Content~ManifestData} Unrequired manifest data.
	 */
	defineSpritesounds: {
		value: function(data, subData) {
			this._pixim.manifest.spritesounds = this._pixim.manifest.spritesounds || new Pixim_ContentSpritesoundManifest();
			this._pixim.manifest.spritesounds.add(data);
			/*
			this._pixim.subManifest.spritesounds = this._pixim.subManifest.spritesounds || new ContentSpritesoundManifest();
			this._pixim.subManifest.spritesounds.add(subData);
			*/
		}
	}
});

Object.defineProperties(Pixim.Content.prototype, {
	/**
	 * Add manifests of audio sprite.
	 * 
	 * @function Pixim.Content#addSpritesounds
	 * @param data {Pixim.Content~ManifestData} Required manifest data.
	 */
	addSpritesounds: {
		value: function(data) {
			if (this._pixim.postloadState !== Pixim.loadingState.None) {
				this.clearAdditionalManifest();
			}
			
			this._pixim.additionalManifests.spritesounds = this._pixim.additionalManifests.spritesounds || new Pixim_ContentSpritesoundManifest();
			this._pixim.additionalManifests.spritesounds.add(data);
		}
	}
});

Object.defineProperties(Pixim.ContentData.prototype, {
	/**
	 * Load spritesounds.
	 * 
	 * @function Pixim.ContentData#loadSpritesounds
	 * @param data {Pixim.Content~ManifestData}
	 * @param cb {function}
	 * @param ecb {function}
	 */
	loadSpritesounds: {
		value: function(data, cb, ecb) {
			var c = new Pixim_ContentSpritesoundManifest();
			var p = this._pixim;
			c.add(data);
			
			var isError = false;
			c.load(p.basepath, p.resources, function() {
				if (isError) {
					return;
				}
				
				cb && cb();
			}, function() {
				isError = true;
				ecb && ecb();
			});
		}
	}
});

Object.defineProperties(Pixim.events, {
	/**
	 * Fires when a spritesound loading error occurs.
	 * @event Pixim.events.spritesoundLoadedError
	 */
	spritesoundLoadedError: {
		value: 'spritesoundLoadedError'
	}
});