import Emitter from './Emitter.js';
import Constants from './Constants.js';

class PiximData {
	constructor() {
		this.basepath = '';
		this.fps = 0;
		this.width = 0;
		this.height = 0;
		this.root = null;
		this.stage = null;
		this.lib = null;
		this.resources = null;
		this.vars = null;
	}
}

export default class Pixim_ContentData extends Emitter {
	constructor() {
		super();
		this._pixim = new PiximData();
	}
	
	/**
	 * Content FPS.
	 * 
	 * @member Pixim.ContentData#fps {number}
	 * @see Pixim~ContentConfig#fps
	 */
	get fps() {
		return this._pixim.fps;
	}
	set fps(v) {
		v = Math.max(1, v);
		this._pixim.fps = v;
		this._epixim.emit(Constants.events.changed, v);
	}
	
	/**
	 * Content width.
	 * 
	 * @member Pixim.ContentData#width {number}
	 * @see Pixim~ContentConfig#width
	 */
	get width() {
		return this._pixim.width;
	}
	
	set width(v) {
	}
	
	/**
	 * Content height.
	 * 
	 * @member Pixim.ContentData#height {number}
	 * @see Pixim~ContentConfig#height
	 */
	get height() {
		return this._pixim.height;
	}
	
	set height(v) {
	}
	
	/**
	 * Reference of root instance in content.
	 * 
	 * @member Pixim.ContentData#root {Pixim.Container}
	 * @readonly
	 */
	get root() {
		return this._pixim.root;
	}
	
	set root(v) {
	}
	/**
	 * Reference of stage instance in content.
	 * 
	 * @member Pixim.ContentData#stage {PIXI.Container}
	 * @readonly
	 */
	get stage() {
		return this._pixim.stage;
	}
	
	set stage(v) {
	}
	
	/**
	 * Defined classes in content.
	 * 
	 * @member Pixim.ContentData#lib {Pixim.ContentLibrary}
	 * @readonly
	 */
	get lib() {
		return this._pixim.lib;
	}
	
	set lib(v) {
	}
	
	/**
	 * Loaded resources.
	 * 
	 * @member Pixim.ContentData#resources {object}
	 * @readonly
	 */
	get resources() {
		return this._pixim.resources;
	}
	
	set resources(v) {
	}
	/**
	 * Defined variables by framework.
	 * 
	 * @member Pixim.ContentData#vars {object<string, any>}
	 * @readonly
	 */
	get vars() {
		return this._pixim.vars;
	}
	
	set vars(v) {
	}
}