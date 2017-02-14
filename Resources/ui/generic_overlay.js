function this_class( obj ) {



////////////////////////////////////////////////////
//VARS
////////////////////////////////////////////////////

	var self = Ti.UI.createWindow( { width: 1024, height:768, zIndex:0, fullscreen:true, navBarHidden:true, backgroundColor: settings.get_color( 'white' ), window_id:"Clinical Efficacy" } );
	
////////////////////////////////////////////////////
//UI
////////////////////////////////////////////////////

		self.container = Ti.UI.createView({
			width: 1024,
			height: 768,
			left:0,
			backgroundColor: settings.get_color( 'white' )
		});
		self.add( self.container );
			
			var cross = lvc_ui.create_cross();	
			self.container.add( cross );
			
			if ( obj.title ) {
			
				var title_label = Ti.UI.createLabel({
					top: 50,
					width: 600, height: 100,
					font: { fontFamily: settings.get_font( 'GR-Bold' ), fontSize:30 },
					color: 'black',
					textAlign: 'center',
					text: obj.title			
				});	
				self.container.add( title_label );
			
			}
			
			if ( obj.sub_title ) {
			
				var sub_title_label = Ti.UI.createLabel({
					top: 150,
					width: 600, height: 60,
					font: { fontFamily: settings.get_font( 'GR-Book' ), fontSize:17 },
					color: 'black',
					textAlign: 'center',
					text: obj.sub_title			
				});	
				self.container.add( sub_title_label );
			
			}
			
			if ( obj.image ) {
				var image = Ti.UI.createImageView({
					top: 240,
					width: 'auto', height: 'auto',
					image: obj.image
				});
				self.container.add( image );
				print( obj.image );
			}
			
		

////////////////////////////////////////////////////
//FUNCTIONS
////////////////////////////////////////////////////



////////////////////////////////////////////////////
//RUN FUNCTIONS
////////////////////////////////////////////////////


	
	return self;
	
}

module.exports = this_class;