function this_class( callback ) {

	var type_array = new Array();
	
	var self = Ti.UI.createView({
		right: 49, top: 73,
		width: 310, height: 40,
		layout: 'horizontal'
	});
		
		type_array[0] = Ti.UI.createLabel({						
			left:0, top:0,
			width: 100, height: 40,
			font: { fontSize: 12, fontFamily: settings.get_font( 'GR-Medium' ) },
			text: 'T1DM',
			textAlign: 'center',
			color: settings.get_color( 'white' ),
			backgroundColor: '#69c083',
			borderColor: '#76cc90', borderWidth: 6,
			id: 1	
			//backgroundColor: settings.get_color( 'brown' )					
		});
		self.add( type_array[0] );				
		type_array[0].addEventListener( 'click', type_clicked );
		
		type_array[1] = Ti.UI.createLabel({						
			left:5, top:0,
			width: 100, height: 40,
			font: { fontSize: 12, fontFamily: settings.get_font( 'GR-Medium' ) },
			text: 'T2DM',
			textAlign: 'center',
			color: settings.get_color( 'white' ),
			backgroundColor: '#69c083',
			borderColor: '#76cc90', borderWidth: 6	,
			id: 2
		});
		self.add( type_array[1] );				
		type_array[1].addEventListener( 'click', type_clicked );
		
		type_array[2] = Ti.UI.createLabel({						
			left:5, top:0,
			width: 100, height: 40,
			font: { fontSize: 12, fontFamily: settings.get_font( 'GR-Medium' ) },
			text: 'T1DM & T2DM',
			textAlign: 'center',
			color: settings.get_color( 'white' ),
			backgroundColor: '#69c083',
			borderColor: '#76cc90', borderWidth: 6,
			id: 3		
		});
		self.add( type_array[2] );
		type_array[2].addEventListener( 'click', type_clicked );
	
	set_type();
	
	self.redraw = function () {
		
		set_type();
		
	};
	
	function type_clicked ( e ) { 
		
		if ( data_store.diabetes_type != e.source.id ) {

			data_store.diabetes_type = e.source.id;
			engine.re_calculate();
			set_type();

			if ( callback ) callback();
		
		}
		
	};
		
	
	function set_type() {
		
		for ( var i=0; i<type_array.length; i++ ){
			
			if ( data_store.diabetes_type-1 == i ) {
				type_array[i].backgroundColor = settings.get_color( 'white' );
				type_array[i].borderColor = '#eeeeee';
				type_array[i].color = settings.get_color( 'brown' );
			} else {
				type_array[i].backgroundColor = '#69c083';
				type_array[i].borderColor = '#76cc90';
				type_array[i].color = settings.get_color( 'white' );
				type_array[i].borderWidth = 6;
			}

			
			
		}
		
	};
	
	return self;
	
}

module.exports = this_class;