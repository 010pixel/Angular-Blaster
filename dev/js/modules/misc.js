/**
 * Do scope apply process
 *
 * @params: {object}  `scope` angular scope which needs to be applied to show latest changes in page
 */
function scopeApply(scope) {
	if (scope 
		&& scope.$root 
		&& scope.$root.$$phase != '$apply' 
		&& scope.$root.$$phase != '$digest')
			scope.$apply();
}