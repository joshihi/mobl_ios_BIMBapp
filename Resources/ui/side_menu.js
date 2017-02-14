function this_class( window_id ) {


////////////////////////////////////////////////////
//VARS
////////////////////////////////////////////////////
	
	var self = Ti.UI.createView( { left: 0, width: 184, height:device_height, zIndex:0, backgroundColor: settings.get_color( 'brown' ) } );
	var button_height = 50;
	
////////////////////////////////////////////////////
//UI
////////////////////////////////////////////////////

		self.container = Ti.UI.createView({
			left: 0, top: 0,
			width: 184, height: device_height
		});
		self.add( self.container );
			
			var logo = Ti.UI.createView({
				top: 592,
				width: 160, height: 115,		
				backgroundImage: 'includes/images/access/logo.png'
			});
			self.container.add( logo );
			
			var button_container = Ti.UI.createView({
				left: 0, top: 55,
				width: 184, 
//				height: 500
				height: 550
			});
			self.add( button_container );
				
				var selected_background = Ti.UI.createView({
					top: 0,
					width: 184, height: button_height,
					backgroundColor: settings.get_color( 'dark_green' )				
				});	
				button_container.add( selected_background );
				
				var button_copy_array = json_data.side_menu; 
				
				for ( var i = 0; i < button_copy_array.length; i++ ) {

					var temp_button = Ti.UI.createLabel({
						left: 25, top: 0+(i*button_height), right: 25, 
						width: Ti.UI.FILL, height: button_height,
						font: { fontFamily: settings.get_font( 'GR-Medium' ), fontSize: 14 },
						color: settings.get_color( 'white' ),
						textAlign: 'left',
						text: button_copy_array[i]						
					});	
					button_container.add( temp_button );
					temp_button.addEventListener( 'click', menu_button_clicked );
					
				}
				
				
			
			


////////////////////////////////////////////////////
//FUNCTIONS
////////////////////////////////////////////////////
	
	function menu_button_clicked ( e ) {
		
		var object =  e.source;
		
		set_selected_background( object.top );
		
		var current_window = layers.top_layer_function();
		current_window.container.animate( { left: 0, duration: 500, delay:500 }, function() {
			
			screen_controller.switch_screen_state_function( object.text );
			
		} );
		
		
		
		
	}
	
	self.set_selected_background_by_id = function ( id ) {
		
		var button_copy_array = json_data.side_menu; 
				
		for ( var i=0; i<button_copy_array.length; i++ ) { 
			if ( id == button_copy_array[i] ) set_selected_background( 0+(i*button_height) );		
		}		
	};
	
	function set_selected_background ( top_position ) {
		
		selected_background.animate( { top: top_position, duration: 500 } );
		
	}
	
	if ( window_id != null ) self.set_selected_background_by_id ( window_id );
	

////////////////////////////////////////////////////
//RUN FUNCTIONS
////////////////////////////////////////////////////

	return self;
	
}

module.exports = this_class;