function this_class( header, array, value_to_update, callback ) {



////////////////////////////////////////////////////
//VARS
////////////////////////////////////////////////////
	
	var row_height = 50;
	var padding = 25;
	var width = 400;
	
	
////////////////////////////////////////////////////
//UI
////////////////////////////////////////////////////
				
		var self = Ti.UI.createView({
	        left: 0, top: 20,
	        width: width, height: Ti.UI.SIZE,
	        layout: 'vertical'
	    });
		
			self.label = Ti.UI.createLabel ({
			    left: 0, top: 0,
			    width: Ti.UI.FILL, height: Ti.UI.SIZE,
			    font: { fontSize: 12, fontFamily: settings.get_font( 'Gotham-Book' ) },
				color: settings.get_color( 'brown' ),				
			    text: header,
			    textAlign: 'left'
			});
			self.add( self.label );
			
			self.selection_container = Ti.UI.createView({
		        left: 0, top: 10,
		        width: width, height: 42,
		        layout: 'horizontal'
		    });
		    self.add( self.selection_container );
		    
		    
		   var buttons_array = new Array();
		    
		   var width = (width - ( 2 * (array.length - 1) ) ) / array.length; 
		    
		    for ( var i=0; i< array.length; i++ ) {
		    	
/*		    	if ( value_to_update == 'know_population'  ) {
		    		
		    		var temp_button = square_style_button( array[i] );
		    		self.selection_container.add( temp_button );
		    		buttons_array.push( temp_button );
		    		temp_button.hit_area.addEventListener( 'click', square_button_clicked );
		      		    		
		    	} else {
*/		    	
			    	var temp_button = Ti.UI.createButton({
			    		left: 0, top: 0,
			    		width: width, height: Ti.UI.FILL,
			    		title: array[i].title,
			    		font: { fontSize: 18, fontFamily: settings.get_font( 'GR-Bold' ) },
			    		color: '#FFFFFF',
			    		selected: false,
			    		backgroundColor: '#69c083',
						borderColor: '#76cc90', 
						borderWidth: 6,
						id: array[i].id
			    	});
			    	if ( i != 0 ) temp_button.left = 2;
		    		if ( array[i].title == "T1DM & T2DM" ) temp_button.font = { fontSize: 16, fontFamily: settings.get_font( 'GR-Bold' ) };
		    		
		    		self.selection_container.add( temp_button );
			    	buttons_array.push( temp_button );
			    	temp_button.addEventListener( 'click', button_clicked );
			      		    		
//		    	}
		    	
		    	
		    }
		    
//		    if ( value_to_update != 'know_population'  )  {
		    	setup();
/*		    } else {
		    	square_setup();
		    }
*/		    	
	
////////////////////////////////////////////////////
//FUNCTIONS	
////////////////////////////////////////////////////
	
	function square_style_button( args ) {
		
		var row_height = 30;
		
    	var temp = Ti.UI.createView({						
			left:0, top: 0,
			width: 80, height: row_height,
			backgroundColor: '#eeeeee',
			id: args.id,
			selected: true				
		});	
		
			var icon = Ti.UI.createView({
				left: 0, top: 0,
				width: row_height, height: row_height, backgroundImage: 'includes/images/tick.png',
				backgroundColor: settings.get_color( 'brown' )
			});
			temp.add( icon );
			
			var text = Ti.UI.createLabel({						
				left: 45, top: 0,
				width: Ti.UI.FILL, height: row_height,
				font: { fontSize: 13, fontFamily: settings.get_font( 'GR-Bold' ) },
				color: settings.get_color( 'brown' ),	
				textAlign: 'left',	   
				text: capitalizeFirstLetter( args.title )							
			});
			temp.add( text );
			
			var hit_area = Ti.UI.createView({
				left: 0, top: 0,
				width: '100%', height: '100%',
				container: temp,
				id: args.id,
				type: 'square',
				selected: false,
				icon: icon 
			});
			temp.add( hit_area );
			
			temp.icon = icon;
			temp.hit_area = hit_area;	
			
		if ( i != 0 ) temp.left = 10;
		
    	return temp;
    	
	};	
	
	function square_setup() {
		
		if ( data_store[ value_to_update ] ) {
			
			for ( var i=0; i<buttons_array.length; i++ ) {

				if ( buttons_array[i].id == data_store[ value_to_update ] ) square_change_state( buttons_array[i].hit_area );
							
			}

		} else {
			
			data_store[ value_to_update ] = buttons_array[ 0 ].id;
			square_change_state( buttons_array[1].hit_area );
				
		}		
		
	};
	
	function setup() {
				
		if ( data_store[ value_to_update ] ) {
			
			for ( var i=0; i<buttons_array.length; i++ ) {

				if ( buttons_array[i].id == data_store[ value_to_update ] ) {
					change_state( buttons_array[i] );
				}
			}

		} else {
			
			data_store[ value_to_update ] = buttons_array[ 0 ].id;
			change_state( buttons_array[0] );
				
		}
		
		
	};
	
	
	function button_clicked ( e ) {
		
		var obj = e.source;
		
		if ( !obj.selected ) {
			
			change_state( obj );
			
		}
			
	};
	
	function square_button_clicked ( e ) {
		
		var obj = e.source;
		
		if ( !obj.selected ) {
			
			square_change_state( obj );
			
		}
			
	};
			
	function change_state( obj ) {
		
		for ( var i=0; i< buttons_array.length; i++ ) {
			
			if ( obj == buttons_array[i] ) {
				
				buttons_array[i].selected = true;
				buttons_array[i].backgroundColor = settings.get_color( 'white' );
				buttons_array[i].color = settings.get_color( 'brown' );
				buttons_array[i].borderColor = '#eeeeee'; 
//				
				data_store[ value_to_update ] = buttons_array[i].id;
				print( 'Selection group Clicked: ' + value_to_update + " / " + buttons_array[i].id );
//				buttons_array[i].borderWidth = 0;
							
			} else {
				
				buttons_array[i].selected = false;
				buttons_array[i].color = settings.get_color( 'white' );				
				buttons_array[i].backgroundColor = '#69c083';
				buttons_array[i].borderColor = '#76cc90'; 
//				buttons_array[i].borderWidth = 6;
				
			}
						
		}
		
		if ( callback ) callback();
		
	};
	
	function square_change_state( obj ) {
		
		for ( var i=0; i< buttons_array.length; i++ ) {
			
			buttons_array[i].icon.backgroundColor = '#69c083';
			buttons_array[i].icon.borderColor = '#76cc90';
			buttons_array[i].icon.borderWidth = 6;
			buttons_array[i].icon.backgroundImage = '';
			buttons_array[i].hit_area.selected = false;	

		}
		
		obj.icon.backgroundColor = settings.get_color( 'brown' );
		obj.icon.borderWidth = 0;
		obj.icon.backgroundImage = 'includes/images/tick.png';
		obj.selected = true;	
		data_store[ value_to_update ] = obj.id;
						
		if ( callback ) callback();
		
	};
	
	
	
////////////////////////////////////////////////////
//RUN FUNCTIONS
////////////////////////////////////////////////////
	
		return self;

}

module.exports = this_class;