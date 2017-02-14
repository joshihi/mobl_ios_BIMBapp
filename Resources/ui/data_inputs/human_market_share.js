function this_class(  ) {



////////////////////////////////////////////////////
//VARS
////////////////////////////////////////////////////
	
	
	var human_count = 10;
	
	var items_per_row = 10;	
	
	var number_of_rows = 1;
		
	var human_height = 60;	
	var human_width = human_height * 0.413;
	
	var human_padding = 2;
		
	var container_width = ( human_width + ( 2 * human_padding ) ) * items_per_row + 5;
	var container_height = ( human_height + ( 2 * human_padding ) )  * number_of_rows;
		
	if ( data_store.diabetes_type == 1 || data_store.diabetes_type == 3 ) {
		var human_value_1 = Math.round( engine.get_value( 42, 8 ) );
		var human_value_2 = Math.round( engine.get_value( 43, 8 ) );
	} else if ( data_store.diabetes_type == 2 ) {
		var human_value_1 = Math.round( engine.get_value( 68, 8 ) );
		var human_value_2 = Math.round( engine.get_value( 69, 8 ) );	
	} 
			
	var color_1 = '#aba714';
	var color_2 = '#c7569a'; 
	
	var people_to_fill = ( 5 * Math.round(human_value_1 /5) ) / 5;

	
	
////////////////////////////////////////////////////
//UI
////////////////////////////////////////////////////

////////////////////////////////////////////////////
//FUNCTIONS
////////////////////////////////////////////////////
	
	var self = Ti.UI.createView({
		left: 0, top: 0,
		width: 736, height: Ti.UI.SIZE,
		layout:'vertical'	
	});
	
	if ( data_store.diabetes_type == 1 || data_store.diabetes_type == 3 ) create_row( 'T1DM' );
	if ( data_store.diabetes_type == 2 || data_store.diabetes_type == 3 ) create_row( 'T2DM' );
	
	function create_row ( args ) {
		
		var type_container = Ti.UI.createView({
			left: 0, top: 8,
			width: 736, height: 100,
			backgroundColor:'#FFFFFF'	
		});	
		self.add( type_container );
			
			var statement_1 = args + " 5 Year \nCumulative \nMarket Share";
			
			var label_1 = Ti.UI.createLabel({						
				top: 0, left: 0, width: 150, height: Ti.UI.FILL, color: settings.get_color( 'brown' ), textAlign: 'right',
				font: { fontSize: 20, fontFamily: settings.get_font( 'GR-Medium' ) },
				text: statement_1				
			});
			type_container.add( label_1 );
			
			var human_container = Ti.UI.createView({
				left: 305,
				width: 310, height: Ti.UI.SIZE, layout:'horizontal'	
			});	
			type_container.add( human_container );
				
				if ( args == 'T1DM' ) {
					var human_value_1 = Math.round( engine.get_value( 42, 8 ) );
					var human_value_2 = Math.round( engine.get_value( 43, 8 ) );
				} else if (  args == 'T2DM' ) {
					var human_value_1 = Math.round( engine.get_value( 68, 8 ) );
					var human_value_2 = Math.round( engine.get_value( 69, 8 ) );	
				} 
				var people_to_fill = ( 10 * Math.round(human_value_1 /10) ) / 10;
		
				setup_human_view( human_container );
				setup_text_view( type_container );
			
	};
		
////////////////////////////////////////////////////
//RUN FUNCTIONS
////////////////////////////////////////////////////
	
	function setup_text_view ( parent ) {
		
		var pink_container  = Ti.UI.createView({
			left: 180,
			width: Ti.UI.SIZE, height: Ti.UI.SIZE,
			layout: 'vertical'
		});
		parent.add( pink_container );
			
			var pink_per_container = Ti.UI.createView({
				top: 0, left: 0,
				width: Ti.UI.SIZE, height: Ti.UI.SIZE,
				layout: 'horizontal'
			});
			pink_container.add( pink_per_container );
				
				var pink_per_text = Ti.UI.createLabel({						
					top: 0, left: 0,
					width: Ti.UI.SIZE, height: Ti.UI.SIZE,
					font: { fontSize: 50, fontFamily: settings.get_font( 'GR-Bold' ) },
					text: human_value_1,
					color: '#b83d88',
					textAlign: 'left'					
				});
				pink_per_container.add( pink_per_text );
				
				var pink_per_sign = Ti.UI.createLabel({						
					bottom: 5, left: 0,
					width: Ti.UI.SIZE, height: Ti.UI.SIZE,
					font: { fontSize: 38, fontFamily: settings.get_font( 'GR-Book' ) },
					text: '%',
					color: '#b83d88',
					textAlign: 'left'					
				});
				pink_per_container.add( pink_per_sign );				
				
		var green_container  = Ti.UI.createView({
			right: 15,
			width: Ti.UI.SIZE, height: Ti.UI.SIZE,
			layout: 'vertical'
		});
		parent.add( green_container );
		
			var green_per_container = Ti.UI.createView({
				top: 0, left: 0,
				width: Ti.UI.SIZE, height: Ti.UI.SIZE,
				layout: 'horizontal'
			});
			green_container.add( green_per_container );
			
				var green_per_text = Ti.UI.createLabel({						
					top: 0, left: 0,
					width: Ti.UI.SIZE, height: Ti.UI.SIZE,
					font: { fontSize: 50, fontFamily: settings.get_font( 'GR-Bold' ) },
					text: human_value_2,
					color: '#aba714',
					textAlign: 'left'					
				});
				green_per_container.add( green_per_text );
				
				var green_per_sign = Ti.UI.createLabel({						
					bottom: 5, left: 0,
					width: Ti.UI.SIZE, height: Ti.UI.SIZE,
					font: { fontSize: 38, fontFamily: settings.get_font( 'GR-Book' ) },
					text: '%',
					color: '#aba714',
					textAlign: 'left'					
				});
				green_per_container.add( green_per_sign );
			
	};
	
	function setup_human_view ( parent ) {
		
		for ( var i=0; i<human_count; i++ ) {
			
//			console.log( i + ' / ' + human_count );
			
			var container = Ti.UI.createView({
				left: human_padding, right: human_padding,
				width: human_width, height: human_height
			});
			parent.add( container );
				
				var human_container = Ti.UI.createView({
					left: 0, top: 0,
					width: human_width, height: human_height, backgroundColor: color_1
				});
				container.add( human_container );
				
				var human_graphic = Ti.UI.createView({
					left: 0, top: 0,
					width: human_width, height: human_height, backgroundImage: 'includes/images/man_outline.png'
				});
				container.add( human_graphic );
				
				if ( i < people_to_fill ) human_container.backgroundColor = color_2;
				
		}
		
	};
	

	
	return self;
	
}

module.exports = this_class;