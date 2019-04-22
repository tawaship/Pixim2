import Sound from './Sound.js';

/**
 * @constructor Pixim~ContentSoundManifest
 * @classdesc Manifest of sounds.
 * @extends Pixim~ContentManifest
 */
export default class Pixim_ContentSoundManifest extends Pixim.ContentManifest {
	/**
	 * Load registered assets.
	 * 
	 * @function Pixim~ContentSoundManifest#load
	 * @override
	 * @see Pixim~ContentManifest#load
	 */
	load(basepath, contentResources, cb, ecb) {
		var manifest = this._data;
		
		if (Object.keys(manifest).length === 0) {
			cb();
			return;
		}
		
		var p = contentResources.sounds = contentResources.sounds || {};
		
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
			
			Sound.create(i, {src: this._normalize(manifest[i], basepath)}, handler, ecb);
		}
	}
}

Object.defineProperties(Pixim.Content, {
	/**
	 * Define manifests of sound.
	 * 
	 * @function Pixim.Content.defineSounds
	 * @param data {Pixim.Content~ManifestData} Required manifest data.
	 * @param subData {Pixim.Content~ManifestData} Unrequired manifest data.
	 */
	defineSounds: {
		value: function(data, subData) {
			this._pixim.manifest.sounds = this._pixim.manifest.sounds || new Pixim_ContentSoundManifest();
			this._pixim.manifest.sounds.add(data);
			/*
			this._pixim.subManifest.sounds = this._pixim.subManifest.sounds || new ContentSoundManifest();
			this._pixim.subManifest.sounds.add(subData);
			*/
		}
	}
});

Object.defineProperties(Pixim.Content.prototype, {
	/**
	 * Add manifests of sound.
	 * 
	 * @function Pixim.Content#addSounds
	 * @param data {Pixim.Content~ManifestData} Required manifest data.
	 */
	addSounds: {
		value: function(data) {
			if (this._pixim.postloadState !== Pixim.loadingState.None) {
				this.clearAdditionalManifest();
			}
			
			this._pixim.additionalManifests.sounds = this._pixim.additionalManifests.sounds || new Pixim_ContentSoundManifest();
			this._pixim.additionalManifests.sounds.add(data);
		}
	}
});

Object.defineProperties(Pixim.ContentData.prototype, {
	/**
	 * Load sounds.
	 * 
	 * @function Pixim.ContentData#loadSounds
	 * @param data {Pixim.Content~ManifestData}
	 * @param cb {function}
	 * @param ecb {function}
	 */
	loadSounds: {
		value: function(data, cb, ecb) {
			var c = new Pixim_ContentSoundManifest();
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
	 * Fires when a sound loading error occurs.
	 * @event Pixim.events.soundLoadedError
	 */
	soundLoadedError: {
		value: 'soundLoadedError'
	}
});