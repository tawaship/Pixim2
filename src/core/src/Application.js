import Constants from './Constants.js';
import Content from './Content.js';
import Emitter from './Emitter.js';
import Rect from './Rect.js';
import Size from './Size.js';
import Point from './Point.js';


/**
 * @typedef Pixim.ApplicationOption {object}
 * @property [width=target content width] {number} Width of canvas.
 * @property [height=target content height] {number} Height of canvas.
 * @property [transparent=false] {bool} Whether background of canvas is transparent.
 * @property [antialias=false] {bool} Whether to use anti-aliasing.
 * @property [resolution=1] {number} Resolution of canvas.
 * @property [unuseWebGL=false] {bool} Whether not use webGL render.
 */
class PiximData {
	constructor() {
		this.rect = null;
		this.size = null;
		this.point = null;
		this.isRun = false;
		
		this.app = null;
		this.content = null;
		this.container = null;
		this.wrapper = null;
		this.view = null;
	}
}

const TAG_PX = 'px';

/**
 * Create an application from instance of Pixim.Content.
 * 
 * @constructor Pixim.Application
 * @classdesc Class related to running Pixim.Content.
 * @extends Pixim.Emitter
 * @param content {Pixim.Content} Target content.
 * @param [container=document.body] {HTMLElement} The parent element of the canvas that displays the content.
 * @param [options] {Pixim.ApplicationOption} Optional data related to Pixim.Application.
 */
export default class Pixim_Application extends Emitter {
	constructor(content, container, options) {
		super();
		
		var i, s;
		var self = this;
		var loaderCount = 0;
		var loadedLoaderCount = 0;
		var loaderData;
		
		var ticker, config, data;
		var data;
		
		if (!(content instanceof Content)) {
			return;
		}
		
		config = content._pixim.config;
		
		options = options || {};
		var width = options.width || config.width;
		var height = options.height || config.height;
		var unuseWebGL = options.unuseWebGL || false;
		var transparent = options.transparent || false;
		var antialias = options.antialias || false;
		var resolution = options.resolution || 1;
		var forceFXAA = options.forceFXAA || false;
		var legacy = options.legacy || false;
		var roundPixels = options.roundPixels || false;
		
		this._pixim = new PiximData();
		this._pixim.app = new PIXI.Application(width, height, {transparent: transparent, antialias: antialias, resolution: resolution, forceFXAA: forceFXAA, legacy: legacy, roundPixels: roundPixels}, unuseWebGL);
		this._pixim.app.stop();
		
		this._pixim.content = content;
		this._pixim.container = container || document.body;
		this._pixim.wrapper = document.createElement('div');
		this._pixim.wrapper.style.position = 'absolute';
		this._pixim.wrapper.style.left = '0' + TAG_PX;
		this._pixim.wrapper.style.top = '0' + TAG_PX;
		this._pixim.view = this._pixim.app.view;
		
		this._pixim.rect = this.getRect();
		this._pixim.size = this.getSize();
		this._pixim.point = this.getPoint();
		
		ticker = this._pixim.app.ticker;
		
		data = content._pixim.data;
		
		//this._pixim.app.ticker.speed = config.fps / 60;
		data._epixim.on(Constants.events.changed, function(fps) {
			ticker.speed = fps / 60;
			//spf = 1 / ticker.speed;
		});
		data.fps = config.fps;
		
		var tickerCounter = 0;
		ticker.add(function(delta) {
			/*
			if ((tickerCounter += delta) < 1 / (self._pixim.content._pixim.data.fps / 60)) {
				return;
			}
			*/
			/*
			if ((tickerCounter += delta) < 1) {
				return;
			}
			tickerCounter -= 1;
			*/
			//console.log(delta)
			/*
			if (!data._pixim.root._pixim) {
				return;
			}
			*/
			data._pixim.root._pixim.update({delta: delta});
		});
		
		return this;
	}
	
	/**
	 * Reference to managed PIXI.Application instance.
	 * 
	 * @member Pixim.Application#app {PIXI.Application}
	 * @readonly
	 */
	get app() {
		return this._pixim.app;
	}
	
	set app(v) {
	}
	
	/**
	 * Reference to managed Pixim.Content instance.
	 * 
	 * @member Pixim.Application#content {Pixim.Content}
	 * @readonly
	 */
	get content() {
		return this._pixim.content;
	}
	
	set content(v) {
	}
	
	/**
	 * Reference to canvas resizing container.
	 * 
	 * @member Pixim.Application#wrapper {HTMLDivElement}
	 * @readonly
	 */
	get wrapper() {
		return this._pixim.wrapper;
	}
	
	set wrappern(v) {
	}
	
	/**
	 * Reference to canvas.
	 * 
	 * @member Pixim.Application#view {HTMLCanvasElement}
	 * @readonly
	 */
	get view() {
		return this._pixim.view;
	}
	
	set view(v) {
	}
	
	/**
	 * Reference to application container.
	 * 
	 * @member Pixim.Application#container {HTMLElement}
	 * @readonly
	 */
	get container() {
		return this._pixim.container;
	}
	
	set container(v) {
	}
	
	/**
	 * Whether application has running.
	 * 
	 * @member Pixim.Application#isRun {bool}
	 * @readonly
	 * @default false
	 */
	get isRun() {
		return this._pixim.isRun;
	}
	
	set isRun(v) {
	}
	
	/**
	 * Whether default assets required for the content have been loaded.
	 * 
	 * @member Pixim.Application#isPreloaded {bool}
	 * @readonly
	 * @default false
	 */
	get isPreloaded() {
		return this._pixim.content._pixim.preloadState === Constants.loadingState.Finished;
	}
	
	set isPreloaded(v) {
	}
	
	/**
	 * Whether additional assets required for the content have been loaded.
	 * 
	 * @member Pixim.Application#isPostloaded {bool}
	 * @readonly
	 * @default false
	 */
	get isPostloaded() {
		return this._pixim.content._pixim.postloadState === Constants.loadingState.Finished;
	}
	
	set isPostloaded(v) {
	}
	
	/**
	 * Prepare the content.
	 * 
	 * @function Pixim.Application#prepare
	 * @fires Pixim.events.prepared
	 * @return {Pixim.Application} Return a itself (can use method chaining).
	 */
	prepare() {	
		var self = this;
		var content = this._pixim.content;
		
		content.prepare(function() {
			self.emit(Constants.events.prepared);
		});
		
		return this;
	}
	
	/**
	 * Build and play the content.
	 * 
	 * @function Pixim.Application#start
	 * @fires Pixim.events.started
	 * @return {Pixim.Application} Return a itself (can use method chaining).
	 */
	start() {	
		var self = this;
		var content = this._pixim.content;
		
		if (this._pixim.isRun) {
			return this;
		}
		
		content.build(function() {
			self.play();
		});
		
		return this;
	}
	
	/**
	 * Play the content.
	 * 
	 * @function Pixim.Application#play
	 * @fires Pixim.events.started
	 * @return {Pixim.Application} Return a itself (can use method chaining).
	 */
	play() {
		var self = this;
		
		if (this._pixim.isRun || !this._pixim.content.isBuilt) {
			return this;
		}
		
		this._pixim.content.setStage(this._pixim.app.stage);
		this._pixim.app.stage.removeChildren();
		this._pixim.app.stage.addChild(this._pixim.content._pixim.data._pixim.root);
		
		this._pixim.wrapper.appendChild(this._pixim.app.view);
		this._pixim.container.appendChild(this._pixim.wrapper);
		this._pixim.app.start();
		this._pixim.isRun = true;
		this.emit(Constants.events.started);
		
		return this;
	}
	
	/**
	 * Stop the content.
	 * 
	 * @function Pixim.Application#stop
	 * @fires Pixim.events.stopped
	 * @return {Pixim.Application} Return a itself (can use method chaining).
	 */
	stop() {
		if (!this._pixim.isRun) {
			return this;
		}
		
		this._pixim.app.stop();
		this._pixim.isRun = false;
		this._pixim.app.stage.removeChildren();
		this._pixim.content._pixim.data._pixim.root.destroy();
		this._pixim.content._pixim.data._pixim.stage = null;
		this._pixim.app.ticker.update();
		this._pixim.container.removeChild(this._pixim.wrapper);
		this.emit(Constants.events.stopped);
		
		return this;
	}
	
	/**
	 * Pause or restart the content.
	 * 
	 * @since 1.1.0
	 * @function Pixim.Application#pause
	 * @param isPause {bool}
	 * @return {Pixim.Application} Return a itself (can use method chaining).
	 */
	pause(flag) {
		if (!this._pixim.isRun) {
			return this;
		}
		
		if (flag) {
			this._pixim.app.stop();
			this.emit(Constants.events.paused);
		} else {
			this._pixim.app.start();
			this.emit(Constants.events.restarted);
		}
		
		return this;
	}
	
	/**
	 * Show the content.
	 * 
	 * @since 1.1.0
	 * @function Pixim.Application#show
	 * @return {Pixim.Application} Return a itself (can use method chaining).
	 */
	show() {
		this._pixim.app.view.style.display = 'block';
		return this;
	}
	
	/**
	 * Hide the content.
	 * 
	 * @since 1.1.0
	 * @function Pixim.Application#hide
	 * @return {Pixim.Application} Return a itself (can use method chaining).
	 */
	hide() {
		this._pixim.app.view.style.display = 'none';
		return this;
	}
	
	/**
	 * Display the content in full screen.
	 * 
	 * @function Pixim.Application#fullScreen
	 * @param [rect=new Rect(0, 0, window.innerWidth, window.innerHeight)] {Pixim~Rect} Reference rectangle.
	 * @return {Pixim.Application} Return a itself (can use method chaining).
	 */
	fullScreen(rect) {
		rect = rect || new Rect(0, 0, window.innerWidth, window.innerHeight);
		
		var view = this._pixim.app.view;
		if (rect.width / rect.height > view.width / view.height) {
			this.adjustHeight(rect.height).toCenter(rect);
		} else {
			this.adjustWidth(rect.width).toMiddle(rect);
		}
		
		return this;
	}
	
	/**
	 * Adjust width of the content.<br />
	 * This function changes "canvas.style.width".
	 * 
	 * @since 1.1.0
	 * @function Pixim.Application#adjustWidth
	 * @param width {number} 
	 * @return {Pixim.Application} Return a itself (can use method chaining).
	 */
	adjustWidth(width) {
		var view = this._pixim.app.view;
		var h = width / view.width * view.height;
		view.style.width = width + TAG_PX;
		view.style.height = h + TAG_PX;
		this._pixim.rect.width = this._pixim.size.width = width;
		this._pixim.rect.height = this._pixim.size.height = h;
		return this;
	}
	
	/**
	 * Adjust height of the content.<br />
	 * This function changes "canvas.style.height".
	 * 
	 * @since 1.1.0
	 * @function Pixim.Application#adjustHeight
	 * @param width {number} 
	 * @return {Pixim.Application} Return a itself (can use method chaining).
	 */
	adjustHeight(height) {
		var view = this._pixim.app.view;
		var w = height / view.height * view.width;
		view.style.height = height + TAG_PX;
		view.style.width = w + TAG_PX;
		this._pixim.rect.width = this._pixim.size.width = w;
		this._pixim.rect.height = this._pixim.size.height = height;
		return this;
	}
	
	/**
	 * Align the content to the left with respect to the horizontal direction of the reference rectangle.<br />
	 * This function changes "canvas.parentNode.style.left".
	 * 
	 * @since 1.1.0
	 * @function Pixim.Application#toLeft
	 * @param [rect=new Rect(0, 0, window.innerWidth, window.innerHeight)] {Pixim~Rect} Reference rectangle.
	 * @return {Pixim.Application} Return a itself (can use method chaining).
	 */
	toLeft(rect) {
		rect = rect || new Rect(0, 0, window.innerWidth, window.innerHeight);
		this._pixim.wrapper.style.left = rect.x + TAG_PX;
		this._pixim.rect.x = this._pixim.point.x = rect.x;
		return this;
	}
	
	/**
	 * Align the content to the right with respect to the horizontal direction of the reference rectangle.<br />
	 * This function changes "canvas.parentNode.style.left".
	 * 
	 * @since 1.1.0
	 * @function Pixim.Application#toRight
	 * @param [rect=new Rect(0, 0, window.innerWidth, window.innerHeight)] {Pixim~Rect} Reference rectangle.
	 * @return {Pixim.Application} Return a itself (can use method chaining).
	 */
	toRight(rect) {
		var s, m;
		rect = rect || new Rect(0, 0, window.innerWidth, window.innerHeight);
		s = this.getSize();
		m = (rect.width - s.width);
		this._pixim.wrapper.style.left = (m + rect.x) + TAG_PX;
		this._pixim.rect.x = this._pixim.point.x = m + rect.x;
		return this;
	}
	
	/**
	 * Align the content to the center with respect to the horizontal direction of the reference rectangle.<br />
	 * This function changes "canvas.parentNode.style.left".
	 * 
	 * @since 1.1.0
	 * @function Pixim.Application#toCenter
	 * @param [rect=new Rect(0, 0, window.innerWidth, window.innerHeight)] {Pixim~Rect} Reference rectangle.
	 * @return {Pixim.Application} Return a itself (can use method chaining).
	 */
	toCenter(rect) {
		var s, m;
		rect = rect || new Rect(0, 0, window.innerWidth, window.innerHeight);
		s = this.getSize();
		m = (rect.width - s.width) / 2;
		this._pixim.wrapper.style.left = (m + rect.x) + TAG_PX;
		this._pixim.rect.x = this._pixim.point.x = m + rect.x;
		return this;
	}
	
	/**
	 * Align the content to the top with respect to the vertical direction of the reference rectangle.<br />
	 * This function changes "canvas.parentNode.style.top".
	 * 
	 * @since 1.1.0
	 * @function Pixim.Application#toTop
	 * @param [rect=new Rect(0, 0, window.innerWidth, window.innerHeight)] {Pixim~Rect} Reference rectangle.
	 * @return {Pixim.Application} Return a itself (can use method chaining).
	 */
	toTop(rect) {
		rect = rect || new Rect(0, 0, window.innerWidth, window.innerHeight);
		this._pixim.wrapper.style.top = rect.y + TAG_PX;
		this._pixim.rect.y = this._pixim.point.y = rect.y;
		return this;
	}
	
	/**
	 * Align the content to the bottom with respect to the vertical direction of the reference rectangle.<br />
	 * This function changes "canvas.parentNode.style.top".
	 * 
	 * @since 1.1.0
	 * @function Pixim.Application#toBottom
	 * @param [rect=new Rect(0, 0, window.innerWidth, window.innerHeight)] {Pixim~Rect} Reference rectangle.
	 * @return {Pixim.Application} Return a itself (can use method chaining).
	 */
	toBottom(rect) {
		var s, m;
		rect = rect || new Rect(0, 0, window.innerWidth, window.innerHeight);
		s = this.getSize();
		m = (rect.height - s.height);
		this._pixim.wrapper.style.top = (m + rect.y) + TAG_PX;
		this._pixim.rect.y = this._pixim.point.y = m + rect.y;
		return this;
	}
	
	/**
	 * Align the content to the center with respect to the vertical direction of the reference rectangle.<br />
	 * This function changes "canvas.parentNode.style.top".
	 * 
	 * @since 1.1.0
	 * @function Pixim.Application#toMiddle
	 * @param [rect=new Rect(0, 0, window.innerWidth, window.innerHeight)] {Pixim~Rect} Reference rectangle.
	 * @return {Pixim.Application} Return a itself (can use method chaining).
	 */
	toMiddle(rect) {
		var s, m;
		rect = rect || new Rect(0, 0, window.innerWidth, window.innerHeight);
		s = this.getSize();
		m = (rect.height - s.height) / 2;
		this._pixim.wrapper.style.top = (m + rect.y) + TAG_PX;
		this._pixim.rect.y = this._pixim.point.y = m + rect.y;
		return this;
	}
	
	/**
	 * Get the top-left coordinates of the application.
	 * 
	 * @since 1.1.0
	 * @function Pixim.Application#getPoint
	 * @return {Pixim~Point}
	 */
	getPoint() {
		return this._pixim.point || new Point(
			parseFloat(this._pixim.wrapper.style.left.replace(TAG_PX, '')),
			parseFloat(this._pixim.wrapper.style.top.replace(TAG_PX, ''))
		);
	}
	
	/**
	 * Get the size of the application.
	 * 
	 * @since 1.1.0
	 * @function Pixim.Application#getSize
	 * @return {Pixim~Size}
	 */
	getSize() {
		return this._pixim.size || new Size(
			parseFloat(this._pixim.app.view.style.width.replace(TAG_PX, '')),
			parseFloat(this._pixim.app.view.style.height.replace(TAG_PX, ''))
		);
	}
	
	/**
	 * Gets a rectangle representing the display area of the application.
	 * 
	 * @since 1.1.0
	 * @function Pixim.Application#getRect
	 * @return {Pixim~Rect}
	 */
	getRect() {
		return this._pixim.rect || new Rect(
			parseFloat(this._pixim.wrapper.style.left.replace(TAG_PX, '')),
			parseFloat(this._pixim.wrapper.style.top.replace(TAG_PX, '')),
			parseFloat(this._pixim.app.view.style.width.replace(TAG_PX, '')),
			parseFloat(this._pixim.app.view.style.height.replace(TAG_PX, ''))
		);
	}
}