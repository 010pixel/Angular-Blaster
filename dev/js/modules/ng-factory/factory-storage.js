(function (){

	/**
	 * Factory to save and retireve from localstorage
	 */

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

		/**
		 * Save data to local storage
		 *
		 * @params: {string}  `key` key to which the data will be attached
		 * @params: {object}  `value` data to be saved
		 */
		function setLocalStorage ( key, value) {
			return $window.localStorage.setItem( key, JSON.stringify(value) );
		}

		/**
		 * Retrieve data from local storage
		 *
		 * @params: {string}  `key` key of data to be retrieved
		 */
		function getLocalStorage ( key ) {
			return angular.fromJson($window.localStorage.getItem( key ));
		}

		/**
		 * Remove data from local storage
		 *
		 * @params: {string}  `key` key of the data which needs to be removed from localstorage
		 */
		function removeLocalStorage ( key ) {
			return $window.localStorage.removeItem( key );;
		}

		/**
		 * Remove all data from localstorage
		 */
		function clearLocalStorage () {
			return $window.localStorage.clear();
		}
	}

})();