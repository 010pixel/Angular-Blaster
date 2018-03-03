/* Load Styles + Google Fonts */
(function() {
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
	loadCSS('https://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700');
	loadCSS('css/styles.css');
})();