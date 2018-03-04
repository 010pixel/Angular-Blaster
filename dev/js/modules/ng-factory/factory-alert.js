(function (){

	/**
	 * Factory to do all kinds of alerts, logs, error, warning, confirm popups
	 */

	'use strict';

	angular
		.module('myApp')
		.factory('alertFactory', alertFactory);

	alertFactory.$inject = [];

	function alertFactory () {

		var returnObj = {};

		// This will be an alert shown to the users
		returnObj.alert = function ( config ) {
			$.alert(config);
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

		// This will be a confirm message with cancel and confirm function callbacks
		returnObj.confirm = function (title, content, confirmCallback, cancelCallback) {
			var obj = {};
				obj['title'] = title;
				obj['content'] = content;
				obj['buttons'] = {};
				if ( confirmCallback ) obj['buttons']['confirm'] = confirmCallback;
				if ( cancelCallback ) obj['buttons']['cancel'] = cancelCallback;
			$.confirm(obj);
		}

		returnObj.log("calling alertFactory");

		return returnObj;

	}

})();