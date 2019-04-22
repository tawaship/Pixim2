/**
 * @constructor Pixim.Event
 * @classdesc Class related to event.
 * @param type {string} Name of event type.
 */
export default class Pixim_Event {
	constructor(type) {
		/**
		 * Name of event type.
		 * 
		 * @member Pixim.Event#type {string}
		 * @default ''
		 */
		this.type = type || '';
		
		/**
		 * Unixtime when event was created.
		 * 
		 * @member Pixim.Event#timeStamp {number}
		 */
		this.timeStamp = Date.now();
	}
}