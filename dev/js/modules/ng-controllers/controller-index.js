(function (){

	/**
	 * Controller to manage game section
	 */

	'use strict';

	angular
		.module('myApp')
		.controller('indexController', indexController);

	indexController.$inject = ['$scope', 'gameService', 'alertFactory', 'storageFactory'];

	/**
	 * Function userd for indexController
	 *
	 * @params: {object}  `$scope` main angular $scope
	 * @params: {object}  `gameService` containing all functions for the game to work
	 * @params: {object}  `alertFactory` containing function to show alerts, logs and confirm dialogs
	 * @params: {object}  `storageFactory` containing containing functions to store and retrieve data from localstorage
	 */
	function indexController ($scope, gameService, alertFactory, storageFactory) {

		alertFactory.log("calling indexController");

		var vm = this;

		vm.init = init;
		vm.reset = reset;

		vm.attack = attack;
		vm.blast = blast;
		vm.heal = heal;
		vm.giveup = giveup;
		vm.getPoints = gameService.getPoints;
		vm.getHistory = gameService.getHistory;
		vm.rematch = rematch;

		/**
		 * Initialize the game
		 * Load saved data from previous game and continue game from that stage
		 */
		function init () {
			vm.reset();
			gameService.init();

			var gameSettings = gameService.getSettings() || {};
			vm.gameIsOn = gameSettings['gameIsOn'] || true;
			vm.commentaries =  gameSettings['commentaries'] || [];
			vm.totalHitByUser =   gameSettings['totalHitByUser'] || 0;

			scopeApply($scope);
		}

		/**
		 * Do reset proccess
		 * all the variables will be set to default
		 */
		function reset () {
			vm.busy = false;
			vm.turn = "";
			vm.process = "";
			vm.gameIsOn = true;
			vm.commentaries = [];
			vm.totalHitByUser = 0;
		}

		/**
		 * Do rematch proccess
		 * all the variables will be set to default and save the default data to localstorage
		 */
		function rematch () {
			vm.reset();
			gameService.reset();
			saveData();
			scopeApply($scope);
		}

		/**
		 * Attack on the dragon and dragon attacks back
		 */
		function attack () {
			vm.totalHitByUser++;
			doProcess("attack");
		}

		/**
		 * Launch a power attack on the dragon and dragon attacks back
		 */
		function blast () {
			vm.totalHitByUser++;
			doProcess("blast");
		}

		/**
		 * Heal user after attack
		 * Dragon will attack during this process
		 */
		function heal () {
			if ( vm.totalHitByUser == 0 ) {
				alertFactory.alert({
					title: "Error",
					content: "You can't heal before any attack."
				});
				return;
			}
			doProcess("heal");
		}

		/**
		 * Give up game halfway
		 */
		function giveup () {
			gameService.giveup(function() {
				vm.rematch();
			}, function () {
				console.log("cancel");
			});
		}

		/**
		 * Do process of attack from user and then from dragon
		 *
		 * @params: {string}  `processName` name of process e.g. attack, blast, heal
		 */
		function doProcess (processName) {

			// Check if the process is valid process
			if ( ['attack', 'blast', 'heal'].indexOf(processName) === -1 ) return;

			// Check if system is busy processing
			// Do not process is system is busy
			if ( vm.busy == true ) return;

			vm.process = processName;

			// set busy variable to true
			vm.busy = true;

			// Add Process start commentary
			addCommentary({
				type: 'statement',
				value: "Starting " + processName
			});

			// Do process from USER side
			gameService[processName]('user', 'dragon', function (playersFirst, attackValue) {

				vm.turn = "user";

				// Set attack value from User to Dragon
				vm.attackValue = attackValue;

				// Add commentary for point update
				addCommentary({
					type: processName,
					attacker: "You",
					defender: "Dragon",
					points: attackValue
				});

				// check if game is over
				var isOver = checkGameOver(playersFirst, "You");

				// save data to localstorage
				saveData();

				// if game was over then set variables to default
				if ( isOver == true ) {
					vm.busy = false;
					vm.process = '';
					return;
				}

				// Wait for 1 second so that user shooting animation can be visible
				setTimeout(function() {

					var dragonProcessName = processName;
					vm.turn = "dragon";

					if ( processName == "heal" ) {
						dragonProcessName = "attack";
					}

					// Do process from DRAGON side
					gameService[dragonProcessName]('dragon', 'user', function (playersSecond, attackValue) {

						// Set attack value from Dragon to User
						vm.attackValue = attackValue;

						// Add commentary for point update
						addCommentary({
							type: dragonProcessName,
							attacker: "Dragon",
							defender: "You",
							points: attackValue
						});

						// Check game over process
						checkGameOver(playersSecond, "Dragon");
						scopeApply($scope);

						// Save data to local
						saveData();

						// wait for 1 second so dragon shooting animation can be visible
						// set variables to default so user can continue interacting
						setTimeout(function() {
							vm.turn = "";
							vm.busy = false;
							vm.process = '';
							scopeApply($scope);
						}, 1000);

					});
				}, 1000);

			});			
		}

		/**
		 * Add commentary to Commentaries array
		 *
		 * @params: {object}  `commentary` containing commentary type, points and attacker+defender information
		 */
		function addCommentary (commentary) {
			commentary['user_points'] = vm.getPoints('user');
			commentary['dragon_points'] = vm.getPoints('dragon');
			vm.commentaries.push(commentary);
		}

		/*
		 * Check if game is over and do necessary process
		 *
		 * @params: {object}  `players` containing dragon and user values
		 */
		function checkGameOver (players) {

			// If both players are above 0 means game still continues
			if ( players['user'] > 0 && players['dragon'] > 0 )  return false;

			// If any of the player is below 0 means game is over
			vm.gameIsOn = false;

			// Set commentary object
			var commentary = {};
				commentary['type'] = 'gameover';

			if ( players['user'] <= 0 ) {
				commentary['winner'] = "Dragon";
				commentary['loser'] = "You";
				commentary['winner_points'] = players['dragon'];
				commentary['loser_points'] = players['user'];
			} else if ( players['dragon'] <= 0 ) {
				commentary['winner'] = "You";
				commentary['loser'] = "Dragon";
				commentary['winner_points'] = players['user'];
				commentary['loser_points'] = players['dragon'];
			}

			// Add commentary for game over
			addCommentary(commentary);

			// Set last commentary value to show in results
			vm.lastCommentary = vm.commentaries[ vm.commentaries.length - 1 ];

			scopeApply($scope);

			return true;
		}

		/**
		 * Save data to localstorage for future user in case user closes game halfway
		 */
		function saveData () {
			var data = {};
				data['gameIsOn'] = vm.gameIsOn;
				data['commentaries'] = vm.commentaries;
				data['totalHitByUser'] = vm.totalHitByUser;
			gameService.saveData(data);
		}

		return vm;

	}

})();
