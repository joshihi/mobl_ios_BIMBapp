function this_class(  ) {



////////////////////////////////////////////////////
//VARS
////////////////////////////////////////////////////

	var row_height = 50;
	var padding = 40;
	var table_width = 400;
	var year_count = 5;
	
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
		    text: 'Enter Base Year'
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
				
				for ( var i=0; i<year_count;i++ ) {
					var label = Ti.UI.createLabel ({
					    left: 0, top: 5,
					    width: (table_width-padding)/year_count, height: row_height,
					   	font: { fontSize: 11, fontFamily: settings.get_font( 'Gotham-Book' ) },
						color: settings.get_color( 'brown' ),				
					    text: 'Year ' + (i+1),
					    textAlign: 'center'
					});
					row_one.add( label );
				}
			
			var row_two = Ti.UI.createView({
		         left: padding/2, top: 0,
		        width: Ti.UI.FILL, height: Ti.UI.SIZE,
		        layout: 'horizontal'
		    });
			container.add( row_two );
			
				var years_array = new Array();
				var base_year = _default.base_year;
		
				for ( var i=0; i<year_count;i++ ) {
					
					if ( i==0 ) {
						
						var text_field = Ti.UI.createTextField ({
						    left: 0, top: 0,
						    width: (table_width-padding)/year_count, height: 40,
						   	font: { fontSize: 11, fontFamily: settings.get_font( 'Gotham-Book' ) },
							color: settings.get_color( 'brown' ),				
						    value: base_year,
						    backgroundColor: '#FFFFFF',			
						    textAlign: 'center'
						});
						row_two.add( text_field );
						text_field.addEventListener( 'change', user_value_updated );
				
						
					} else {
						
						var label = Ti.UI.createLabel ({
						    left: 0, top: 0,
						    width: (table_width-padding)/year_count, height: 40,
						   	font: { fontSize: 11, fontFamily: settings.get_font( 'Gotham-Book' ) },
							color: settings.get_color( 'brown' ),								
						    text: (base_year+i),
						    textAlign: 'center'
						});
						row_two.add( label );
						years_array.push( label );
						
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
		if ( isInt( user_value ) ) {
			_default.base_year = user_value;
			update_all_labels();
		}
		
	};
		
	function update_all_labels(){
		
		var base_year = _default.base_year;
		
		for ( var i=0; i<years_array.length; i++ ) {
			years_array[i].text = base_year+(i+1);	
		}
		
	};	
	
	return self;
	
}

module.exports = this_class;