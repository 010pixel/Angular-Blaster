(function() {

    'use strict';

    angular.module('myApp', [
        'ui.router',
        'firebase'
    ]);

})();

function scopeApply(scope) {
    if (scope &&
        scope.$root &&
        scope.$root.$$phase != '$apply' &&
        scope.$root.$$phase != '$digest')
        scope.$apply();
};
(function() {

    'use strict';

    angular
        .module('myApp')
        .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {
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
            });

        //	$locationProvider.html5Mode(true);
    }

})();; /* Load Styles + Google Fonts */
(function() {
    function loadCSS(href) {
        var ss = window.document.createElement('link'),
            ref = window.document.getElementsByTagName('head')[0];

        ss.rel = 'stylesheet';
        ss.href = href;

        // temporarily, set media to something non-matching to ensure it'll
        // fetch without blocking render
        // ss.media = 'only x';

        ref.parentNode.insertBefore(ss, ref);

        setTimeout(function() {
            // set media back to `all` so that the stylesheet applies once it loads
            ss.media = 'all';
        }, 0);
    }
    loadCSS('https://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700');
    loadCSS('css/styles.css');
})();;
(function() {

    'use strict';

    angular
        .module('myApp')
        .controller('indexController', indexController);

    indexController.$inject = ['$scope', 'alertFactory'];

    function indexController($scope, alertFactory) {

        alertFactory.log("calling indexController");

        var vm = this;

        return vm;

    }

})();;
(function() {

    'use strict';

    angular
        .module('myApp')
        .controller('myAppController', myAppController);

    myAppController.$inject = ['$scope', 'alertFactory'];

    function myAppController($scope, alertFactory) {

        alertFactory.log("calling myAppController");

        var vm = this;

        $scope.processing = true;

        $scope.init = init;

        $scope.init();

        function init() {
            $scope.processing = false;
        }
    }

})();;
(function() {

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
                scope.checkType = function(t) {
                    return typeCodes[t] == scope.type;
                }
            }
        };
    }

})();;
(function() {

    'use strict';

    angular
        .module('myApp')
        .factory('alertFactory', alertFactory);

    alertFactory.$inject = [];

    function alertFactory() {

        var returnObj = {};

        // This will be an alert shown to the users
        returnObj.alert = function(config) {
            return alert(config);
        }

        // This will be an alert shown to the users
        returnObj.show = function(config) {
            return console.log(config);
        }

        // This will be console.log most of the time for the developer
        returnObj.log = function(msg) {
            return console.log(msg);
        }

        // This will be an error alert shown to the users
        returnObj.showError = function(msg) {
            return console.error(msg);
        }

        // This will be an error logged for the developer
        returnObj.error = function(msg) {
            return console.error(msg);
        }

        // This will be a warning logged for developer
        returnObj.warning = function(msg) {
            return console.warn(msg);
        }

        returnObj.log("calling alertFactory");

        return returnObj;

    }

})();;
(function() {

    'use strict';

    angular
        .module('myApp')
        .factory('storageFactory', storageFactory);

    storageFactory.$inject = ['$window', 'alertFactory'];

    function storageFactory($window, alertFactory) {

        alertFactory.log("calling storageFactory");

        var storage = {};

        storage.local = {
            'set': setLocalStorage,
            'get': getLocalStorage,
            'remove': removeLocalStorage,
            'clear': clearLocalStorage
        };

        return storage;

        function setLocalStorage(key, value) {
            return $window.localStorage.setItem(key, JSON.stringify(value));
        }

        function getLocalStorage(key) {
            return angular.fromJson($window.localStorage.getItem(key));
        }

        function removeLocalStorage(key) {
            return $window.localStorage.removeItem(key);;
        }

        function clearLocalStorage() {
            return $window.localStorage.clear();
        }
    }

})();;
(function() {

    'use strict';

    angular
        .module('myApp')
        .filter('toArray', function() {
            return function(obj, addKey) {
                if (!angular.isObject(obj)) return obj;
                if (addKey === false) {
                    return Object.keys(obj).map(function(key) {
                        return obj[key];
                    });
                } else {
                    return Object.keys(obj).map(function(key) {
                        var value = obj[key];
                        return angular.isObject(value) ?
                            Object.defineProperty(value, '$key', {
                                enumerable: false,
                                value: key
                            }) : {
                                $key: key,
                                $value: value
                            };
                    });
                }
            };

        });
})();