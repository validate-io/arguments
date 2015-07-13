'use strict';

// FUNCTIONS //

var toString = Object.prototype.toString,
	hasOwn = Object.prototype.hasOwnProperty,
	isEnumerable = Object.prototype.propertyIsEnumerable;


// INIT //

var supportsClass = (function init() {
	return toString.call( arguments );
})() === '[object Arguments]';


// IS ARGUMENTS //

/**
* FUNCTION: isArguments( value )
*	Validates if a value is an arguments object.
*
* @param {*} value - value to validate
* @returns {Boolean} boolean indicating whether a value is an arguments object
*/
function isArguments( value ) {
	return toString.call( value ) === '[object Arguments]';
} // end FUNCTION isArguments()

/**
* FUNCTION: isArgumentsLike( value )
*	Validates if a value is arguments-like.
*
* @param {*} value - value to validate
* @returns {Boolean} boolean indicating whether a value is arguments-like
*/
function isArgumentsLike( value ) {
	return value !== null &&
	typeof value === 'object' &&
	typeof value.length === 'number' &&
	value.length >= 0 &&
	hasOwn.call( value, 'callee' ) &&
	!isEnumerable.call( value, 'callee' );
} // end FUNCTION isArgumentsLike


// EXPORTS //

module.exports = ( supportsClass ) ? isArguments : isArgumentsLike;
