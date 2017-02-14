function this_class( header, array ) {



////////////////////////////////////////////////////
//VARS
////////////////////////////////////////////////////
	
	var input_row_class = require('ui/data_inputs/input_row');
		
	var row_height = 50;
	var padding = 25;
	var table_width = 400;
	
////////////////////////////////////////////////////
//UI
////////////////////////////////////////////////////

		
		
////////////////////////////////////////////////////
//FUNCTIONS
////////////////////////////////////////////////////
	
	var row_array = new Array();
	
	var self = Ti.UI.createView({
		left: 0, top: 0,
		width: Ti.UI.FILL, height: Ti.UI.SIZE,
		layout: 'vertical'
	});
			
		var section_header_view = Ti.UI.createLabel ({
		    left: 24, top: 0,
		    width: Ti.UI.SIZE, height: 50,
		    font: { fontSize: 12, fontFamily: settings.get_font( 'GR-Bold' ) },
			color: settings.get_color( 'brown' ),				
		    text: header
		});
		self.add( section_header_view );
		
		
		var table_view = Ti.UI.createView({
		    left: 0, top: 0,
		    width: table_width, height: Ti.UI.SIZE,
			//borderRadius: 20,
			backgroundColor: '#eeeeee',
			layout: 'vertical'
		});
		self.add( table_view );
		
		add_rows();
			
	
////////////////////////////////////////////////////
//RUN FUNCTIONS
////////////////////////////////////////////////////
	
	function add_rows() {
		
		
		var start_spacer = create_row_spacer();
		row_array.push( start_spacer );
				
		for(var i=0; i < array.length; i++){
			
			var row = input_row_class( array[i] );
			if ( array[i].data_store_ref ) row.data_store_ref = array[i].data_store_ref;
			
			if ( i < array.length - 1 ) {
				var line = Ti.UI.createView({
					left: 25, right: 25, width: Ti.UI.FILL, height: 1, backgroundColor: '#c1c1c1'
				});
				row.add( line );
			}
			table_view.add( row );
			row_array.push( row );
			
		}
		
		var end_spacer = create_row_spacer();
		row_array.push( end_spacer );
		
	}
	
	self.update = function () {

		for ( var i = 0; i < row_array.length; i++ ) {
			
			if ( row_array[i].data_store_ref ) {
				
				if ( data_store[ row_array[i].data_store_ref ] == true ) {
					row_array[i].height = row_height;				
				} else {
					row_array[i].height = 0;
				}
				
			}
			
		}
		
	};
	return self;
	
}

module.exports = this_class;