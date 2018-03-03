(function (){

	'use strict';

	angular
		.module('myApp')
		.controller('indexController', indexController);

	indexController.$inject = ['$scope', 'alertFactory'];

	function indexController ($scope, alertFactory) {

		alertFactory.log("calling indexController");

		var vm = this;

		return vm;

	}

})();