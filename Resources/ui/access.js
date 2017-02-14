function this_class(  ) {


////////////////////////////////////////////////////
//VARS
////////////////////////////////////////////////////
	
	var self = Ti.UI.createWindow( { width: device_width, height:device_height, zIndex:0, fullscreen:true, navBarHidden:true, backgroundColor: settings.get_color( 'brown' ), window_id:"Access" } );
	var start_opacity = 1;
	
	var access_codes = json_data.login_options;

	
////////////////////////////////////////////////////
//UI
////////////////////////////////////////////////////

		var container = Ti.UI.createView({
			left: 0, top: 0,
			width: device_width, height: device_height,		
			backgroundColor: settings.get_color( 'brown' ),
			opacity: start_opacity
		});
		self.add( container );
			
			var vertical_circles = Ti.UI.createView({
				left: 77, top: 0,
				width: 226, height: 650,		
				backgroundImage: 'includes/images/access/vertical_circles.png',
				opacity: start_opacity
			});
			container.add( vertical_circles );
			
			var logo = Ti.UI.createView({
				left: 600, top: 50,
				width: 175, height: 126,		
				backgroundImage: 'includes/images/access/logo.png',
				opacity: start_opacity
			});
			container.add( logo );
/*		
			var pi_button = Ti.UI.createView({
				left: device_width-128, top: 0,
				width: 128, height: 48,
				backgroundColor: settings.get_color( 'light_green' ),		
				opacity: start_opacity
			});
			container.add( pi_button );
			
				var pi_text = lvc_ui.create_label();
					pi_text.text = json_data.access.prescribing_text;
					pi_text.font = { 
										fontSize: 14,
										fontFamily: settings.get_font( 'GR-Bold' )
									};
					pi_text.color = '#FFFFFF';
				pi_button.add( pi_text );
					
				var pi_hit_area = lvc_ui.create_hit_area();
				pi_button.add( pi_hit_area );
				pi_hit_area.addEventListener( 'click', button_clicked );
*/			
			var intro_header_text = Ti.UI.createLabel({
				left: 328, top: 215,
				width: 680, height: 35,		
				text: json_data.access.intro_header_text,
				font: { fontSize: 30, fontFamily: settings.get_font( 'GR-Bold' ) },
				color: '#a597c8',
				textAlign: 'center'
			});	
			container.add( intro_header_text );
			
	//		lvc_ui.line_height_label_function ( container, json_data.access.intro_text, 25, 328, 330, 680, 15, settings.get_font( 'G-Book' ), 14, 'center', settings.get_color( 'white' ) );
						
			var error_text = Ti.UI.createLabel({
				left: 456, top: 275,
				width: 432, height: 20,
				color: 'red',
				font: { 
						fontSize: 14,
						fontFamily: settings.get_font( 'G-Bok' )
				},
				textAlign: 'center'
			});
			container.add( error_text );
			
			var input_bg = Ti.UI.createView({
				left: 456, top: 300,
				width: 304, height: 48,
				backgroundColor: settings.get_color( 'white' ),		
				opacity: start_opacity
			});
			container.add( input_bg );
			
				var input_field = Ti.UI.createTextField({
					width: 290, height: 45,	
					opacity: start_opacity
				});
				input_bg.add( input_field );
				
//				input_field.value = 'Sau1';
						
			var access_button = Ti.UI.createView({
				left: 760, top: 300,
				width: 128, height: 48,
				backgroundColor: '#63b67c',
				borderColor: '#69c083', borderWidth: 6,
				opacity: start_opacity
			});
			container.add( access_button );
				
				var access_text = lvc_ui.create_label();				
					access_text.text = json_data.access.access_text;
					access_text.font = { 
											fontSize: 14,
											fontFamily: settings.get_font( 'GR-Medium' )
										};
					access_text.color = '#FFFFFF';
				access_button.add( access_text );
				access_button.addEventListener( 'click', access_button_clicked );
			
				
			var bottom_container = Ti.UI.createView({
				left: 0, top: device_height-120,
				width: device_width, height: 120,		
				backgroundColor: settings.get_color( 'white' ),
				opacity: start_opacity
			});
			container.add( bottom_container );
/*				
				var ref_text = Ti.UI.createLabel({
					left: 70, 
					width: 190, height: 15,		
					text: json_data.access.reference_text,
					font: { fontSize: 14, fontFamily: settings.get_font( 'G-Book' ) },
					color: '#666666' 			
				});	
				bottom_container.add( ref_text );
*/				
				var company_logos = Ti.UI.createView({
					left: 725, 
					width: 251, height: 46,		
					backgroundImage: 'includes/images/access/company_logos.png',
					opacity: start_opacity
				});
				bottom_container.add( company_logos );		
				


////////////////////////////////////////////////////
//FUNCTIONS
////////////////////////////////////////////////////

function access_button_clicked () {
	
	print( "access_button_clicked" );
	
	var valid_access_code = validate_access_code();
	
	if ( valid_access_code ) {
		
		// LOAD DEFAULTS
//		Ti.include('includes/engine/defaults/'+data_store.country_id+'.js' );	
		defaults 	= require('includes/engine/defaults/'+data_store.country_id+'.js');
		_default 	= defaults.init();
		engine.reset_data();
		engine.re_calculate();
		
		screen_controller.switch_screen_state_function( 'Overview' );
		
	} else {
		
		error_text.text = json_data.access.error_message;
		
	}
	
} 
	
function validate_access_code () {
	
	var match = false;
	
	for ( var i=0; i < access_codes.length; i++ ) {
		
		if ( input_field.value == access_codes[ i ].password ) { 
			data_store.country_id = access_codes[ i ].id;
			match = true;
		}	
	}
	
	return match;

}




////////////////////////////////////////////////////
//RUN FUNCTIONS
////////////////////////////////////////////////////

	return self;
	
}

module.exports = this_class;