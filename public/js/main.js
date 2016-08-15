
// ========================================================
// Карусель высота
// ========================================================
// var h = $( window ).height(),
// 	w = $( window ).width(),
// 	landingCarousel = document.querySelector(".blur::after");
// h = h - 60;
// landingCarousel.style.height = h.toString() + "px";

// ПАРАЛАКС
// $(".about_parallax_bg").css("top", $(".about_parallax_bg").position().top + "px"); 
// var scrollDivPosition = $(".about_parallax_bg").position().top - 300;
// function parallax(){
// 	var scrolled=$(window).scrollTop();
// 	console.log(scrolled)
// 	$(".about_parallax_bg").css("top", scrollDivPosition-(scrolled*0.2) + "px");
// }
// $(window).scroll(function(e){
//     parallax();
// });

	$.stellar({
	    horizontalScrolling: false,
	    responsive: true
	});


$(document).ready(function() {
$('a[href^="#"]').click(function(){
var el = $(this).attr('href');
$('body').animate({
scrollTop: $(el).offset().top}, 1000);
return false;
});
});