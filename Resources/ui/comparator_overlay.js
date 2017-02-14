function this_class( product_id ) {



////////////////////////////////////////////////////
//VARS
////////////////////////////////////////////////////
	
	var product_message = _default[ product_id + '_warning_message' ];
	
	var self = Ti.UI.createWindow( { width: 1024, height:768, zIndex:0, fullscreen:true, navBarHidden:true, window_id:"Overview" } );
		
////////////////////////////////////////////////////
//UI
////////////////////////////////////////////////////
	
		var bg = Ti.UI.createView({
			width: 1024,
			height: 768,
			opacity: 0.8,
			backgroundColor: 'black'
		});
		self.add( bg );
	
		self.container = Ti.UI.createView({
			width: 750,
			height: 170,
			backgroundColor: 'white'
		});
		self.add( self.container );
			
			var cross = lvc_ui.create_cross();	
			self.container.add( cross );
			
			var title_label = Ti.UI.createLabel({
				left: 40, top: 50,
				width: "100%", height: Ti.UI.SIZE,
				font: { fontFamily: settings.get_font( 'GR-Bold' ), fontSize:17 },
				color: 'black',
				textAlign: 'left',
				text: product_id.toUpperCase()			
			});	
			self.container.add( title_label );
			
			var message_label = Ti.UI.createLabel({
				left: 40, top: 85, right: 40,
				width: Ti.UI.FILL, height: Ti.UI.SIZE,
				font: { fontFamily: settings.get_font( 'G-Book' ), fontSize:15 },
				color: 'black',
				textAlign: 'left',
				text: product_message	
			});	
			self.container.add( message_label );
			

////////////////////////////////////////////////////
//FUNCTIONS
////////////////////////////////////////////////////

	function proceed_function() {
		
		layers.remove_layer_function();
		
	}

////////////////////////////////////////////////////
//RUN FUNCTIONS
////////////////////////////////////////////////////


	
	return self;
	
}

module.exports = this_class;