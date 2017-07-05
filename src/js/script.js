$(document).ready(function() {
	// VOLET
	var menuBtn = $('.menu_btn');
	var menu = $('.menu_list');
	console.log(menu);
	menuBtn.on('click', function(){
		menu.toggleClass('menu_open');
		console.log('menu open');
		// var hauteur = $('.menu_list').prop('scrollHeight');
		// $('.menu_open').css("max-height", hauteur);
	});
});