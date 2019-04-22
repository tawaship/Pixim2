import Emitter from './Emitter.js';
import Class from './Class.js';
import Application from './Application.js';
import Content from './Content.js';
import Container from './Container.js';
import EmitterChain from './EmitterChain.js';
import Event from './Event.js';
import ContentManifest from './ContentManifest.js';
import ContentData from './ContentData.js';
import Task from './Task.js';
import Constants from './Constants.js';

/*!
 * Pixim.js - v2.0.0
 * 
 * @requires pixi.js 4.5.1
 * @author makazu.mori@gmail.com (tawaship)
 * @copylight (c) tawaship
 * @license MIT License
 */
 
/**
 * @namespace Pixim
 */
window.console.log('\r\n%c  Pixim.js %c v2.0.0  %c\r\n\r\n', 'color: #FFF; background: #0C3; padding: 5px; border-radius:12px 0 0 12px;', 'color: #FFF; background: #F33; padding: 5px;  border-radius:0 12px 12px 0;', 'padding: 5px;');

const Pixim = Object.defineProperties({}, {
	Emitter: {
		value: Emitter
	},
	Class: {
		value: Class
	},
	Application: {
		value: Application
	},
	Content: {
		value: Content
	},
	Container: {
		value: Container
	},
	/*
	Chain: {
		value: Chain
	},
	*/
	EmitterChain: {
		value: EmitterChain
	},
	Event: {
		value: Event
	},
	ContentManifest: {
		value: ContentManifest
	},
	ContentData: {
		value: ContentData
	},
	Task: {
		value: Task
	},
	events: {
		value: Constants.events
	},
	loadingState: {
		value: Constants.loadingState
	}
});

window.Pixim = Pixim;