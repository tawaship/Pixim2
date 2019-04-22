const defaultProperties = {};
const functionDiscriptor = {
	extend: {
		value: extend
	},
	defineStatic: {
		value: defineStatic
	},
	definePrototype: {
		value: definePrototype
	}
};
const v = Object.getOwnPropertyNames(function() {});

for (let i = 0; i < v.length; i++) {
	defaultProperties[v[i]] = true;
}

/**
 * @class Pixim~Classy
 * @extends Function
 * @classdesc Extension of Function type to facilitate class definition.
 */

/**
 * Call the constructor of the parent class.
 * 
 * @function Pixim~Classy#super
 */
function _super() {
	var f = this.___currentSuper || this.constructor;
	this.___currentSuper = Object.getPrototypeOf(f.prototype).constructor;
	this.___currentSuper.apply(this, arguments);
	delete this.___currentSuper;
}

/**
 * Inherits another class.
 * 
 * @function Pixim~Classy.extend
 * @param cls {function} Constructor of the parent class.
 * @return {Pixim~Classy} Return a itself (can use method chaining).
 */
function extend(cls) {
	var n, s, d;
	
	if (!(cls instanceof Function)) {
		return this;
	}
	
	this.prototype = Object.create(cls.prototype, {
		constructor: {
			value: this
		},
		super: {
			value: _super
		}
	});
	
	n = Object.getOwnPropertyNames(cls);
	d = {};
	
	for (var i = 0; i < n.length; i++) {
		if ((s = n[i]) in defaultProperties) {
			continue;
		}
		d[s] = Object.getOwnPropertyDescriptor(cls, s);
	}
	Object.defineProperties(this, d);
	return this;
}

/**
 * Define static members.
 * 
 * @function Pixim~Classy.defineStatic
 * @param obj {object} Member information to be defined.
 * @return {Pixim~Classy} Return a itself (can use method chaining).
 */
function defineStatic(obj) {
	if (typeof(obj) !== 'object') {
		return this;
	}
	Object.defineProperties(this, obj);
	return this;
}

/**
 * Define instance members.
 * 
 * @function Pixim~Classy.definePrototype
 * @param obj {object} Member information to be defined.
 * @return {Pixim~Classy} Return a itself (can use method chaining).
 */
function definePrototype(obj) {
	if (typeof(obj) !== 'object') {
		return this;
	}
	Object.defineProperties(this.prototype, obj);
	return this;
}

/**
 * Class definition system.<br />
 * Give the function necessary for the class definition to the function of the argument.
 * 
 * @function Pixim.Class
 * @param constructor {function}
 * @return {Pixim~Classy}
 */
export default function Pixim_Class(constructor) {
	Object.defineProperties(constructor, functionDiscriptor);
	
	return constructor;
}