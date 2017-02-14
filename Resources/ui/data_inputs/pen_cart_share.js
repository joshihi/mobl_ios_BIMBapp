function this_class ( product ) {



////////////////////////////////////////////////////
//VARS
////////////////////////////////////////////////////

	var row_height = 50;
	var padding = 25;	
	
	var title_text = product + ' is available in pens and cartridges. Please select % pens';
	
	if ( product == 'Lantus' ) {
		var cart_discount_row = 80;
		var pen_discount_row = 81;
	} else {
		var cart_discount_row = 82;
		var pen_discount_row = 83;
	}
	
	var value_column = 1;
	
////////////////////////////////////////////////////
//UI
////////////////////////////////////////////////////
	
	var self = Ti.UI.createView({
		left: 0, top: 25,
		width: '50%', height: Ti.UI.SIZE
	});
		
		var container = Ti.UI.createView({
			left: 0, top: 0, right: padding, bottom: 10,
			width: Ti.UI.FILL, height: Ti.UI.SIZE,
			layout: 'vertical'
		});
		self.add( container );
			
			var title = Ti.UI.createLabel({
				left: 0, top: 0,
				width: '100%', 
				height: Ti.UI.SIZE,
				font: { fontSize: 12, fontFamily: settings.get_font( 'GR-Book' ) },
				color: settings.get_color( 'brown' ),
				textAlign: 'left',
				text: title_text
			});
			container.add( title );
			
			var slider_container = Ti.UI.createView({
				left: 0, top: 5,
				width: '100%', height: Ti.UI.SIZE
			});
			container.add( slider_container );
			
				var slider = Titanium.UI.createSlider({
				    top: 0,
				    min: 0,
				    max: 100,
				    width: '100%', height: Ti.UI.SIZE,
				    value: 0,
					thumbImage: 'includes/images/data_inputs/slider_icon.png',
			//				highlightedThumbImage:'',
					rightTrackImage:'includes/images/slider_left.png',
					leftTrackImage: 'includes/images/slider_right.png'
				});
				slider_container.add( slider );
			
				slider.value = engine.get_value( pen_discount_row, value_column );
				
				slider.addEventListener('change', update_percent_bars );
				    //slider_title.text = args.title + " : " + String.format("%3.1f", e.value) + "%";
				//});
				
				slider.addEventListener('stop', update_discount );
				
			var pen_percentage_bar = create_percentage_bars( 'Pens' );
			container.add( pen_percentage_bar );
			
			var cart_percentage_bar = create_percentage_bars( 'Cartridges' );
			container.add( cart_percentage_bar );
				
				
////////////////////////////////////////////////////
//FUNCTIONS
////////////////////////////////////////////////////
	
	function create_percentage_bars ( type ) {
		
		var container = Ti.UI.createView({
			left: 0, top: 5, right: 0, bottom: 0,
			width: Ti.UI.FILL, height: Ti.UI.SIZE
		});
			
			container.title = Ti.UI.createLabel({
				left: 0, top: 0,
				width: '100%', 
				height: Ti.UI.SIZE,
				font: { fontSize: 14, fontFamily: settings.get_font( 'GR-Bold' ) },
				color: settings.get_color( 'brown' ),
				textAlign: 'left',
				text: type
			});
			container.add( container.title );
		
			container.percentage = Ti.UI.createLabel({
				right: 0, top: 0,
				width: '100%', 
				height: Ti.UI.SIZE,
				font: { fontSize: 14, fontFamily: settings.get_font( 'GR-Book' ) },
				color: settings.get_color( 'brown' ),
				textAlign: 'right',
				text: '%'
			});
			container.add( container.percentage );
		
			var bar_contianer = Ti.UI.createView({
				left: 0, top: 25, right: 0, bottom: 0,
				width: Ti.UI.FILL, height: 6,
				borderRadius: 3,
				backgroundColor: '#eeeeee'
			});
			container.add( bar_contianer );
			
			container.bar = Ti.UI.createView({
				left: 0, top: 0, right: 0, bottom: 0,
				width: 0, height: 6,
				backgroundColor: '#362c28',
				borderRadius: 3,
			});
			bar_contianer.add( container.bar );
			
		
			if ( type == 'Pens' ) {
				var value = engine.get_value( pen_discount_row, value_column );			
			} else {
				var value = engine.get_value( cart_discount_row, value_column );		
			}
			
			container.percentage.text = Math.round( value ) + '%';
			container.bar.width = value + '%';
		
		return container;
				
	};
	
	function update_percent_bars ( e ) {
		
		var obj = e.source;
		
		var pen_value = obj.value;
		var cart_value = 100 - pen_value;
		
		pen_percentage_bar.bar.width = pen_value + '%';
		pen_percentage_bar.percentage.text = Math.round( pen_value ) + '%';
		
		cart_percentage_bar.bar.width = cart_value + '%';
		cart_percentage_bar.percentage.text = Math.round( cart_value ) + '%';
			
	};

	function update_discount ( e ) {
		
		var obj = e.source;
		
		var pen_default_value = engine.get_value( pen_discount_row, value_column );
		
		if ( pen_default_value != obj.value ) {
			
			engine.update_value( pen_discount_row, value_column, obj.value );
			engine.update_value( cart_discount_row, value_column, 100 - obj.value );
			
			engine.re_calculate();				
			
		}
		
		
	};
	
	return self;
	
}

module.exports = this_class;