import ContentManifest from './ContentManifest.js';
import ContentData from './ContentData.js';
import Constants from './Constants.js';

export default class Pixim_ContentSpritesheetManifest extends ContentManifest {
	/**
	 * Load registered assets.
	 * 
	 * @function Pixim~ContentSpritesheetManifest#load
	 * @override
	 * @see Pixim~ContentManifest#load
	 */
	load(basepath, contentResources, cb, ecb) {
		var manifest = this._data;
		
		if (Object.keys(manifest).length === 0) {
			cb();
			return;
		}
		
		var loader = new PIXI.loaders.Loader();
		
		loader.onError.add(function(e) {
			var ev = new Pixim.Event(Constants.events.spritesheetLoadedError);
			ev.detail = e;
			
			ecb(ev);
		});
		
		for (var i in manifest) {
			if (!manifest[i]) {
				continue;
			}
			
			loader.add(i, this._normalize(manifest[i], basepath), {
				crossOrigin: true,
				xhrType: PIXI.loaders.Resource.XHR_RESPONSE_TYPE.JSON
			});
		}
		
		var p = contentResources.spritesheets = contentResources.spritesheets || {};
		
		loader.load(function(loader, resources) {
			var s;
			for (var i in resources) {
				s = resources[i];
				if (s.error || !s.data || s.data instanceof Image) {
					continue;
				}
				p[i] = {};
				
				for (var j in s.textures) {
					p[i][j] = s.textures[j];
				}
			}
			
			cb();
		});
	}
}

/**
 * Load spritesheets.
 * 
 * @function Pixim.ContentData#loadSpritesheets
 * @param data {Pixim.Content~ManifestData}
 * @param cb {function}
 * @param ecb {function}
 */
Object.defineProperties(ContentData.prototype, {
	loadSpritesheets: {
		value: function(data, cb, ecb) {
			var c = new Pixim_ContentSpritesheetManifest();
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

Object.defineProperties(Constants.events, {
	/**
	 * Fires when a spritesheet loading error occurs.
	 * @event Pixim.events.spritesheetLoadedError
	 */
	spritesheetLoadedError: {
		value: 'spritesheetLoadedError'
	}
});