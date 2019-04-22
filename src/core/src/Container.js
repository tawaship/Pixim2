import Task from './Task.js';

class PiximData {
	constructor(target) {
		this.target = target;
		this.tickEnabled = true;
		this.task = new Task();
		this.taskableChildren = [];
	}
	
	update(e) {
		var i, s;
		
		if (this.tickEnabled) {
			s = this.task;
			for (i in s._epixim.events) {
				s.contextableEmit(i, this.target, e);
			}
			
			s = this.taskableChildren;
			for (i = 0; i < s.length; i++) {
				s[i]._pixim.update(e);
			}
		}
	}
	
	destroy() {
		this.target = null;
		this.tickEnabled = true;
		this.task.clear();
		//this.task = null;
		this.taskableChildren = [];
	}
}

/**
 * @constructor Pixim.Container
 * @extends PIXI.Container
 * @classdesc Class related to object container of Pixim.Content.
 */
export default class Pixim_Container extends PIXI.Container {
	constructor() {
		super();
		this._pixim = new PiximData(this);
	}
	
	/**
	 * Object to register a task for each frame.
	 * 
	 * @member Pixim.Container#task {Pixim~Task}
	 * @readonly
	 */
	get task() {
		return this._pixim.task;
	}
	
	set task(v) {
	}
	
	/**
	 * Whether to execute a "update".
	 * 
	 * @member Pixim.Container#tickEnabled {bool}
	 * @default true
	 */
	get tickEnabled() {
		return this._pixim.tickEnabled;
	}
	
	set tickEnabled(v) {
		this._pixim.tickEnabled = v;
	}
	
	addChild() {
		for (var i = 0; i < arguments.length; i++) {
			if (arguments[i].task instanceof Task) {
				this._pixim.taskableChildren.push(arguments[i]);
			}
		}
		return super.addChild.apply(this, arguments);
	}
	
	addChildAt(child, index) {
		if (child.task instanceof Task) {
			this._pixim.taskableChildren.push(child);
		}
		return super.addChildAt(child, index);
	}
	
	removeChild(child) {
		const c = super.removeChild(child);
		if (!c || !(c.task instanceof Task)) {
			return c;
		}
		
		var v;
		if ((v = this._pixim.taskableChildren.indexOf(c)) > -1) {
			this._pixim.taskableChildren.splice(v, 1);
		}
		return c;
	}
	
	removeChildAt(index) {
		var c = super.removeChildAt(index);
		if (!c || !(c.task instanceof Task)) {
			return c;
		}
		
		var v;
		if ((v = this._pixim.taskableChildren.indexOf(c)) > -1) {
			this._pixim.taskableChildren.splice(v, 1);
		}
		return c;
	}
	
	removeChildren(beginIndex, endIndex) {
		var c = super.removeChildren(beginIndex, endIndex);
		var v;
		for (var i = 0; i < c.length; i++) {
			if ((v = this._pixim.taskableChildren.indexOf(c[i])) > -1) {
				this._pixim.taskableChildren.splice(v, 1);
			}
		}
		return c;
	}
	
	destroy(options) {
		super.destroy.apply(this, arguments);
		this._pixim.destroy();
		//this._pixim = null;
	}
}