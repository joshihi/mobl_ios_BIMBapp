function this_class() {

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	
////////////////////////////////////////////////////
//VARS
////////////////////////////////////////////////////
	var self = {};
	
	var _current_screen;

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

////////////////////////////////////////////////////
//FUNCTIONS
////////////////////////////////////////////////////
	self.change_screen_function = function ( window_id ) {
		
		_current_screen = window_id;
		
		var screen_file_path = '';
	
		if ( window_id == 'Access' ) 								screen_file_path = 'ui/access'; 
		if ( window_id == 'Overview' ) 								screen_file_path = 'ui/overview'; 
		if ( window_id == 'Introduction' ) 							screen_file_path = 'ui/introduction'; 
		if ( window_id == 'Biosimilars' ) 							screen_file_path = 'ui/biosimilars'; 
		if ( window_id == 'Heritage' ) 								screen_file_path = 'ui/heritage'; 
		if ( window_id == 'Model' || window_id == 'Model Flow' ) 	screen_file_path = 'ui/model'; 
		if ( window_id == 'Assumptions' ) 							screen_file_path = 'ui/assumptions'; 
		if ( window_id == 'engine_tester' ) 						screen_file_path = 'ui/engine_tester'; 
		if ( window_id == 'Data Inputs' ) 							screen_file_path = 'ui/data_inputs'; 
		if ( window_id == 'Results' ) 								screen_file_path = 'ui/results'; 
		if ( window_id == 'Budget Impact' ) 						screen_file_path = 'ui/budget_impact'; 
		if ( window_id == 'Report' ) 								screen_file_path = 'ui/report'; 
		if ( window_id == 'Market Share Scenario' ) 				screen_file_path = 'ui/market_share_scenario'; 
		if ( window_id == 'Appendix' ) 								screen_file_path = 'ui/appendix'; 
		if ( window_id == 'References' ) 							screen_file_path = 'ui/references'; 
		if ( window_id == 'Prescribing Information' ) 				screen_file_path = 'ui/pi'; 
		if ( window_id == 'Tornado' ) 								screen_file_path = 'ui/tornado'; 
		if ( window_id == 'new_engine' ) 							screen_file_path = 'classes/new_engine'; 
		
		print( 'screen_file_path ' + screen_file_path );
		
		var temp_class = require( screen_file_path );
		var temp_window = new temp_class();
		layers.add_layer_function( temp_window );
		
	};
	
	self.get_current_screen_id = function () {
		return _current_screen;	
	};
	
	self.switch_screen_state_function = function ( new_window_id ) {
		
		var current_window = layers.top_layer_function();
		current_window.animate({ opacity:0, duration: 250 }, function() {
			layers.remove_layer_function();
			self.change_screen_function( new_window_id );
		});
		
	};
	
	
	return self;
}

module.exports = this_class;