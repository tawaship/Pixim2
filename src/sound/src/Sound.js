/**
 * @constructor Pixim~Sound
 * @classdesc Manifest of sounds.
 * @param howl {Howler}
 */
export default class Pixim_Sound {
	constructor(howl) {
		this.howl = howl;
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
	
	static muteAll(isMute) {
		
	}
	
	play() {
		return this.howl.play.apply(this.howl, arguments);
	}
	
	mute() {
		return this.howl.mute.apply(this.howl, arguments);
	}
	
	loop() {
		return this.howl.loop.apply(this.howl, arguments);
	}
	
	volume() {
		return this.howl.volume.apply(this.howl, arguments);
	}
	
	pause() {
		return this.howl.pause.apply(this.howl, arguments);
	}
	
	stop() {
		return this.howl.stop.apply(this.howl, arguments);
	}
}