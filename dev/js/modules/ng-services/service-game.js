(function (){

	/**
	 * Service used to manage all methods and variables necessary for the game
	 */

	'use strict';

	angular
		.module('myApp')
		.service('gameService', gameService);

	gameService.$inject = ['alertFactory', 'storageFactory'];

	/**
	 * Function used for Game Service
	 *
	 * @params: {object}  `alertFactory` containing function to show alerts, logs and confirm dialogs
	 * @params: {object}  `storageFactory` containing containing functions to store and retrieve data from localstorage
	 */
	function gameService (alertFactory, storageFactory) {

		alertFactory.log("calling gameService");

		// variable saving user and dragon points
		var players = {};
		// variable saving history of each attack, blast, heal
		var playersHistory = {};

		// Object which will be returned from this gameService
		var game = {
			attack: attack,
			blast: blast,
			heal: heal,
			giveup: giveup,
			getPoints: getPoints,
			getHistory: getHistory,
			init: init,
			reset: reset,
			saveData: saveData,
			getSettings: getSettings
		};

		/**
		 * Generate random between two numbers
		 *
		 * @params: {integer}  `min` minimum value of random number
		 * @params: {integer}  `max` maximum value of random number
		 */
		function getRandomNumber (min, max) {
			if ( !min ) min = 1;
			if ( !max )  max = 20;
  			return Math.floor(Math.random() * (max - min + 1)) + min;			
		}

		/**
		 * Generate random between two numbers
		 *
		 * @params: {string}  `from` name of the player who initiates attack e.g. user, dragon
		 * @params: {string}  `to` name of the player who gets attacked e.g. user, dragon
		 * @params: {function}  `callback` function to be run after attack
		 */
		function attack (from, to, callback) {
			var attackValue = getRandomNumber();
			players[to] -= attackValue;
			playersHistory[to].push({
				type: 'attack',
				value: -attackValue
			});
			if ( typeof callback === "function" ) callback(players, attackValue);
		}

		/**
		 * Generate random between two numbers
		 *
		 * @params: {string}  `from` name of the player who initiates blast e.g. user, dragon
		 * @params: {string}  `to` name of the player who gets blasted e.g. user, dragon
		 * @params: {function}  `callback` function to be run after blast
		 */
		function blast (from, to, callback) {
			var attackValue = getRandomNumber(20,40);			
			players[to] -= attackValue;
			playersHistory[to].push({
				type: 'blast',
				value: -attackValue
			});
			if ( typeof callback === "function" ) callback(players, attackValue);
		}

		/**
		 * Generate random between two numbers
		 *
		 * @params: {string}  `from` name of the player who gets healed e.g. user, dragon
		 * @params: {function}  `callback` function to be run after heal
		 */
		function heal (from, callback) {
			var maxHeal = 100 - (players[from] || 0)
			var healValue = getRandomNumber(1,maxHeal);
			players[from] += healValue;
			playersHistory[from].push({
				type: 'heal',
				value: healValue
			});
			if ( typeof callback === "function" ) callback(players, healValue);
		}

		/**
		 * Do process for giving up
		 * Show confirm dialog to user and giveup only when user confirms
		 *
		 * @params: {function}  `confirmCallback` function to be run when user confirms
		 * @params: {function}  `cancelCallback` function to be run when user cancels
		 */
		function giveup (confirmCallback, cancelCallback) {
			alertFactory.confirm("Give up", "Are you sure you want to give up?", confirmCallback, cancelCallback);
		}

		/**
		 * Get points of player
		 *
		 * @params: {string} `player` name of the player whose points need to be retrieved
		 */
		function getPoints (player) {
			return players[player];
		}

		/**
		 * Get points history of player
		 *
		 * @params: {string} `player` name of the player whose point history need to be retrieved
		 */
		function getHistory (player) {
			return playersHistory[player];
		}

		/**
		 * Initialize the game
		 * Load saved data from previous game to continue game from that stage
		 */
		function init() {
			var gameSettings = getSettings() || {};
			players = gameSettings['players'] || {};
			playersHistory = gameSettings['playersHistory'] || {};
		}

		/**
		 * all the variables will be set to default
		 */
		function reset () {
			players = {
				user: 100,
				dragon: 100
			};
			playersHistory = {
				user: [],
				dragon: []
			};
		}

		/**
		 * Save data to localstorage for future user in case user closes game halfway
		 */
		function saveData (data) {
			var gameSettings = storageFactory.local.get('gameSettings') || {};
				gameSettings['players'] = players;
				gameSettings['playersHistory'] = playersHistory;

			if ( !data ) data = {};
			for ( var i in data ) {
				gameSettings[i] = data[i];
			}

			storageFactory.local.set('gameSettings', gameSettings);
		}

		/**
		 * Retrieved data from localstorage which might be saved during previous game
		 */
		function getSettings () {
			return storageFactory.local.get('gameSettings');
		}

		return game;

	}

})();