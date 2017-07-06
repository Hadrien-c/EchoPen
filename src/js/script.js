$(document).ready(function() {
	// VOLET
	var menuBtn = $('.contribute');
	// var menuBtnSM = $('.nav_btn-sm');
	var menu = $('.menu_list');
	var nav = $('.global_nav');
	console.log(menu);
	menuBtn.on('click', function(){
		menu.toggleClass('menu_open');
		console.log('menu open');
		nav.toggleClass('global_nav_active');
		// var hauteur = $('.menu_list').prop('scrollHeight');
		// $('.menu_open').css("max-height", hauteur);
	});
	// menuBtnSM.on('click', function(){
	// 	menu.toggleClass('menu_open');
	// 	console.log('menu open');
	// 	// var hauteur = $('.menu_list').prop('scrollHeight');
	// 	// $('.menu_open').css("max-height", hauteur);
	// });

});