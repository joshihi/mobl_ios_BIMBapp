function this_class( label, callback ) {



////////////////////////////////////////////////////
//VARS
////////////////////////////////////////////////////
	
	var height = 50;
	var callback_ran = false;	

////////////////////////////////////////////////////
//UI
////////////////////////////////////////////////////

////////////////////////////////////////////////////
//FUNCTIONS
////////////////////////////////////////////////////
	
	var self = Ti.UI.createView({
		left: 0, top: 0,
		width: Ti.UI.FILL, height: Ti.UI.SIZE,
		layout: 'vertical'
	});
	
		var header = Ti.UI.createView({
			left: 0, top: 0,
			width: Ti.UI.FILL, height: height,
			//borderRadius: 5,
			borderColor: '#cccccc',
			backgroundColor: '#cccccc'
		});
		self.add( header );
		
			var label = Ti.UI.createLabel({						
				left: 20, top: 0,
				width: Ti.UI.SIZE, height: height,
				font: { fontSize: 18, fontFamily: settings.get_font( 'GR-Bold' ) },
				text: label,
				color: settings.get_color( 'brown' )					
			});
			header.add( label );
		
			var accordian_button = Ti.UI.createView({						
				right: 0, top: 0,
				width: height, height: height,	
				//borderRadius: 5,
				backgroundColor: '#69c083',
				borderColor: '#76cc90', 
				borderWidth: 6,
				backgroundImage: 'includes/images/data_inputs/plus_icon.png'				
			});
			header.add( accordian_button );
			
			var hit_area = Ti.UI.createView({						
				left: 0, top: 0,
				width: Ti.UI.FILL, height: Ti.UI.FILL,	
				disabled: true,
				selected: false,
				container: self,
				button: accordian_button		
			});
			header.add( hit_area );
			header.hit_area = hit_area;
			hit_area.addEventListener( 'click', accordian_header_clicked );
			
		self.container = Ti.UI.createView({
			left: 0, top: 5, bottom: 5,
			width: '100%', height: 0,
			layout: 'vertical'
		});
		self.add( self.container );
		
	
	function accordian_header_clicked ( e ) {
		
		var obj = e.source;
				
		if ( !obj.disabled ) {
			
			change_accordian_header_state( obj );
			
		} 
		
	};
	
	function change_accordian_header_state( obj ) {
		
		if ( !callback_ran ) {
			callback();
			callback_ran = true;
		}
		
		if ( obj.selected ) {
			
			obj.button.backgroundImage = 'includes/images/data_inputs/plus_icon.png';
			obj.button.backgroundColor = '#69c083';
			obj.button.borderColor = '#76cc90';
			obj.button.borderWidth = 6;
			
			self.close();
			
		} else {
			
			obj.button.backgroundImage = 'includes/images/data_inputs/minus_icon.png';
			obj.button.backgroundColor = '#CCCCCC';
			obj.button.borderWidth = 0;
			
			self.reveal();
						
		}
		
		obj.selected = !obj.selected;
		
	};
	
	self.change_disabled_state = function () {
	
		if ( header.hit_area.disabled ) {
			
			header.backgroundColor = '#FFFFFF';
			
		} else {
			
			header.backgroundColor = '#CCCCCC';
			
		}
		
		header.hit_area.disabled = !header.hit_area.disabled;
		
	};
	
	self.reveal = function () {
	
		self.container.height = Ti.UI.SIZE;
		
	};
	
	self.close = function () {
	
		self.container.height = 0;
		
	};
	
////////////////////////////////////////////////////
//RUN FUNCTIONS
////////////////////////////////////////////////////


	
	return self;
	
}

module.exports = this_class;