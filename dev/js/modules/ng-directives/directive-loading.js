(function (){

	'use strict';

	angular
		.module('myApp')
		.directive('loadingMessage', loadingMessage);

	loadingMessage.$inject = [];

	function loadingMessage() {
		return {
			restrict: 'AE',
			template: '' +
					'<div>' +
					'	<div ng-if="checkType(1)"><div class="page_loading"><span>Loading...</span></div></div>' +
					'	<div ng-if="checkType(2)">Section Loading</div>' +
					'	<div ng-if="checkType(3)"><i class="fa fa-spinner fa-spin fa-1x fa-fw"></i><span class="sr-only">Loading...</span> Chat Loading...</div>' +
					'	<div ng-if="checkType(4)">File Upload Loading...</div>' +
					'	<div ng-if="checkType(5)">{{message}}</div>' +
					'	<div ng-if="checkType(6)"><i class="fa fa-spinner fa-spin fa-1x fa-fw"></i><span class="sr-only">Loading...</span> My Profile Loading...</div>' +
					'	<div ng-if="checkType(7)"><i class="fa fa-spinner fa-spin fa-1x fa-fw"></i><span class="sr-only">Loading...</span> User Profile Loading...</div>' +
					'	  <i ng-if="checkType(8)" ng-if="loading" class="fa fa-spinner fa-spin fa-1x fa-fw"></i>' +
					'</div>',
			scope: {
				type: '@', // type of loader
				message: '@' // message to be shown while loading
			},
			link: function(scope, element, attrs) {
				var typeCodes = {
					1: 'page_loading',
					2: 'section_loading',
					3: 'chat_loading',
					4: 'file_upload_loading',
					5: 'single_data_list_loading',
					6: 'my_profile_loading',
					7: 'user_profile_loading',
					8: 'icon_processing'
				}
				scope.checkType = function (t) {
					return typeCodes[t] == scope.type;
				}
			}
		};
	}

})();