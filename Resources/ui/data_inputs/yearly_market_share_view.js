function this_class( diabetes_selection, type ) {



////////////////////////////////////////////////////
//VARS
////////////////////////////////////////////////////

	var row_height = 50;
	var padding = 40;
	var table_width = 400;
	var year_count = 5;
	
	if ( diabetes_selection == 't1dm' ) {
		var row = 39;
	} else if ( diabetes_selection == 't2dm' ) {
		var row = 65;
	} 
	
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
		
		var header = Ti.UI.createView({
			left: 0, top: 0,
			width: Ti.UI.FILL, height: Ti.UI.SIZE,
			layout: 'horizontal'
		});
		self.add( header );
		
			var section_header_view = Ti.UI.createLabel ({
			    left: 24, top: 0,
			    width: Ti.UI.SIZE, height: 50,
			    font: { fontSize: 12, fontFamily: settings.get_font( 'GR-Bold' ) },
				color: settings.get_color( 'brown' ),				
			    text: diabetes_selection.toUpperCase() + ' Market Share Prediction (%)'
			});
			header.add( section_header_view );
			
			var i_button = Ti.UI.createButton ({
			    left: 10,
			    width: 17, height: 17,
			    backgroundImage: 'includes/images/data_inputs/i_icon.png'
			});
			header.add( i_button );
			i_button.addEventListener( 'click', button_clicked );
			
		var container = Ti.UI.createView({
		    left: 0, top: 0,
		    width: table_width, height: Ti.UI.SIZE,
			//borderRadius: 20,
			backgroundColor: '#eeeeee',
			layout: 'vertical'	    
		});
		self.add( container );
			
//			var spacer = create_spacer();
//			container.add( spacer );
			
			var sub_title = Ti.UI.createLabel ({
			    left: padding/2, top: 10, 
			    width: Ti.UI.FILL, height: Ti.UI.SIZE,
			   	font: { fontSize: 10, fontFamily: settings.get_font( 'Gotham-Book' ) },
				color: settings.get_color( 'brown' ),								
			    text: 'Please enter market share ',
			    textAlign: 'left'
			});
			container.add( sub_title );
			
			var row_one = Ti.UI.createView({
		        left: padding/2, top: 10,
		        width: Ti.UI.FILL, height: Ti.UI.SIZE,
		        layout: 'horizontal'
		    });
			container.add( row_one );
				
				
				
				for ( var i=0; i<year_count;i++ ) {
					
					var cell_pos = 4+i;
						
					var market_share_value = engine.get_value( row, cell_pos );
							
					var text_field = Ti.UI.createTextField ({
					    left: 0, top: 0,
					    width: (table_width-padding)/year_count, height: 30,
					   	font: { fontSize: 11, fontFamily: settings.get_font( 'Gotham-Book' ) },
						color: settings.get_color( 'brown' ),				
					    value: dp_2( market_share_value ),
					    backgroundColor: '#FFFFFF',			
					    textAlign: 'center',
					    id: cell_pos
					});
					row_one.add( text_field );
					text_field.addEventListener( 'change', user_value_updated );
					
					if ( 1 > 0 ) {
						text_field.left = 2;
						text_field.width = text_field.width - 2;	
					}
											
				}	
			
			var end_spacer = create_spacer();
			container.add( end_spacer );
			
////////////////////////////////////////////////////
//RUN FUNCTIONS
////////////////////////////////////////////////////
	
	function button_clicked () {
		var dialog = Ti.UI.createAlertDialog({
		    message: "Please enter market share \nMarket share = percentage of eligible market that are expected to take up Basaglar",
		    ok: 'Okay',
		    title: ''
		});
		dialog.show();
		//alert(  );
		
	};
	
	function user_value_updated ( e ) {
				
		var obj = e.source;						
		var user_value = obj.value;
		if ( user_value != '' ) user_value = parseFloat( user_value );
		if ( isInt( user_value ) || isFloat( user_value ) || user_value == '' || user_value == 0 ) {		
			engine.update_value( row, obj.id, user_value );			
		}
		
	};
		
	return self;
	
}

module.exports = this_class;