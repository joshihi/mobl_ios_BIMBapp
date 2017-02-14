function this_class() {

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	
////////////////////////////////////////////////////
//VARS
////////////////////////////////////////////////////
	var self = {};

	var layer_array = new Array();
	
	var window_closing_bool = false;


//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

////////////////////////////////////////////////////
//FUNCTIONS
////////////////////////////////////////////////////
	self.add_layer_function = function ( window ) {
		
		window.opacity = 0;
		window.open();			
		print( "WINDOW OPENED: " + window.window_id );	
	
		layer_array.push( window );
		
		window.animate( { opacity:1, duration: settings.ani_speed, delay:0 } );			
		
//		if ( settings.debug_mode ) show_testing_mode_function ( window );	
		
	};
	
	self.top_layer_function = function ( ) {
		
		var current_window = layer_array[ layer_array.length-1 ];
		return current_window;
		
	};

	self.remove_layer_function = function ( e ) {
		
		if( typeof e !== 'undefined' && typeof e.source === 'object' ) e.source.removeEventListener( 'click', self.remove_layer_function );
			
		var current_window = self.top_layer_function();
		
		if ( current_window.window_id != 'home') {
			
			layer_array.pop();
	
			current_window.close();
			
			var window_id = current_window.window_id;
			
			print( "WINDOW CLOSED: " + current_window.window_id );	
			
			if ( current_window.window_id == 'Savings Graph Overlay' || current_window.window_id == 'Tornado' || current_window.window_id == 'Detailed results' ) {
				var top_window = self.top_layer_function();
				if ( top_window.window_id == 'Summary Results' ) top_window.redraw_ui();
			}
			
			current_window = null;
			
		}
			
	};

	
	self.go_home_function = function () {
			
		var array_length = layer_array.length;
		
		for ( var i=0; i < array_length; i++ ){
			
			self.remove_layer_function();
		
		}
		
	};
	
	function show_testing_mode_function ( window ) {
		
		var debug_label = Ti.UI.createLabel( { 
			right: 10, bottom: 10,
			width:"100%", 
			text: "", color:"#FF0000", textAlign:"right",
			zIndex: 100 
		} );
		window.add( debug_label );		
		window.debug_label = debug_label;
		
		var label = Ti.UI.createLabel( { 
			left: 10, bottom: 10,
			width:"100%", 
			text: "Testing mode: " + settings.debug_mode + "\nDeveloper: " + settings.developer, color:"#FF0000", textAlign:"left" 
		} );
		window.add( label );
	};

	return self;
}

module.exports = this_class;