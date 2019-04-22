/**
 * @namespace Pixim.events
 */
export default Object.defineProperties({}, {
	/**
	 * Fires when the loader preloaded assets.
	 * @event Pixim.events.preloaded
	 */
	preloaded: {
		value: 'preloaded'
	},
	/**
	 * Fires when the loader postloaded assets.
	 * @event Pixim.events.postloaded
	 */
	postloaded: {
		value: 'postloaded'
	},
	/**
	 * Fires when the loader loaded assets.
	 * @event Pixim.events.loaded
	 */
	loaded: {
		value: 'loaded'
	},
	/**
	 * Fires when an loading error occurs.
	 * @event Pixim.events.loadedError
	 */
	loadedError: {
		value: 'loadedError'
	},
	/**
	 * Fires when something changed.
	 * @event Pixim.events.changed
	 */
	changed: {
		value: 'changed'
	},
	/**
	 * Fires when Pixim.Application becomes executable.
	 * @event Pixim.events.prepared
	 */
	prepared: {
		value: 'prepared'
	},
	/**
	 * Fires when call Pixim.Application#start.
	 * 
	 * @event Pixim.events.started
	 */
	started: {
		value: 'started'
	},
	/**
	 * Fires when call Pixim.Application#stop.
	 * 
	 * @event Pixim.events.stopped
	 */
	stopped: {
		value: 'stopped'
	},
	/**
	 * Fires when call Pixim.Application#pause(true).
	 * 
	 * @event Pixim.events.paused
	 */
	paused: {
		value: 'paused'
	},
	/**
	 * Fires when call Pixim.Application#pause(false).
	 * 
	 * @event Pixim.events.restarted
	 */
	restarted: {
		value: 'restarted'
	},
	/**
	 * Fires when preloaded unrequred assets.
	 * 
	 * @event Pixim.events.delayAssetsLoaded
	 */
	delayAssetsLoaded: {
		value: 'delayAssetsLoaded'
	}
});