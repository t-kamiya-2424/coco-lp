
(function($) {

$.mamewaza_scroll = function(cls) {
	if($.isEmptyObject(cls) ) {
		return "";
	}

	var daemon = function() {
		var y = $(window).scrollTop() + $(window).height();
		for(var i = arr.length - 1; i >= 0; i--) {
			if(arr[i].y > y) {
				break;
			}

			arr[i].elm.addClass(arr[i].cls);

			arr.splice(i, 1);
		}

		if(arr.length == 0) {
			$(window).unbind("scroll", daemon);
		}
	};

	var arr = [];
	var y = $(window).scrollTop() + $(window).height();
	for(var i = 0; i < cls.length; i++) {
		if(!cls[i] || !$("." + cls[i])[0]) {
			continue;
		}

		var j = 0;
		$("." + cls[i]).each(function() {
			var y_this = $(this).offset().top;
			if(y_this <= y) {
				return "";
			}

			$(this).removeClass(cls[i]);
			arr.push( {
				"y": y_this,
				"elm": $(this),
				"cls": cls[i],
			} );
		} );
	}

	if(arr.length == 0) {
		return "";
	}

	//sort
	arr.sort(function(a, b) {
		return b.y - a.y;
	} );

	$(window).bind("scroll", daemon);
	daemon();
};

})(jQuery);

$(document).ready(function() {
	$.mamewaza_scroll( ["anim1", "anim1-2", "anim1-3"] );
} );