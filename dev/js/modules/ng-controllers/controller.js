(function (){

	/**
	 * Controller to manage whole page
	 */

	'use strict';

	angular
		.module('myApp')
		.controller('myAppController', myAppController);

	myAppController.$inject = ['$scope', 'alertFactory'];

	/**
	 * Function userd for main controller for whole page
	 *
	 * @params: {object}  `$scope` main angular $scope
	 * @params: {object}  `alertFactory` containing function to show alerts, logs and confirm dialogs
	 */
	function myAppController ($scope, alertFactory) {

		alertFactory.log("calling myAppController");

		var vm = this;

		// Set processing to true to show loading
		$scope.processing = true;

		$scope.init = init;

		$scope.init();

		function init () {
			// Set process to false after half a second to make the screen visible
			setTimeout(function() {
				$scope.processing = false;
				scopeApply($scope);
			}, 500);
		}
	}

})();