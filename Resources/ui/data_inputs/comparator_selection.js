function this_class( callback ) {



////////////////////////////////////////////////////
//VARS
////////////////////////////////////////////////////
	
	var color_array = [ '#aba714', '#b83d88', '#d19c07', '#aba714', '#b83d88', '#d19c07' ];
	
	var height = 50;
	
	var product_array = _default.comparator_list;
	var option_group_array = new Array();
	
	var opacity_off = 0.3;
	
////////////////////////////////////////////////////
//UI
////////////////////////////////////////////////////

////////////////////////////////////////////////////
//FUNCTIONS
////////////////////////////////////////////////////
	
	var self = Ti.UI.createView({
		left: 0, top: 0, bottom: 10,
		width: Ti.UI.FILL, height: Ti.UI.SIZE,
		layout: 'horizontal'
	});
		
		var options_container = create_option_group();
		self.add( options_container );

////////////////////////////////////////////////////
//RUN FUNCTIONS
////////////////////////////////////////////////////
	
	function create_option_group ( ) {
		
		var container = Ti.UI.createView({						
			left:0, top: 18,
			width:Ti.UI.FILL, height: Ti.UI.SIZE,
			layout: 'horizontal'				
		});
		
		var array = product_array;
		
		option_group_array = new Array();
		
		var width = 452;
		
		for ( var i=0; i<array.length; i++ ) {
			
			var temp = Ti.UI.createButton({
	    		left: 0, top: 0,
	    		width: width, height: 42,
	    		title: toTitleCase( array[ i ] ),
	    		product: array[ i ],
	    		product_id: array[ i ],
	    		font: { fontSize: 18, fontFamily: settings.get_font( 'GR-Bold' ) },
	    		color: '#FFFFFF',
	    		active: false,
	    		backgroundColor: '#69c083',
				borderColor: '#76cc90', 
				borderWidth: 6,
				id: array[i].id, 
				bubbleParent: false,
				type: 'button'
	    	});
	    	container.add( temp );
	    	temp.addEventListener( 'click', option_change_state );
			
	    	
	    	if ( i != 0 || i != 2 ) temp.left = 2;
					
				if ( _default[ product_array[i] + '_warning_message' ] ) {
					
					temp.width = temp.width  - 30;
					
					var info_icon = Ti.UI.createLabel({
						left: 6,
						width: 24, height: 24,
						borderRadius: 12,
						backgroundColor: '#FFFFFF',
						borderColor: '#76cc90', 
						color: '#76cc90', 
						borderWidth: 2,
						font: { fontSize: 12, fontFamily: settings.get_font( 'GR-Bold' ) }, 
						textAlign: 'center',   		
						//backgroundImage: 'includes/images/i_icon.png',
						text: 'i',
						product_id: product_array[i], 
						bubbleParent: true,
						type: 'icon'
					});
					container.add( info_icon );
/*				
*/					info_icon.addEventListener( 'click', option_change_state );
					
				}
				
			option_group_array.push( temp );
			
			if(( (i + 1) % 2) == 0) {				
				var spacer = Ti.UI.createView({ left: 0, top: 0, width: '100%', height: 5 });
				container.add( spacer );
			}
			if ( i == 0 ) option_change_state( { source: temp } );
			
		}
		
		
		function option_change_state ( e ) {
			
			var obj = e.source;
			var product = obj.product;
			
//			alert( product );
			
//			alert( obj.type );
			if ( obj.type == 'icon' ) {
				info_icon_clicked( { source: obj } );
				return;
			}
			if ( product =='lantus' ) product = 'lantus';		
			if ( product =='toujeo' ) {
//				info_icon_clicked( { source: obj } );		
				product = 'toujeo';
			}		
			if ( product =='merck insulin glargine' ) product = 'merck_insulin_glargine';		
			if ( product == 'biocon insulin glargine' ) product = 'biocon_insulin_glargine';
		
			if ( obj.active ) {
						
				obj.backgroundColor = '#69c083';
				obj.borderColor = '#76cc90';
				obj.color = settings.get_color( 'white' );
				obj.active = false;	
							
			} else {
				
				obj.backgroundColor = settings.get_color( 'white' );
				obj.color = settings.get_color( 'brown' );
				obj.borderColor = '#EEEEEE';
				obj.active = true;	
				
			}

			if ( product != 'basaglar' ) {
			
				data_store[ product ] = obj.active;			
				
				if ( callback ) callback();
				
			}
							
		}

		return container;
		
	};
	
	function info_icon_clicked ( e ) {
		
		var obj = e.source;
		
		var temp_class = require( 'ui/comparator_overlay' );
		var temp_window = new temp_class( obj.product_id );
		layers.add_layer_function( temp_window );
		
	};
	
	function capitalizeFirstLetter(string) {
	    return string.charAt(0).toUpperCase() + string.slice(1);
	}
	
	function toTitleCase(str)
	{
	    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
	}
	
	return self;
	
}

module.exports = this_class;