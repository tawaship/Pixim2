/**
 * @constructor Pixim~Sound
 * @classdesc Manifest of sounds.
 * @param howl {Howler}
 */
export default class Pixim_Sound {
	constructor(howl) {
		this.howl = howl;
		this._instanceIds = [];
	}
	
	static create(key, data, cb, ecb) {
		data = data || {};
		
		data.onload = function() {
			cb(key, new Pixim_Sound(this));
		};
		
		data.onloaderror = function(e) {
			var ev = new Pixim.Event(Pixim.events.soundLoadedError);
			ev.detail = e;
			ecb(ev);
			
			cb(key, new Pixim_Sound(this));
		};
		
		new Howl(data);
	}
	
	play() {
		var id = this.howl.play.apply(this.howl, arguments);
		this._instanceIds.push(id);
		
		return id;
	}
	
	mute() {
		this.howl.mute.apply(this.howl, arguments);
	}
	
	loop() {
		this.howl.loop.apply(this.howl, arguments);
	}
	
	volume() {
		this.howl.volume.apply(this.howl, arguments);
	}
	
	pause() {
		this.howl.pause.apply(this.howl, arguments);
	}
	
	stop(id) {
		if (id) {
			this.howl.stop(id);
			return;
		}
		
		var p = this._instanceIds;
		for (var i = 0; i < p.length; i++) {
			this.howl.stop(p[i]);
		}
	}
}