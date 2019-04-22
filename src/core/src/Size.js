/**
 * @constructor Pixim~Size
 * @classdesc Class related to rectangle data.
 * @param [width=0] {number} Width.
 * @param [height=0] {number} Height.
 */
export default class Pixim_Size {
	constructor(width, height) {
		/**
		 * Width.
		 * 
		 * @member Pixim~Size#width {number}
		 * @default 0
		 */
		this.width = width || 0;
		
		/**
		 * Height.
		 * 
		 * @member Pixim~Size#height {number}
		 * @default 0
		 */
		this.height = height || 0;
	}
}