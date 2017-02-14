function this_class( row_data, position ) {

////////////////////////////////////////////////////
//VARS
////////////////////////////////////////////////////
	
	var row_height = 50;
	var padding = 25;
	var cell_height = '70%';
	
	//var cell_width = 111;
	var cell_width = 82;
			
////////////////////////////////////////////////////
//UI
////////////////////////////////////////////////////

	
////////////////////////////////////////////////////
//FUNCTIONS
////////////////////////////////////////////////////
	

////////////////////////////////////////////////////
//RUN FUNCTIONS
////////////////////////////////////////////////////
	
	var row = Ti.UI.createView({
//	var row = Ti.UI.createView({
		left: 0, top: 0, 
		width: Ti.UI.SIZE, height: row_height + 10,			
       	selectedColor:'transparent',
       	backgroundColor: '#EEEEEE'
		
	});
	
		var row_bg = Ti.UI.createView({
			left: 0, top: 5, bottom: 5, 
			width: Ti.UI.FILL, height: row_height,
			layout:'horizontal'	
		});
		row.add( row_bg );

		var cell_array = new Array();
		
		for(var i=0; i < row_data.length; i++){
			
			if ( row_data[i].type == 'label' ) {
				
				var cell = Ti.UI.createLabel({
					left: 0, top: 7,
					width: cell_width, height: cell_height,
					font: { fontSize: 14, fontFamily: settings.get_font( 'GR-Bold' ) },
					color: settings.get_color( 'brown' ),
					textAlign: 'center',
					text: row_data[i].value,
					type: 'label',
				 	backgroundColor: '#c1c1c1'//, opacity: 0.5
				});
				row_bg.add( cell );
				
				if ( i == 0 ) {
					cell.left = 25;
					cell.width = cell_width*1.5 - cell.left;
					cell.textAlign = 'left';		
					cell.backgroundColor = 'transparent';				
				} else {
					cell.left = 2;
					cell.width = cell_width - 2;
				}
				if ( row_data[i].row ) {
					cell.row = row_data[i].row;
					cell.col = row_data[i].col;
					cell.text = with_commas( dp_2( engine.get_value( row_data[i].row, row_data[i].col ) ) );
				}
				
				if ( row_data[i].ref || row_data[i].info ) {
					
					console.log( i );
					
					var ref_button = Ti.UI.createButton ({
					    left: -17, 
					    left: 2, 
					    top: 16,
					    width: 17, height: 17, 
					    backgroundImage: 'includes/images/data_inputs/ref_icon.png',
					    ref: row_data[i].ref//, backgroundColor: 'green', opacity: 0.5
					});
					row_bg.add( ref_button );
					ref_button.addEventListener( 'click', ref_button_clicked );
					if ( i == 0 ) ref_button.left = -17;
					if ( i > 0 ) ref_button.left = 2;
					if (row_data[i].info) {
						ref_button.ref = row_data[i].info;
						ref_button.backgroundImage = 'includes/images/data_inputs/i_icon.png';
					}
					
					console.log( ref_button );
					console.log( ref_button.left );
					
				}
				
				cell_array.push( cell );
				
			} else {
				
				var user_input_cell = Ti.UI.createTextField ({
				    left: 2, top: 7,
					width: cell_width - 2, height: cell_height,
				    backgroundColor: '#FFFFFF',
				    borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE,
				    font: { fontSize: 12, fontFamily: settings.get_font( 'Gotham-Book' ) },
				    textAlign: 'center',
				    keyboardType: Ti.UI.KEYBOARD_TYPE_NUMBER_PAD,
					row: row_data[i].row,
					col: row_data[i].col,
					value: engine.get_value( row_data[i].row, row_data[i].col ),
					type: 'input'  
				});
				row_bg.add( user_input_cell );
				user_input_cell.addEventListener( 'change', user_value_updated );
				
				if ( user_input_cell.value == 'USER_VALUE' ) user_input_cell.value = '';
							
				cell_array.push( user_input_cell );			
				
			}
			
			if ( i != 0 )  {
				cell.font = { fontSize: 12, fontFamily: settings.get_font( 'Gotham-Book' ) };
				//cell.backgroundColor = color_two;
			}
			
			Ti.App.addEventListener( 'engine_refresh', function() {
				update_from_engine( ); 
			});
			
		}
	
	
	
	function user_value_updated ( e ) {
		
		var obj = e.source;
		var value = obj.value;
		
		if ( value == '' ) value = 0;		
		value = parseFloat( value );
		
		if ( valid_int( value ) || valid_int( value ) || value == '' ) {
			
			engine.update_value( obj.row, obj.col, value );
			engine.re_calculate();
				
		}
	
	};
	
	function update_from_engine ( e ) {
		
		for ( var i=0; i<cell_array.length; i++ ) {
			
			var obj =cell_array[i];
			
			if ( obj.type == 'label' && obj.row ) {
				obj.text = with_commas( dp_2( engine.get_value( obj.row, obj.col ) ) );	
			} else if ( obj.row ) {
				var value = engine.get_value( obj.row, obj.col );
				if ( value != 'USER_VALUE' && value != 0 && obj.value != value ) {
					obj.value = with_commas( dp_2( value ) );	
				}
			}
			
		}
		
	};
	
	function ref_button_clicked ( e ) {
		
		var obj = e.source;
		
		var dialog = Ti.UI.createAlertDialog({
		    message: obj.ref,
		    ok: 'Okay',
		    title: ''
		});
		dialog.show();
		
		//alert( obj.ref );
		
	};
		
	return row;
	
}

module.exports = this_class;