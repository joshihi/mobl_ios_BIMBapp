function this_class() {

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	
////////////////////////////////////////////////////
//VARS
////////////////////////////////////////////////////
	
	var settings = {};
	settings.ani_speed = 500;
	
	// szabi’s guid
	// 7a695760-6664-4b66-9333-c8fff8e5ddc5
	
	//DEBUG	
	settings.debug_mode = false;
	settings.debug_screen = 'Tornado';
	//settings.debug_screen = 'PI';
	//settings.debug_screen = 'Appendix 1';
	//settings.debug_screen = 'Bibliography';
	//settings.debug_screen = 'Access';
//	settings.debug_screen = 'PI';
//	settings.debug_screen = 'Appendix';
	//settings.debug_screen = 'Bibliography';
	settings.debug_screen = 'Data Inputs';
	//settings.debug_screen = 'Introduction';
	settings.debug_screen = 'Assumptions';
	//settings.debug_screen = 'Biosimilars';
//	settings.debug_screen = 'Results';
//	settings.debug_screen = 'Overview';
//	settings.debug_screen = 'Introduction';
	//settings.debug_screen = 'engine_tester';
//	settings.debug_screen = 'new_engine';
	settings.debug_screen = 'Budget Impact';
//	settings.debug_screen = 'Tornado';
	
	settings.session = {};
	settings.graph_save_speed = 1500;
	
	//COLORS		
	settings.get_color = function( id ){

		if ( id == "brown" ) 			return '#362c28';
		if ( id == "light_green" ) 		return '#69c083';
		if ( id == "dark_green" ) 		return '#b9b219';
		if ( id == "white" ) 			return '#FFFFFF';
		if ( id == "purple" ) 			return '#a597c8';
		if ( id == "light_grey" ) 		return '#EEEEEE';
		if ( id == "pink" ) 			return '#b83d88'; 
		if ( id == "lime_green" ) 		return '#999933';
		if ( id == "light_blue" ) 		return '#39b0bd';
		if ( id == "dark_orange" ) 		return '#dbab00';
		
		if ( id == "bg_green" ) 		return '#69c083';
		if ( id == "border_green" ) 		return '#76cc90';
		
		
	};
	
	//FONT
	settings.get_font = function( id ){
		
		if ( id == "GR-Bold" ) return 'GothamRounded-Bold';
		if ( id == "GR-Book" ) return 'GothamRounded-Book';
		if ( id == "G-Book" ) return 'Gotham-Book';
		if ( id == "G-BookItalic" ) return 'Gotham-BookItalic';
		if ( id == "GR-Medium" ) return 'GothamRounded-Medium';
		
	};
	
	//CSS
	settings.get_css = function() {
		return '<link rel="stylesheet" href="includes/css/style.css" type="text/css">';
	};

	//JSON
	settings.json_file = "app_structure.json";	
	settings.content_path = settings.directory + "includes/json/";
		 	
	return settings;
}

module.exports = this_class;