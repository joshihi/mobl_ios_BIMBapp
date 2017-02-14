function this_class( obj ) {



////////////////////////////////////////////////////
//VARS
////////////////////////////////////////////////////
	
	var row_height = 50;
	var padding = 25;
	
////////////////////////////////////////////////////
//UI
////////////////////////////////////////////////////
						
		var row = Ti.UI.createView({
	        left: 0,
	        width: Ti.UI.FILL, height:row_height,
	        layout: 'horizontal',
	       	selectedColor:'transparent'
	    });
		
			row.label = Ti.UI.createLabel ({
			    left: padding, top: 0,
			    width: 130, height: Ti.UI.FILL,
			    font: { fontSize: 10, fontFamily: settings.get_font( 'Gotham-Book' ) },
				color: settings.get_color( 'brown' ),				
			    text: obj.title,
			    textAlign: 'left'
			});
			row.add( row.label );
			
			row.reset_button = Ti.UI.createButton ({
			    left: 0,
			    width: 20, height: 20,
			    backgroundImage: 'includes/images/data_inputs/reset_icon.png',
//			    borderColor: 'red',
			    enabled: false
			});
			row.add( row.reset_button );
			row.reset_button.addEventListener( 'click', reset_button_clicked );
					
			row.user_value = Ti.UI.createTextField ({
			    left: 5,
			    width: 88, height: 30,
			    backgroundColor: '#FFFFFF',
			    borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE,
			    font: { fontSize: 10, fontFamily: settings.get_font( 'Gotham-Book' ) },
			    textAlign: 'center',
			    keyboardType: Ti.UI.KEYBOARD_TYPE_NUMBER_PAD,
			    id: obj.id,
			    row: obj.row
			});
			row.add( row.user_value );
			row.user_value.addEventListener( 'change', user_value_updated );
			row.user_value.addEventListener( 'focus', user_value_focus );
			
			if ( engine.get_value( obj.row, 1 ) != 0 ) row.user_value.value = engine.get_value( obj.row, 1 );
			var default_value = engine.get_value( obj.row, 2 );
			
			if ( obj.type == 'normal' ) {
				default_value = with_commas(default_value);
			} else if ( obj.type == 'percentage' ) {
				default_value = default_value + '%';
			} else if ( obj.type == 'cost' ) {
				default_value = "£" + with_commas(default_value);
			}	
			
			row.default_value = Ti.UI.createLabel ({
			    left: 0,
			    width: 88, height: 30,
			    font: { fontSize: 10, fontFamily: settings.get_font( 'Gotham-Book' ) },
				color: settings.get_color( 'brown' ),				
			    text: default_value,
			    backgroundColor: '#c1c1c1',
			    textAlign: 'center'
			});
			row.add( row.default_value );
			
			if ( _default[ obj.id+'_ref' ] ) {
				row.ref_button = Ti.UI.createButton ({
				    left: 10,
				    width: 17, height: 17,
				    backgroundImage: 'includes/images/data_inputs/ref_icon.png',
				    ref: _default[ obj.id+'_ref' ]
				});
				row.add( row.ref_button );
				row.ref_button.addEventListener( 'click', ref_button_clicked );
			}
			
			if ( _default[ obj.id+'_i' ] ) {
				row.i_button = Ti.UI.createButton ({
				    left: 10,
				    width: 17, height: 17,
				    backgroundImage: 'includes/images/data_inputs/i_icon.png',
				    ref: _default[ obj.id+'_i' ]
				});
				row.add( row.i_button );
				row.i_button.addEventListener( 'click', ref_button_clicked );
				if ( _default[ obj.id+'_ref' ] ) {
					row.ref_button.left = 3;
					row.i_button.left = 3;
				}
			}	
				
	
////////////////////////////////////////////////////
//FUNCTIONS	
////////////////////////////////////////////////////
	
	function user_value_focus ( e ) { 
		
		var obj = e.source;
		
		if ( obj.value == 0 ) obj.value = '';
		
	};
	
	function user_value_updated ( e ) {
				
		var obj = e.source;
		var value = obj.value;
		
		if ( value == '' ) value = 0;	
		value = parseFloat( value );
			
		if ( valid_int( value ) || valid_int( value ) || value == '' ) {
			
			if ( value != 0 ) { 
				row.reset_button.enabled = true;
			} else {
				row.reset_button.enabled = false;			
			}
			
			engine.update_value( obj.row, 1, value );
			engine.re_calculate();
			//THE UPDATE ALL OTHER DATA
				
		}
	
	};
										
	function reset_button_clicked () {
		
		row.user_value.value = 0;
		row.reset_button.enabled = false;
		engine.update_value( obj.row, 1, 0 );	
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
			
	
////////////////////////////////////////////////////
//RUN FUNCTIONS
////////////////////////////////////////////////////
	
		return row;

}

module.exports = this_class;