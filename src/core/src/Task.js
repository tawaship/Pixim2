import Emitter from './Emitter.js';
import EmitterChain from './EmitterChain.js';

/**
 * @typedef Pixim~Task~ContainerCallback {function}
 * @param e {Pixim~Task~ContainerCallbackObject}
 * @context Pixim.Container that has this object.
 */

/**
 * @typedef Pixim~Task~ContainerCallbackObject {object}
 * @property delta {number}
 */

/**
 * @constructor Pixim.Task~PiximData
 * @classdesc System data of Pixim.Task.
 */
class PiximData {
	constructor() {
		this.chains = {};
	}
}

/**
 * @constructor Pixim~Task
 * @classdesc Pixim.Emitter customized for Pixim.Container.
 * @extends Pixim.Emitter
 */
export default class Pixim_Task extends Emitter {
	constructor() {
		super();
		this._pixim = new PiximData();
	}
	
	/**
	 * @function Pixim~Task#on
	 * @override
	 * @see Pixim.Emitter#on
	 * @param type {string}
	 * @param func {Pixim~Task~ContainerCallback}
	 * @return {Pixim~Task}
	 */
	
	/**
	 * @function Pixim~Task#once
	 * @override
	 * @see Pixim.Emitter#once
	 * @param type {string}
	 * @param func {Pixim~Task~ContainerCallback}
	 * @return {Pixim~Task}
	 */
	
	/**
	 * @function Pixim~Task#off
	 * @override
	 * @see Pixim.Emitter#off
	 * @param type {string}
	 * @param func {Pixim~Task~ContainerCallback}
	 * @return {Pixim~Task}
	 */
	
	/**
	 * Create Pixim.ChainedEmitter
	 * 
	 * @function Pixim~Task#createChain
	 * @param type {string} Task name,
	 * @return {Pixim.EmitterChain}
	 */
	createChain(type) {
		return this._pixim.chains[type] || (this._pixim.chains[type] = new EmitterChain(type, this));
	}
	
	/**
	 * @function Pixim~Task#clear
	 * @override
	 * @see Pixim.Emit#clear
	 */
	clear(type) {
		type = type || '';
		
		Emitter.prototype.clear.call(this, type);
		
		var p = this._pixim.chains;
		var q;
		
		if (type) {
			q = p[type];
			q && q.destroy();
			delete(p[type]);
		} else {
			for (var i in p) {
				p[i].destroy();
			}
			
			this._pixim.chains = {};
		}
		
		return this;
	}
}