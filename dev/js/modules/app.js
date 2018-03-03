(function(){

	'use strict';

	angular.module('myApp', [
		'ui.router',
		'firebase'
	]);

})();

function scopeApply(scope) {
	if (scope 
		&& scope.$root 
		&& scope.$root.$$phase != '$apply' 
		&& scope.$root.$$phase != '$digest')
			scope.$apply();
}