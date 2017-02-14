function this_class(  ) {



////////////////////////////////////////////////////
//VARS
////////////////////////////////////////////////////
	
	var self = Ti.UI.createWindow( { width: 1024, height:768, zIndex:0, fullscreen:true, navBarHidden:true, backgroundColor: settings.get_color( 'brown' ), window_id:"Assumptions" } );
	
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
			
			
			//TOP BAR
			
			var top_bar = lvc_ui.create_top_bar();
			self.container.add( top_bar );
			
			//HEADER
			
			var header_banner_container = Ti.UI.createView({
				width: 1024,
				height: 82,
				left:0,
				top:55
			});
			self.container.add( header_banner_container );

				var arrows_and_dots_container = Ti.UI.createView({
					width:130,
					height: 26,
					top:26,
					left:49,
					zIndex:1000,
					backgroundImage: 'includes/images/dots_and_arrow.png'	
				});
				header_banner_container.add(arrows_and_dots_container);

					var header_label = Ti.UI.createLabel({						
						left:195, top:16,
						width:400, height:50,
						font: { fontSize: 30, fontFamily: settings.get_font( 'GR-Bold' ) },
						text: 'ASSUMPTIONS',
						color: settings.get_color( 'brown' )					
					});
					header_banner_container.add( header_label );			
		
		//MAIN
		
		var scroll_view = Ti.UI.createScrollView({
			width: Ti.UI.FILL,
			height: Ti.UI.FILL,
			top:130,
			layout: 'vertical'
		});
		self.container.add( scroll_view );
			
			var main_container = Ti.UI.createView({
				width: 920,
				height: Ti.UI.SIZE,
				top: 0,
				backgroundColor: '#eeeeee',
				layout: 'vertical'
			});
			scroll_view.add( main_container );

				var temp_array = json_data.assumptions.slides;
				
				for ( var i=0;i<temp_array.length;i++ ) {
					
					var temp_view = Ti.UI.createView({
						left: 55, top: 25, right: 55, 
						width: Ti.UI.FILL, height: Ti.UI.SIZE
					});
					main_container.add( temp_view );
						
						var pink_arrow = Ti.UI.createImageView({
							left: 0, top: 0,
							width: 'auto', height: 'auto',
							image: 'includes/images/basaglar/pink_arrow.png'
						});
						temp_view.add( pink_arrow );
							
						var temp_view_label = Ti.UI.createLabel({
							left: 20, width: Ti.UI.FILL, height: Ti.UI.SIZE,					
							color:  settings.get_color( 'brown' ),
							text: temp_array[i].main_text,
							font: { fontSize: 18, fontFamily: settings.get_font( 'GR-Book' ) },
							textAlign: 'left'
						});
						temp_view.add( temp_view_label );
										
				}
				
				var spacer = Ti.UI.createView({
					width: '100%',
					height: 40,
					top:0,
					left:0	
				});
				main_container.add(spacer);
				
				
				
			var proceed_button = Ti.UI.createButton({
		        top: 20, bottom: 20,
		        width: 330, height: 48,
		        title: 'PROCEED TO DATA INPUTS',
		        backgroundColor: '#63b67c',
				borderColor: '#69c083', 
				borderWidth: 6,
		        color: 'white',
		        font: { fontSize: 14, fontFamily: settings.get_font( 'GR-Medium' ) }
			    		
		    });
			scroll_view.add( proceed_button );
			proceed_button.addEventListener( 'click', proceed_button_clicked );	
			
			scroll_view.addEventListener( 'scrollend', scroll_end );
					
			var scroll_indicator = Ti.UI.createView({
				width: 24,
				height: 14,
				bottom: 40,
				right: 65,
				zIndex:1000,
				backgroundImage: 'includes/images/assumptions_arrow.png'	
			});
			self.container.add( scroll_indicator );	
			
					
////////////////////////////////////////////////////
//FUNCTIONS
////////////////////////////////////////////////////

	function scroll_end( e ) {
		
		var obj = e.source;
		
		if ( obj.contentOffset.y > 220 ) {
			
			scroll_indicator.animate( { opacity: 0, duration: 500 } );
			
		} else {
			
			scroll_indicator.opacity = 1;		
			
		}
		
	};
	
	
	function proceed_button_clicked () {
		
		screen_controller.switch_screen_state_function( 'Data Inputs' );
	
	};		

////////////////////////////////////////////////////
//RUN FUNCTIONS
////////////////////////////////////////////////////
	
	return self;
	
}

module.exports = this_class;