function this_class( ) {



////////////////////////////////////////////////////
//VARS
////////////////////////////////////////////////////

	var row_height = 50;
	var padding = 25;	
	var row_ids_array = [
		{ id:'lantus', title: 'Lantus', row: 127, col: 1 },
		{ id:'toujeo', title: 'Toujeo', row: 128, col: 1, ref: 'Please note: list price for Toujeo is not available. Add in expected daily cost.' },
		{ id:'merck_insulin_glargine', title: 'Merck Insulin Glargine', row: 129, col: 1 },
		{ id:'biocon_insulin_glargine', title: 'Biocon Insulin Glargine', row: 130, col: 1 },
		{ title: 'Basaglar', row: 131, col: 1 }
	];
	var value_array = new Array();
	
	var row_array = new Array();
	
////////////////////////////////////////////////////
//UI
////////////////////////////////////////////////////

		
		
////////////////////////////////////////////////////
//FUNCTIONS
////////////////////////////////////////////////////
	
	var self = Ti.UI.createView({
		left: 0, top: 25,
		width: Ti.UI.FILL, height: Ti.UI.SIZE,
		backgroundColor: '#EEEEEE'
	});
		
		var container = Ti.UI.createView({
			left: padding, top: 10, right: padding, bottom: 10,
			width: Ti.UI.FILL, height: Ti.UI.SIZE,
			layout: 'vertical'
		});
		self.add( container );
			
			var headings = get_heading_row();
			container.add( headings );
			
			for ( var i=0; i<row_ids_array.length; i++ ) {
				
				var row = create_row( row_ids_array[i], i );				
				container.add( row );
				row_array.push( row );
							
				if ( i < row_ids_array.length - 1 ) {
					row.line = Ti.UI.createView({
						left: 0, right: 0, bottom: 0, width: Ti.UI.FILL, height: 1, backgroundColor: '#c1c1c1'
					});
					container.add( row.line );
				}
				
				
			}

		Ti.App.addEventListener( 'engine_refresh', function() {
			update_from_engine(); 
		});
	
////////////////////////////////////////////////////
//FUNCTIONS
////////////////////////////////////////////////////
	
	function create_row( args, i ) {
		
		var row = Ti.UI.createView({
			left: 0, top: 0, 
			width: Ti.UI.FILL, height: row_height,
			layout:'horizontal',		
       		backgroundColor: '#eeeeee'
		});
		if ( args.id ) row.id = args.id;
			
			var title = Ti.UI.createLabel({
				left: 0, top: 0,
				width: '50%', 
				height: row_height,
				font: { fontSize: 14, fontFamily: settings.get_font( 'GR-Bold' ) },
				color: settings.get_color( 'brown' ),
				textAlign: 'left',
				text: args.title
			});
			row.add( title );
			
			if ( args.ref ) {
				var ref_button = Ti.UI.createButton ({
				    left: -17, top: 16,
				    width: 17, height: 17,
				    backgroundImage: 'includes/images/data_inputs/i_icon.png',
				    ref: args.ref //, backgroundColor: 'green', opacity: 0.5
				});
				row.add( ref_button );
				ref_button.addEventListener( 'click', ref_button_clicked );
			}
			
			var value = Ti.UI.createLabel({
				left: 0, top: 2,
				width: '50%', 
				height: row_height - 7,
				font: { fontSize: 14, fontFamily: settings.get_font( 'GR-Book' ) },
				color: settings.get_color( 'brown' ),
				textAlign: 'center',
				row: args.row,
				col: args.col,
				text: with_commas( dp_2( engine.get_value( args.row, args.col ) ) ),
				backgroundColor: '#c1c1c1'
				
			});
			row.add( value );
			value_array.push( value );
		
		return row;	
		
	};
	
	function get_heading_row() {
		
		var array = [ 'Treatment', 'Weighted annual cost \n(pens/cartridges)' ];
		
		var row = Ti.UI.createView({
			left: 0, top: 0, 
			width: Ti.UI.FILL, height: row_height,
			layout:'horizontal',		
       		backgroundColor: '#eeeeee'	
		});

			for( var i=0; i < array.length; i++){
				
				var cell = Ti.UI.createLabel({
					left: 0, top: 0,
					width: '50%', 
					height: row_height,
					font: { fontSize: 10, fontFamily: settings.get_font( 'GR-Bold' ) },
					color: settings.get_color( 'brown' ),
					textAlign: 'center',
					text: array[i]
				});
				row.add( cell );
				
				if ( i == 0 ) {
					cell.textAlign = 'left';
				}
				
			}
		
		return row;
				
	}
	
	function update_from_engine ( ) {
		
		for ( var i=0; i< value_array.length; i++ ) {
			
			var obj = value_array[i];
			obj.text = with_commas( dp_2( engine.get_value( obj.row, obj.col ) ) );	
			
		}
		
	};
	
	function ref_button_clicked ( e ) {
		
		var obj = e.source;
		
		alert( obj.ref );
		
	};
	
	self.update = function () {
		
		for ( var i = 0; i < row_array.length; i++ ) {
			
			if ( row_array[i].id ) {

				if ( data_store[ row_array[i].id ] == true ) {
					row_array[i].height = row_height;	
					row_array[i].line.opacity = 1;				
				} else {
					row_array[i].height = 0;
					row_array[i].line.opacity = 0;
				}
				
			}
			
		}
		
	};
	
	return self;
	
}

module.exports = this_class;