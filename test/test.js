/* global require, describe, it */
'use strict';

var mpath = './../lib';


// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Proxy required modules:
	proxyquire = require( 'proxyquire' ),

	// Module to be tested:
	isArguments = require( mpath );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'validate.io-arguments', function tests() {

	it( 'should export a function', function test() {
		expect( isArguments ).to.be.a( 'function' );
	});

	it( 'should positively validate', function test() {
		function beep() {
			return isArguments( arguments );
		}
		assert.isTrue( beep() );
	});

	it( 'should negatively validate', function test() {
		var values = [
			'5',
			5,
			null,
			undefined,
			NaN,
			true,
			[],
			{},
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			assert.isFalse( isArguments( values[ i ] ), values[ i ] );
		}
	});

	it( 'should positively validate in environments not supporting the `Arguments` class', function test() {
		var isArguments,
			toStr;

		toStr = Object.prototype.toString;
		Object.prototype.toString = toString;

		isArguments = proxyquire( mpath, {} );

		assert.isTrue( beep() );

		Object.prototype.toString = toStr;

		function beep() {
			return isArguments( arguments );
		}
		function toString() {
			/* jshint validthis:true */
			var str = toStr.call( this );
			if ( str === '[object Arguments]' ) {
				return '[object Object]';
			}
			return str;
		}
	});

	it( 'should negatively validate in environments not supporting the `Arguments` class', function test() {
		var isArguments,
			values,
			toStr,
			i;

		values = [
			'5',
			5,
			null,
			undefined,
			NaN,
			true,
			[],
			{},
			function(){}
		];

		toStr = Object.prototype.toString;
		Object.prototype.toString = toString;

		isArguments = proxyquire( mpath, {} );

		for ( i = 0; i < values.length; i++ ) {
			assert.isFalse( isArguments( values[ i ] ), values[ i ] );
		}
		Object.prototype.toString = toStr;

		function toString() {
			/* jshint validthis:true */
			var str = toStr.call( this );
			if ( str === '[object Arguments]' ) {
				return '[object Object]';
			}
			return str;
		}
	});

});
