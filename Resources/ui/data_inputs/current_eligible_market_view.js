function this_class( diabetes_selection ) {



////////////////////////////////////////////////////
//VARS
////////////////////////////////////////////////////

	var row_height = 45;
	var padding = 40;
	var table_width = 400;
	var year_count = 5;
	
	if ( diabetes_selection == 't1dm' ) {
		var row_default = 36;
		var row_custom = 33;
	} else {
		var row_default = 62;
		var row_custom = 59;
	} 
	
	var labels_array = new Array();
	
////////////////////////////////////////////////////
//UI
////////////////////////////////////////////////////

		
		
////////////////////////////////////////////////////
//FUNCTIONS
////////////////////////////////////////////////////
	
	var self = Ti.UI.createView({
		left: 0, top: 0,
		width: Ti.UI.FILL, height: Ti.UI.SIZE,
		layout: 'vertical'
	});
		
		var section_header_view = Ti.UI.createLabel ({
		    left: 24, top: 0,
		    width: Ti.UI.FILL, height: 50,
		    font: { fontSize: 12, fontFamily: settings.get_font( 'GR-Bold' ) },
			color: settings.get_color( 'brown' ),				
		    text: diabetes_selection.toUpperCase() + ' Current Eligible Market'
		});
		self.add( section_header_view );
			
		var container = Ti.UI.createView({
		    left: 0, top: 0,
		    width: table_width, height: Ti.UI.SIZE,
			//borderRadius: 20,
			backgroundColor: '#eeeeee',
			layout: 'vertical'	    
		});
		self.add( container );
		
			var row_one = Ti.UI.createView({
		        left: padding/2, top: 0,
		        width: Ti.UI.FILL, height: Ti.UI.SIZE,
		        layout: 'horizontal'
		    });
			container.add( row_one );
				
				var sub_title = Ti.UI.createLabel ({
				    left: 0, top: 10, 
				    width: Ti.UI.FILL, height: Ti.UI.SIZE,
				   	font: { fontSize: 10, fontFamily: settings.get_font( 'Gotham-Book' ) },
					color: settings.get_color( 'brown' ),								
				    text: 'Current eligible market',
				    textAlign: 'left'
				});
				row_one.add( sub_title );
					
				for ( var i=0; i<year_count;i++ ) {
					
					var cell_pos = 4+i;
						
					var value = with_commas( Math.round( engine.get_value( row_default, cell_pos ) ) );
							
					var label = Ti.UI.createLabel ({
					    left: 0, top: 10,
					    width: (table_width-padding)/year_count, height: 30,
					   	font: { fontSize: 11, fontFamily: settings.get_font( 'Gotham-Book' ) },
						color: settings.get_color( 'brown' ),								
					    text: value,
					    row: with_commas( Math.round( row_default ) ),
					    col: cell_pos,
					    backgroundColor: '#c1c1c1',
					    textAlign: 'center'
					});
					labels_array.push( label );
					row_one.add( label );
					
					if ( 1 > 0 ) {
						label.left = 2;
						label.width = label.width - 2;	
					}
						
				}
			
			Ti.App.addEventListener( 'engine_refresh', function() {
				update_from_engine( ); 
			});
			
			var row_two = Ti.UI.createView({
		        left: padding/2, top: 0,
		        width: Ti.UI.FILL, height: Ti.UI.SIZE,
		        layout: 'horizontal'
		    });
			container.add( row_two );
				
				var sub_title_2 = Ti.UI.createLabel ({
				    left: 0, top: 10, 
				    width: Ti.UI.FILL, height: Ti.UI.SIZE,
				   	font: { fontSize: 10, fontFamily: settings.get_font( 'Gotham-Book' ) },
					color: settings.get_color( 'brown' ),								
				    text: 'User defined eligible market',
				    textAlign: 'left'
				});
				row_two.add( sub_title_2 );
				
				for ( var i=0; i<year_count;i++ ) {
					
					var cell_pos = 4+i;
							
					var text_field = Ti.UI.createTextField ({
					    left: 0, top: 10,
					    width: (table_width-padding)/year_count, height: 30,
					   	font: { fontSize: 11, fontFamily: settings.get_font( 'Gotham-Book' ) },
						color: settings.get_color( 'brown' ),				
					    value: '',
					    backgroundColor: '#FFFFFF',			
					    textAlign: 'center',
					    id: cell_pos,
					    row: row_custom
					});
					row_two.add( text_field );
					text_field.addEventListener( 'change', user_value_updated );
					
					if ( engine.get_value( row_custom, cell_pos ) != 0 && engine.get_value( row_custom, cell_pos ) != engine.get_value( row_custom+1, cell_pos ) ) text_field.value = Math.round( engine.get_value( row_custom, cell_pos ) );
					
					if ( 1 > 0 ) {
						text_field.left = 2;
						text_field.width = text_field.width - 2;	
					}
				}		
			
			var spacer = create_spacer();
			container.add( spacer );
	
////////////////////////////////////////////////////
//RUN FUNCTIONS
////////////////////////////////////////////////////
	
	function user_value_updated ( e ) {
				
		var obj = e.source;						
		var user_value = obj.value;
		if ( user_value != '' ) user_value = parseFloat( user_value );
		if ( isInt( user_value ) || isFloat( user_value ) || user_value == '' || user_value == 0 ) {		
			engine.update_value( obj.row, obj.id, user_value );			
		}
		
	};
	
	function update_from_engine ( e ) {
		
		for ( var i=0; i<labels_array.length; i++ ) {
			
			var obj = labels_array[i];
			
			obj.text = with_commas( Math.round( engine.get_value( obj.row, obj.col ) ) );	
			
		}
		
	};
		
	return self;
	
}

module.exports = this_class;