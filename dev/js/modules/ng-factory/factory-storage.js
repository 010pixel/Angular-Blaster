(function (){

	'use strict';

	angular
		.module('myApp')
		.factory('storageFactory', storageFactory);

	storageFactory.$inject = ['$window', 'alertFactory'];

	function storageFactory ( $window, alertFactory ) {

		alertFactory.log("calling storageFactory");

		var storage = {};

		storage.local = {
			'set': setLocalStorage,
			'get': getLocalStorage,
			'remove': removeLocalStorage,
			'clear': clearLocalStorage
		};

		return storage;

		function setLocalStorage ( key, value) {
			return $window.localStorage.setItem( key, JSON.stringify(value) );
		}

		function getLocalStorage ( key ) {
			return angular.fromJson($window.localStorage.getItem( key ));
		}

		function removeLocalStorage ( key ) {
			return $window.localStorage.removeItem( key );;
		}

		function clearLocalStorage () {
			return $window.localStorage.clear();
		}
	}

})();