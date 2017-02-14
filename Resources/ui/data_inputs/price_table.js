function this_class( args ) {



////////////////////////////////////////////////////
//VARS
////////////////////////////////////////////////////
	
	var array = args.rows_array ;
	
	var price_table_row = require('ui/data_inputs/price_table_row');
		
	var row_height = 50;
	var padding = 25;
	
	var row_array;
	
	var cell_width = 82;
			
	
////////////////////////////////////////////////////
//UI
////////////////////////////////////////////////////

		
		
////////////////////////////////////////////////////
//FUNCTIONS
////////////////////////////////////////////////////
	
	var self = Ti.UI.createView({
		left: 0, top: 0,
		width: Ti.UI.FILL, height: Ti.UI.SIZE,
		layout: 'vertical',
		backgroundColor: '#EEEEEE'
	});
		
		var table_title = Ti.UI.createLabel({
			left: 0, top: 20,
			width: '100%', height: Ti.UI.SIZE,
			font: { fontSize: 24, fontFamily: settings.get_font( 'GR-Bold' ) },
			color: settings.get_color( 'brown' ),
			textAlign: 'center',
			text: args.title
		});
		self.add( table_title );
		
		var table_view = Ti.UI.createView({
		    left: 0, top: 0,
		    width: Ti.UI.FILL, height: Ti.UI.SIZE,
			layout: 'vertical'
				    
		});
		self.add( table_view );
		
		get_heading_row();
		
		for ( var i=1; i<array.length; i++ ) {
			
			var row = price_table_row( array[i], i );
			if ( array[i][0].id ) row.id = array[i][0].id;
			
			if ( i < array.length - 1 ) {
				var line = Ti.UI.createView({
					left: 25, right: 25, bottom: 0, width: Ti.UI.FILL, height: 1, backgroundColor: '#c1c1c1'
				});
				row.add( line );
			}
			
			row_array.push( row );
			
			table_view.add( row );
		
		}
			
		
		
		
		
	
////////////////////////////////////////////////////
//RUN FUNCTIONS
////////////////////////////////////////////////////
	
	function get_heading_row() {
		
		row_array = new Array();
		
		var row = Ti.UI.createView({
			left: 0, top: 0, 
			width: Ti.UI.FILL, height: row_height,
			layout:'horizontal',		
       		backgroundColor: '#eeeeee'	
		});
			
			//var width = 111;
			
			for(var i=0; i < array[0].length; i++){
				
				var cell = Ti.UI.createLabel({
					left: 0, top: 0,
					width: cell_width, 
					height: '100%',
					font: { fontSize: 12, fontFamily: settings.get_font( 'GR-Bold' ) },
					color: settings.get_color( 'brown' ),
					textAlign: 'center',
					text: array[0][i].value
				});
				row.add( cell );
				
				if ( i == 0 ) {
					cell.left = 25;
					cell.width = (cell_width*1.5) - cell.left;
					cell.textAlign = 'left';
				}
				
			}
		
		row_array.push( row );
		
		table_view.add( row );	
		
	}
	
	self.slider_updated = function () {
		for ( var i=0; i<row_array.length; i++ ) {
			
			if (typeof row_array[i]['update_by_other_element'] == 'function' ) {
				row_array[i].update_by_other_element();
			}
			
		}
	};
	
	self.update_table_data = function () {
		
		for ( var i=0; i<row_array.length; i++ ) {
			
			if (typeof row_array[i]['update_by_other_element'] == 'function' ) {
				row_array[i].update_by_other_element();
			}
			
		}
		
	};
	
	self.update = function () {
		
		for ( var i = 0; i < row_array.length; i++ ) {
			
			if ( row_array[i].id ) {
				
				if ( data_store[ row_array[i].id ] == true ) {
					row_array[i].height = row_height + 10;					
				} else {
					row_array[i].height = 0;
				}
				
			}
			
		}
		
	};
	
	return self;
	
}

module.exports = this_class;