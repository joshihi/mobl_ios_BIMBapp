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
			cross.zIndex = 10000;	
			self.container.add( cross );
					
			var graph = Ti.UI.createImageView({
				top: 0,
				width: Ti.UI.SIZE, height: Ti.UI.SIZE,
				image: 'includes/images/clinical_efficacy/'+obj.link+'.png' 
			});
			self.container.add( graph );
			
			// print( graph.backgroundImage );
			
			var string_to_change = "1c";
			if ( obj.graph_title.indexOf( string_to_change ) > -1 ) {
				var attr = Ti.UI.createAttributedString({
				    text: obj.graph_title,
				    attributes: [
				        {
				            type: Ti.UI.ATTRIBUTE_FONT,
				            value: { fontSize: 15, fontFamily: settings.get_font( 'GR-Bold' ) },
				            range: [ obj.graph_title.indexOf( string_to_change ), ( string_to_change ).length]
				        }
				   ]
				});
							
				var title_label = Ti.UI.createLabel({
					top: 80,
					width: 600, height: Ti.UI.SIZE,
					font: { fontFamily: settings.get_font( 'GR-Bold' ), fontSize:30 },
					color: 'black',
					textAlign: 'center',
					//text: obj.graph_title
					attributedString: attr				
				});	
				self.container.add( title_label );
			} else {
				
				var title_label = Ti.UI.createLabel({
					top: 80,
					width: 600, height: Ti.UI.SIZE,
					font: { fontFamily: settings.get_font( 'GR-Bold' ), fontSize:30 },
					color: 'black',
					textAlign: 'center',
					text: obj.graph_title
					//attributedString: attr				
				});	
				self.container.add( title_label );
				
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