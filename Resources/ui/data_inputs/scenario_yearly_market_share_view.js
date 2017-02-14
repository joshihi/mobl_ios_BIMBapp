function this_class( diabetes_selection, callback ) {



////////////////////////////////////////////////////
//VARS
////////////////////////////////////////////////////

	var row_height = 50;
	var padding = 40;
	var table_width = 400;
	var year_count = 5;
	
	if ( diabetes_selection == 1 ) {
		var row_default = 39;
		var row_custom = 187;
	} else if ( diabetes_selection == 2 ) {
		var row_default = 65;
		var row_custom = 209;
	} else {
		diabetes_selection = 1;
	}
	
////////////////////////////////////////////////////
//UI
////////////////////////////////////////////////////
		
		
////////////////////////////////////////////////////
//FUNCTIONS
////////////////////////////////////////////////////
	
	var self = Ti.UI.createView({
		left: 0, top: 0,
		width: Ti.UI.SIZE, height: Ti.UI.SIZE,
		layout: 'vertical'
	});
		
		var section_header_view = Ti.UI.createLabel ({
		    left: 24, top: 0,
		    width: Ti.UI.SIZE, height: 50,
		    font: { fontSize: 12, fontFamily: settings.get_font( 'GR-Bold' ) },
			color: settings.get_color( 'brown' ),				
		    text: 'Market Share Prediction'
		});
		self.add( section_header_view );
			
		var container = Ti.UI.createView({
		    left: 0, top: 0,
		    width: table_width, height: row_height*2,
			//borderRadius: 20,
			backgroundColor: '#dedede',
			layout: 'vertical'	    
		});
		self.add( container );
/*			
			var row_1 = Ti.UI.createView({
		        left: padding/2, top: 0,
		        width: Ti.UI.FILL, height: row_height,
		        layout: 'horizontal'
		    });
			container.add( row_1 );
				
				var year_array = engine.get_years_array();
				
				for ( var i=0; i<year_count;i++ ) {
							
					var label = Ti.UI.createLabel ({
					    left: 0, top: 10,
					    width: (table_width-padding)/year_count, height: 30,
					   	font: { fontSize: 11, fontFamily: settings.get_font( 'GR-Bold' ) },
						color: settings.get_color( 'brown' ),				
					    text: year_array[i],		
					    textAlign: 'center',
					    id: i
					});
					
					//if ( i > 0 ) label.text = year_array[i-1];
					
					row_1.add( label );
					
				}
*/			
			var row_2 = Ti.UI.createView({
		        left: padding/2, top: 0,
		        width: Ti.UI.FILL, height: row_height,
		        layout: 'horizontal'
		    });
			container.add( row_2 );
				
				var label = Ti.UI.createLabel ({
				    left: 0, top: 10,
				    width: (table_width-padding)/(year_count+1), height: 30,
				   	font: { fontSize: 11, fontFamily: settings.get_font( 'GR-Bold' ) },
					color: settings.get_color( 'brown' ),				
				    text: 'Base case',		
				    textAlign: 'center',
				    id: i
				});
				row_2.add( label );
								
				for ( var i=0; i<year_count;i++ ) {
					
					var col = i+4;
					var market_share_value = engine.get_value( row_default, col );
							
					var label = Ti.UI.createLabel ({
					    left: 0, top: 10,
					    width: (table_width-padding)/(year_count+1), height: 30,
					   	font: { fontSize: 11, fontFamily: settings.get_font( 'Gotham-Book' ) },
						color: settings.get_color( 'brown' ),				
					    text: dp_2( market_share_value ),		
					    textAlign: 'center',
					    id: i
					});
					row_2.add( label );
					
				}
			
			var row_3 = Ti.UI.createView({
		        left: padding/2, top: 0,
		        width: Ti.UI.FILL, height: row_height,
		        layout: 'horizontal'
		    });
			container.add( row_3 );
				
				var label = Ti.UI.createLabel ({
				    left: 0, top: 10,
				    width: (table_width-padding)/(year_count+1), height: 30,
				   	font: { fontSize: 9, fontFamily: settings.get_font( 'GR-Bold' ) },
					color: settings.get_color( 'brown' ),				
				    text: 'Market share scenario',		
				    textAlign: 'center',
				    id: i
				});
				row_3.add( label );
				
				for ( var i=0; i<year_count;i++ ) {
					
					var col = i+4;	
					var market_share_value = engine.get_value( row_custom, col );
							
					var text_field = Ti.UI.createTextField ({
					    left: 0, top: 10,
					    width: (table_width-padding)/(year_count+1), height: 30,
					   	font: { fontSize: 11, fontFamily: settings.get_font( 'Gotham-Book' ) },
						color: settings.get_color( 'brown' ),				
					    value: dp_2( market_share_value ),
					    backgroundColor: '#FFFFFF',			
					    textAlign: 'center',
					    id: i,
					    row: row_custom,
					    col: col
					});
					row_3.add( text_field );
					text_field.addEventListener( 'change', user_value_updated );
					
				}	
				
				
	
	
////////////////////////////////////////////////////
//RUN FUNCTIONS
////////////////////////////////////////////////////
	
	function user_value_updated ( e ) {
				
		var obj = e.source;
							
		var user_value = obj.value;
		if ( user_value != '' ) user_value = parseFloat( user_value );
		if ( isInt( user_value ) || isFloat( user_value ) || user_value == '' || user_value == 0 ) {			
			engine.update_value( obj.row, obj.col, user_value );
			engine.re_calculate();
			if ( callback ) callback();
		}
		
	};
		
	return self;
	
}

module.exports = this_class;