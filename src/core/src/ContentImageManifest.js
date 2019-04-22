import ContentManifest from './ContentManifest.js';
import ContentData from './ContentData.js';
import Constants from './Constants.js';

/**
 * @constructor Pixim~ContentImageManifest
 * @classdesc Manifest of images.
 * @extends Pixim~ContentManifest
 */
export default class Pixim_ContentImageManifest extends ContentManifest {
	/**
	 * Load registered assets.
	 * 
	 * @function Pixim~ContentImageManifest#load
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
			var ev = new Pixim.Event(Constants.events.imageLoadedError);
			ev.detail = e;
			
			ecb(ev);
		});
		
		for (var i in manifest) {
			if (!manifest[i]) {
				continue;
			}
			
			loader.add(i, this._normalize(manifest[i], basepath), {
				crossOrigin: true,
				loadType: PIXI.loaders.Resource.LOAD_TYPE.IMAGE
			});
		}
		
		var p = contentResources.images = contentResources.images || {};
		
		loader.load(function(loader, resources) {
			for (var i in resources) {
				if (resources[i].error) {
					continue;
				}
				
				p[i] = resources[i].texture;
			}
			
			cb();
		});
	}
}

/**
 * Load images.
 * 
 * @function Pixim.ContentData#loadImages
 * @param data {Pixim.Content~ManifestData}
 * @param cb {function}
 * @param ecb {function}
 */
Object.defineProperties(ContentData.prototype, {
	loadImages: {
		value: function(data, cb, ecb) {
			var c = new Pixim_ContentImageManifest();
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
	 * Fires when a image loading error occurs.
	 * @event Pixim.events.imageLoadedError
	 */
	imageLoadedError: {
		value: 'imageLoadedError'
	}
});