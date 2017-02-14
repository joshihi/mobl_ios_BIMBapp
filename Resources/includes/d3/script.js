/*
 $(document).ready(function() {
	$('.c3-tooltip-container').on('click', function() {
		alert('click');
	});
	alert('click');
	$('body').on('tap', function() {
		console.log('aaaa');
	});
});
*/
chart.load({ 
	columns: ' + JSON.stringify(datas) + ', 
	done: function(){ 
		var tooltip = document.getElementsByClassName('c3-tooltip-container');
//		alert(tooltip[0]); 
		tooltip[0].addEventListener('touchmove', function(e) {
		    e.preventDefault();
		    var touch = e.touches[0];
		    alert(touch.pageX + " - " + touch.pageY);
		}, false);
		
		tooltip[0].addEventListener('tap', function(e) {
		    e.preventDefault();
		    var touch = e.touches[0];
//		    alert(touch.pageX + " - " + touch.pageY);
		}, false);
	} 
});
/*		
var tooltip = document.getElementsByClassName('c3-tooltip-container');
var tooltip = document.getElementsByClassName('c3-chart');

tooltip[0].addEventListener('touchmove', function(e) {
    e.preventDefault();
    var touch = e.touches[0];
    alert(touch.pageX + " - " + touch.pageY);
}, false);

tooltip[0].addEventListener('tap', function(e) {
    e.preventDefault();
    var touch = e.touches[0];
    alert(touch.pageX + " - " + touch.pageY);
}, false);
*/