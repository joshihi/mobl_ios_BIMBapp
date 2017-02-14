function this_class(  ) {



////////////////////////////////////////////////////
//VARS
////////////////////////////////////////////////////
	
	var message = "There are introductory screens prior to this that \ndescribe Diabetes Heritage, Basaglar, \nBasaglar Sequence, Clinical Efficacy & Safety, Device, \nInitiation Experience, Model Flow and Assumptions. \nPlease confirm you want to skip this information \nand proceed directly to the data inputs.";

	var self = Ti.UI.createWindow( { width: 1024, height:768, zIndex:0, fullscreen:true, navBarHidden:true, backgroundColor: settings.get_color( 'white' ), window_id:"Overview" } );
	
	var previous_tab = null;
	
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
			
			var title_label = Ti.UI.createLabel({
				top: 208,
				width: "100%", height: Ti.UI.SIZE,
				font: { fontFamily: settings.get_font( 'GR-Bold' ), fontSize:30 },
				color: 'black',
				textAlign: 'center',
				text: 'SKIP TO DATA INPUT'			
			});	
			self.container.add( title_label );
			
			var message_label = Ti.UI.createLabel({
				top: 260,
				width: "100%", height: Ti.UI.SIZE,
				font: { fontFamily: settings.get_font( 'G-Book' ), fontSize:17 },
				color: 'black',
				textAlign: 'center',
				text: message		
			});	
			self.container.add( message_label );
			
						
			var proceed_button = Ti.UI.createLabel({
				top: 415,
				width: 255, height: 48,				
				text: 'PROCEED TO DATA INPUT',
				font: { fontSize: 14, fontFamily: settings.get_font( 'GR-Medium' ) },
				backgroundColor: '#63b67c',
				borderColor: '#69c083', 
				borderWidth: 6,
				color:  settings.get_color( 'white' ),
				textAlign: 'center'
			});
			self.container.add( proceed_button );
			proceed_button.addEventListener( 'click', proceed_function );
				
		

////////////////////////////////////////////////////
//FUNCTIONS
////////////////////////////////////////////////////

	function proceed_function() {
		
		layers.remove_layer_function();
		screen_controller.switch_screen_state_function( 'Data Inputs' );
		
	}

////////////////////////////////////////////////////
//RUN FUNCTIONS
////////////////////////////////////////////////////


	
	return self;
	
}

module.exports = this_class;