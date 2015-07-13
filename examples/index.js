'use strict';

var isArguments = require( './../lib' );

function foo() {
	return isArguments( arguments );
}
console.log( foo() );
// returns true

console.log( isArguments( [] ) );
// returns false

console.log( isArguments( {} ) );
// returns false

console.log( isArguments( null ) );
// returns false
