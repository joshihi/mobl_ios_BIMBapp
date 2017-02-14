function this_class( args, callback_update_others ) {

////////////////////////////////////////////////////
//VARS
////////////////////////////////////////////////////

	
////////////////////////////////////////////////////
//UI
////////////////////////////////////////////////////
	var self = Ti.UI.createView({
		width: '100%', height: Ti.UI.SIZE,
		layout: 'vertical'
	});
	
		var slider_title = Ti.UI.createLabel({
		    text: args.title,
		    width: '100%', height: 20,
		    top: 0,
		    left: 0,
		    font: { fontSize: 12, fontFamily: settings.get_font( 'GR-Bold' ) },
			color: settings.get_color( 'white' ),
		    textAlign: 'left'
		});		
		self.add( slider_title );
		
		var slider_container = Ti.UI.createView({
			left: 0, top: 5,
			width: '100%', height: Ti.UI.SIZE
		});
		self.add( slider_container );
		
			var slider = Titanium.UI.createSlider({
			    top: 0,
			    min: 0,
			    max: 100,
			    width: '100%', height: Ti.UI.SIZE,
			    value: 0,
				thumbImage: 'includes/images/slider_icon.png',
		//				highlightedThumbImage:'',
				rightTrackImage:'includes/images/slider_left.png',
				leftTrackImage: 'includes/images/slider_right.png'
			});
			
/*			var slider_label = Ti.UI.createLabel({
			    text: slider.value,
			    width: Ti.UI.SIZE, height: 20,
			    top: 10,
			    left: 0,
			    font: { fontSize: 14, fontFamily: settings.get_font( 'GR-Bold' ) },
				color: settings.get_color( 'brown' ),
			    textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT
			});
			
		slider_container.add( slider_label );
*/	
		slider_container.add( slider );
	
			slider.value = engine.get_value( args.row, args.col );
			
			slider.addEventListener('change', function(e) {
			    slider_title.text = args.title + " : " + String.format("%3.1f", e.value) + "%";
			});
			
			slider.addEventListener('stop', update_discount );
				
		
////////////////////////////////////////////////////
//FUNCTIONS
////////////////////////////////////////////////////
	function update_discount ( e ) {
		
		var obj = e.source;
		
		var default_value = engine.get_value( args.row, args.col );
		
		if ( default_value != obj.value ) {
			
			engine.update_value( args.row, args.col, obj.value );
			
			engine.re_calculate();				
			
			if ( args.callback ) args.callback();
			if ( callback_update_others ) callback_update_others( obj.value );
			
		}
		
		
	};
	
	self.update_from_master = function ( value ){
		
		slider.setValue( value );
		//console.log( args.row + ' / ' + args.col );
		engine.update_value( args.row, args.col, value );
			
			
	};
	
	
	
////////////////////////////////////////////////////
//RUN FUNCTIONS
////////////////////////////////////////////////////
	
		
	return self;
	
}

module.exports = this_class;