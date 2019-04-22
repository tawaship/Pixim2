/**
 * @constructor Pixim~Point
 * @classdesc Class related to point data.
 * @param [x=0] {number} X coordinate.
 * @param [y=0] {number} Y coordinate.
 */
export default class Pixim_Point {
	constructor(x, y) {
		/**
		 * X coordinate.
		 * 
		 * @member Pixim~Point#x {number}
		 * @default 0
		 */
		this.x = x || 0;
		
		/**
		 * Y coordinate.
		 * 
		 * @member Pixim~Point#y {number}
		 * @default 0
		 */
		this.y = y || 0;
	}
}