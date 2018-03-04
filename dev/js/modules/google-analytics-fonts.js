(function() {
	/**
	 * Load Styles + Google Fonts
	 *
	 * @params: {object}  `scope` angular scope which needs to be applied to show latest changes in page
	 */

	/**
	 * Load CSS
	 *
	 * @params: {string}  `href` url of the css file
	 */
	function loadCSS(href){
		var ss = window.document.createElement('link'),
		ref = window.document.getElementsByTagName('head')[0];

		ss.rel = 'stylesheet';
		ss.href = href;

		// temporarily, set media to something non-matching to ensure it'll
		// fetch without blocking render
		// ss.media = 'only x';

		ref.parentNode.insertBefore(ss, ref);

		setTimeout( function(){
		// set media back to `all` so that the stylesheet applies once it loads
		ss.media = 'all';
		},0);
	}
	loadCSS('css/styles.css');
	loadCSS('https://fonts.googleapis.com/css?family=Roboto:regular,bold,italic,thin,light,bolditalic,black,medium&amp;lang=en');
	loadCSS('https://fonts.googleapis.com/icon?family=Material+Icons');
	// loadCSS('https://code.getmdl.io/1.3.0/material.min.css');
})();