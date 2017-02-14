function this_class(  ) {



////////////////////////////////////////////////////
//VARS
////////////////////////////////////////////////////

	var self = Ti.UI.createWindow( { width: 1024, height:768, zIndex:0, fullscreen:true, navBarHidden:true, backgroundColor: settings.get_color( 'white' ), window_id:"Heritage" } );
	
	var color_array = [ '#b83d88', '#39b0bd', '#d19c07', '#9ca123' ];
	var position_array = [ 170, 375, 570, 765 ];
	var reveal_array = new Array();
	
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
				top: 115,
				width: "100%", height: Ti.UI.SIZE,
				font: { fontFamily: settings.get_font( 'GR-Bold' ), fontSize:30 },
				color: 'black',
				textAlign: 'center',
				text: json_data.heritage.title		
			});	
			self.container.add( title_label );
			
			var bg_image = Ti.UI.createView({
				top: 200,
				width: 750,
				height: 225,
				backgroundImage: 'includes/images/heritage_bg.png'
			});
			self.container.add( bg_image );
			
			var slides = json_data.heritage.slides;
			
			for ( var i=0; i<slides.length; i++ ) {
				
				var date_circle = Ti.UI.createLabel({
					top: 345, left: position_array[i],
					width: 90, height: 90,
					borderRadius: 45,
					font: { fontFamily: settings.get_font( 'GR-Bold' ), fontSize: 24 },
					color: 'white',
					textAlign: 'center',
					text: slides[i].year,
					backgroundColor: color_array[ i ],
					id: i		
				});	
				self.container.add( date_circle );
				date_circle.addEventListener( 'click', year_clicked );
				
				var reveal = {};
				
				reveal.line = Ti.UI.createView({
					top: 435, left: position_array[i]+42,
					width: 5, height: 45,
					backgroundColor: color_array[ i ],
					opacity: 0		
				});	
				self.container.add( reveal.line );
				
				reveal.text_container = Ti.UI.createView({
					top: 480, left: position_array[i] - 120,
					width: Ti.UI.SIZE, height: Ti.UI.SIZE,
					backgroundColor: color_array[ i ],
					opacity: 0		
				});	
				self.container.add( reveal.text_container );
				
					var reveal_text = Ti.UI.createLabel({
						top: 20, left: 20, bottom: 20, right: 20,
						width: 305, height: Ti.UI.SIZE,
						font: { fontFamily: settings.get_font( 'G-Book' ), fontSize: 17 },
						color: 'white',
						textAlign: 'left',
						text: slides[i].main_text		
					});	
					reveal.text_container.add( reveal_text );
				
				reveal_array.push( reveal );
				
			}
			
			show_reveal_area( 0 );
				
		

////////////////////////////////////////////////////
//FUNCTIONS
////////////////////////////////////////////////////
	
	function year_clicked ( e ) {
		
		var obj = e.source;
		
		show_reveal_area( obj.id );
		
	};
	
	function show_reveal_area ( position ) {
		
		for ( var i=0; i< reveal_array.length; i++ ) {
			
			if ( i == position ) {
				
				reveal_array[i].line.opacity = 1;
				reveal_array[i].text_container.opacity = 1;
				
			} else {
				
				reveal_array[i].line.opacity = 0;
				reveal_array[i].text_container.opacity = 0;
						
			}
			
		}
		
		
	};
	
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