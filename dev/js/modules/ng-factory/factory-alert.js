(function (){

	'use strict';

	angular
		.module('myApp')
		.factory('alertFactory', alertFactory);

	alertFactory.$inject = [];

	function alertFactory () {

		var returnObj = {};

		// This will be an alert shown to the users
		returnObj.alert = function ( config ) {
			return alert(config);
		}

		// This will be an alert shown to the users
		returnObj.show = function ( config ) {
			return console.log(config);
		}

		// This will be console.log most of the time for the developer
		returnObj.log = function ( msg ) {
			return console.log(msg);
		}

		// This will be an error alert shown to the users
		returnObj.showError = function ( msg ) {
			return console.error(msg);
		}

		// This will be an error logged for the developer
		returnObj.error = function ( msg ) {
			return console.error(msg);
		}

		// This will be a warning logged for developer
		returnObj.warning = function ( msg ) {
			return console.warn(msg);
		}

		returnObj.log("calling alertFactory");

		return returnObj;

	}

})();