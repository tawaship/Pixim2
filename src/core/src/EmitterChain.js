/**
 * @constructor Pixim.EmitterChain~PiximData
 * @classdesc Class related to system data of Pixim.EmitterChain.
 * @param type {string} Task name.
 * @param emitter {Pixim.Emitter} Emitter emitterted registration events.
 */
class PiximData {
	constructor(type, emitter) {
		this.emitter = emitter;
		this.current = 0;
		this.type = type;
		this.funcs = [];
		this.currentFunc = null;
	}
}

/**
 * @constructor Pixim.EmitterChain
 * @classdesc Class related to data of continuous task.
 * @param type {string} Task name.
 * @param emitter {Pixim.Emitter} Emitter emitterted registration events.
 */
export default class Pixim_EmitterChain {
	constructor(type, emitter) {
		this._pixim = new PiximData(type, emitter);
	}
	
	/**
	 * Register task.
	 * 
	 * @function Pixim.EmitterChain#chain
	 * @see Pixim.Emitter#on
	 * @param func {Pixim~Task~ContainerCallback|function} Callback when the event fires.<br />
	 *     Context 'this' in callback is the parameter "emitter" sent to the constructor.
	 * @return {Pixim.EmitterChain} Return a itself (can use method chaining).
	 */
	chain(func) {
		var p = this._pixim;
		
		if (!p.emitter) {
			return this;
		}
		
		p.funcs.push(function() {
			p.currentFunc = func;
			p.emitter.on(p.type, func);
		});
		
		if (p.funcs.length === 1) {
			this.next();
		}
		
		return this;
	}
	
	/**
	 * Change current task.
	 * 
	 * @function Pixim.EmitterChain#to
	 * @param value {number} Task index.
	 */
	to(value) {
		this._pixim.current = parseInt(value) || 0;
		this.next();
	}
	
	/**
	 * To next task.
	 * 
	 * @function Pixim.EmitterChain#next
	 */
	next() {
		var p = this._pixim;
		
		if (!p.emitter) {
			return;
		}
		
		p.emitter.off(p.type, p.currentFunc);
		
		var q = p.funcs;
		q && q[p.current] && q[p.current]();
		++p.current;
	}
	
	/**
	 * Execute current task.
	 * 
	 * @function Pixim.EmitterChain#done
	 */
	done() {
		var p = this._pixim;
		p.emitter.emit(p.type);
	}
	
	/**
	 * Destory instance.
	 * 
	 * @function Pixim.EmitterChain#destroy
	 */
	destroy() {
		var p = this._pixim;
		p.emitter = null;
		p.funcs = [];
		p.currentFunc = null;
	}
}