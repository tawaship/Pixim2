/**
 * @function Pixim.Emitter~addListener
 * @param events {object} The object that contains callbacks.
 * @param type {string} Event type.
 * @param func {function} Callback when the event fires.
 * @param [isOnce=false] {bool} Whether execute only once.
 */
function addListener(events, type, func, isOnce) {
	var i, e;
	if (!type || !func) {
		return;
	}
	
	isOnce = isOnce || false;
	e = events[type] = events[type] || [];
	for (i = 0; i < e.length; i++) {
		if (e[i].func === func) {
			return;
		}
	}
	e.push({func: func, once: isOnce});
}

/**
 * @function Pixim.Emitter~removeListener
 * @param events {object} The object that contains callbacks.
 * @param type {string} Registered event type.
 * @param func {function} Regitered callback.
 */
function removeListener(events, type, func) {
	var idx, i, e;
	if (!type || !func) {
		return;
	}
	e = events[type] = events[type] || [];
	for (i = 0; i < e.length; i++) {
		if (e[i].func === func) {
			e.splice(i, 1);
			return;
		}
	}
}

/**
 * @function  Pixim.Emitter~fire
 * @param events {object} The object that contains callbacks.
 * @param e {string} Event type.
 * @param params {any} Callback parameters.
 */
function fire(events, e, params) {
	var list, i;
	
	list = events[e] || [];
	
	var p;
	for (i = list.length - 1; i >= 0; i--) {
		p = list[i];
		if (list[i].once) {
			list.splice(i, 1);
		}
		
		p.func.apply(this, params);
	}
	
	/*
	for (i = 0; i < list.length; i++) {
		list[i].func.apply(this, params);
	}
	
	for (i = list.length - 1; i >= 0; i--) {
		if (list[i].once) {
			list.splice(i, 1);
		}
	}
	*/
}

/**
 * @constructor Pixim.Emitter~PiximData
 * @classdesc Class related to system data of Emitter.
 */
class PiximData {
	constructor() {
		this.events = {};
		this.systemEvents = {};
	}
	
	/**
	 * Registers event managed by the system.
	 * 
	 * @function Pixim.Emitter~PiximData#on
	 * @param type {string} Event type.
	 * @param func {function} Callback when the event fires.
	 * @return {Pixim.Emitter} Return a target instance (can use method chaining).
	 */
	on(type, func) {
		addListener(this.systemEvents, type, func, false);
		return this;
	}
	
	/**
	 * Registers event to be executed only once.
	 * 
	 * @function Pixim.Emitter~PiximData#once
	 * @param type {string} Event type.
	 * @param func {function} Callback when the event fires.<br />
	 *     Context 'this' in callback is Pixim.Emitter.
	 * @return {Pixim.Emitter} Return a itself (can use method chaining).
	 */
	once(type, func) {
		addListener(this.systemEvents, type, func, true);
		return this;
	}
	
	/**
	 * Unregisters event managed by the system.
	 * 
	 * @function Pixim.Emitter~PiximData#off
	 * @param type {string} Registered event type.
	 * @param func {function} Regitered callback.
	 * @return {Pixim.Emitter} Return a target instance (can use method chaining).
	 */
	off(type, func) {
		removeListener(this.systemEvents, type, func);
		return this;
	}
	
	/**
	 * Fires event.
	 * 
	 * @function Pixim.Emitter~PiximData#emit
	 * @param e {string|Pixim.Event} Event type or Event object.
	 * @return {Pixim.Emitter} Return a target instance (can use method chaining).
	 */
	emit(e) {
		var p = [];
		for (var i = 1; i < arguments.length; i++) {
			p.push(arguments[i]);
		}
		
		fire.call(this, this.systemEvents, e, p);
		return this;
	}
}

/**
 * @constructor Pixim.Emitter
 * @classdesc Class related to event emission.
 */
export default class Pixim_Emitter {
	constructor() {
		this._epixim = new PiximData();
	}
	
	/**
	 * Registers event.
	 * 
	 * @function Pixim.Emitter#on
	 * @param type {string} Event type.
	 * @param func {function} Callback when the event fires.<br />
	 *     Context 'this' in callback is Pixim.Emitter.
	 * @return {Pixim.Emitter} Return a itself (can use method chaining).
	 */
	on(type, func) {
		addListener(this._epixim.events, type, func, false);
		return this;
	}
	
	/**
	 * Registers event to be executed only once.
	 * 
	 * @function Pixim.Emitter#once
	 * @param type {string} Event type.
	 * @param func {function} Callback when the event fires.<br />
	 *     Context 'this' in callback is Pixim.Emitter.
	 * @return {Pixim.Emitter} Return a itself (can use method chaining).
	 */
	once(type, func) {
		addListener(this._epixim.events, type, func, true);
		return this;
	}
	
	/**
	 * Unregisters event.
	 * 
	 * @function Pixim.Emitter#off
	 * @param type {string} Registered event type. If it regarded as false, unregister all events.
	 * @param func {function} Regitered callback. If it regarded as false, unregister all events registered as "type".
	 * @return {Pixim.Emitter} Return a itself (can use method chaining).
	 */
	off(type, func) {
		removeListener(this._epixim.events, type, func);
		return this;
	}
	
	/**
	 * Fires event with context.
	 * 
	 * @function Pixim.Emitter#contextableEmit
	 * @param e {string} Event type.
	 * @param context {object} Context to treat as "this". 
	 * @return {Pixim.Emitter} Return a itself (can use method chaining).
	 */
	contextableEmit(e, context) {
		if (arguments.length === 1) {
			return this.emit(e);
		}
		
		var p = [];
		for (var i = 2; i < arguments.length; i++) {
			p.push(arguments[i]);
		}
		
		context = context || this;
		fire.call(context, this._epixim.events, e, p);
		return this;
	}
	
	/**
	 * Fires event.
	 * 
	 * @function Pixim.Emitter#emit
	 * @param e {string} Event type.
	 * @return {Pixim.Emitter} Return a itself (can use method chaining).
	 */
	emit(e) {
		var p = [];
		for (var i = 1; i < arguments.length; i++) {
			p.push(arguments[i]);
		}
		
		fire.call(this, this._epixim.events, e, p);
		return this;
	}
	
	/**
	 * Unregisters event.
	 * 
	 * @function Pixim.Emitter#clear
	 * @param [type=''] {string} Unregister event type. If it regarded as false, unregister all events.
	 * @return {Pixim.Emitter} Return a itself (can use method chaining).
	 */
	clear(type) {
		type = type || '';
		if (type) {
			this._epixim.events[type] = [];
		} else {
			this._epixim.events = {};
		}
		return this;
	}
}