////////////////////////////////////////////////////
// IMS - Lily Basaglar App
// 3rd December 2015
// Author: Vaughan Barwood @ LVC
////////////////////////////////////////////////////
//
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


// passwords: Sau1, Mal2, Sou3, Egy4


////////////////////////////////////////////////////
//CLASSES
////////////////////////////////////////////////////

// SETTINGS
var settings_class = require('classes/settings');
var settings = new settings_class();

// SCREEN CONTROLLER
var screen_controller_class = require('classes/screen_controller');
var screen_controller = new screen_controller_class();

// LAYERS
var layers_class = require('classes/layers');
var layers = new layers_class();

// Graphs
var graphs_class = require('classes/graphs_c3');
var graphs = new graphs_class();

// LVC_UI
var lvc_ui_class = require('classes/lvc_ui');
var lvc_ui = new lvc_ui_class();

// SIDE_MENU
var side_menu_class = require('ui/side_menu');

// DOT INDICATOR
var dot_indicator_class = require('ui/dot_indicator');

// DOT INDICATOR
var results_type_selector_class = require('ui/results_type_selector');

var leavepiece_html_class = require('ui/leavepiece_html');

//var country_obj = require( 'classes/default_manager' );
var engine = require('classes/new_engine');
var button_class = require('ui/button_class');


//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

////////////////////////////////////////////////////
//VARS
////////////////////////////////////////////////////

var _defaults = {};
var json_data = [];

var device_width = Ti.Platform.displayCaps.platformWidth;
var device_height = Ti.Platform.displayCaps.platformHeight;

		
var data_store = {
	country_id: 'saudi',
	lantus: true,
	toujeo: false,
	merck_insulin_glargine: false,
	biocon_insulin_glargine: false,
	diabetes_type: 3,
	age: 1,
	duration_of_diabetes: 4,
	drug_prices: 2,
	drug_type: 2,
	scenario_drug_prices: 1,
	tornando_outcome: 1,
	tornando_percentage: 10,
	know_population: true
};


//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

////////////////////////////////////////////////////
//UI
////////////////////////////////////////////////////

var app_window = Ti.UI.createWindow( { width: device_width, height: device_height, fullscreen:true, navBarHidden:true, backgroundColor: settings.get_color( 'white' ), window_id:'home'  } );
app_window.open();
//layers.add_layer_function( app_window );


//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

////////////////////////////////////////////////////
//FUNCTIONS
////////////////////////////////////////////////////


function launch_app_function() {

	
	//set the JSON file
	set_app_data();
		
	if ( !settings.debug_mode ) {
		print( "LIVE Launch" );	
		screen_controller.change_screen_function( 'Access' );	
	} else {
		print( "DEBUG Launch" );
		
		// LOAD DEFAULTS
//		Ti.include('includes/engine/defaults/'+data_store.country_id+'.js' );	
		defaults 	= require('includes/engine/defaults/'+data_store.country_id+'.js');
		_default 	= defaults.init();
		// NEW ENGINE
		engine = require('classes/new_engine');
		// SET ENGINE DATA
		engine.reset_data();
		engine.re_calculate();
		
		engine.print_everything();
		print( settings.debug_screen );	
		screen_controller.change_screen_function( settings.debug_screen );
		
//		leavepiece_html_class.test_html();		
//		leavepiece_html_class.save_image();
		
	}
	
}

function print(e){
	
	Ti.API.info(e);

}


function set_app_data () {
		
	var file = Titanium.Filesystem.getFile( "includes/json/app_structure.json" );    	 
	var pre_parse_data = ( file.read().text ); 
	json_data = JSON.parse( pre_parse_data ); 
	
};

function dp_2 ( args ) {
		
		if (  typeof args === 'undefined' || typeof args[0] === 'undefined' ) {
			
			args = (Math.round( args * 100 ) / 100).toFixed(2);
			
			return args;
					
		} else {
					
			for ( var i=0; i<args.length; i++ ){
			
				args[i] = (Math.round( args[i] * 100 ) / 100).toFixed(2);
						
			}
			
			return args;
			
		}
};	

function with_commas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

function isInt(n){
    return Number(n) === n && n % 1 === 0;
};

function isFloat(n){
    return Number(n) === n && n % 1 !== 0;
};
	
function valid_int(value) {
  return !isNaN(value) && (function(x) { return (x | 0) === x; })(parseFloat(value));
};

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

function get_type_name() {
	if ( data_store.diabetes_type == 1 ) {
		return 'T1DM';	
	} else if ( data_store.diabetes_type == 2 ) {
		return 'T2DM';
	} else {
		return 'T1DM & T2DM';
	}
};

function create_spacer() {
	var spacer = Ti.UI.createView({
		left: 0, top: 0, width: '100%', height: 15
	});
	return spacer;
};
function create_row_spacer() {
	var spacer = Ti.UI.createTableViewRow({
		left: 0, top: 0, width: '100%', height: 10
	});
	return spacer;
};

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

////////////////////////////////////////////////////
//RUN FUNCTIONS
////////////////////////////////////////////////////

launch_app_function();