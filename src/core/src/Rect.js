/**
 * @constructor Pixim~Rect
 * @classdesc Class related to rectangle data.
 * @param [x=0] {number} X coordinate of upper left corner of rectangle.
 * @param [y=0] {number} Y coordinate of upper left corner of rectangle.
 * @param [width=0] {number} Rectangle width.
 * @param [height=0] {number} Rectangle height.
 */
export default class Pixim_Rect {
	constructor(x, y, width, height) {
		/**
		 * X coordinate of upper left corner of rectangle.
		 * 
		 * @member Pixim~Rect#x {number}
		 * @default 0
		 */
		this.x = x || 0;
		
		/**
		 * Y coordinate of upper left corner of rectangle.
		 * 
		 * @member Pixim~Rect#x {number}
		 * @default 0
		 */
		this.y = y || 0;
		
		/**
		 * Rectangle width.
		 * 
		 * @member Pixim~Rect#width {number}
		 * @default 0
		 */
		this.width = width || 0;
		
		/**
		 * Rectangle height.
		 * 
		 * @member Pixim~Rect#height {number}
		 * @default 0
		 */
		this.height = height || 0;
	}
}