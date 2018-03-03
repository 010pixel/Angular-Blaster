(function (){

	'use strict';

	angular
		.module('myApp')
		.controller('myAppController', myAppController);

	myAppController.$inject = ['$scope', 'alertFactory'];

	function myAppController ($scope, alertFactory) {

		alertFactory.log("calling myAppController");

		var vm = this;

		$scope.processing = true;

		$scope.init = init;

		$scope.init();

		function init () {
			$scope.processing = false;
		}
	}

})();