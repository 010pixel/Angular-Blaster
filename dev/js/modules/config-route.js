(function (){

	/**
	 * AngularJS Router configuration
	 */

	'use strict';

	angular
		.module('myApp')
		.config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

	function config ($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.caseInsensitiveMatch = true;
		
		$urlRouterProvider.otherwise('/');

		$stateProvider
			.state('index', {
				url: '/',
				views: {
					content: {
						templateUrl: 'templates/index.html?' + Math.random(),
						controller: 'indexController',
						controllerAs: 'indexCtrl'
					}
				}
			})
			;

	//	$locationProvider.html5Mode(true);
	}

})();