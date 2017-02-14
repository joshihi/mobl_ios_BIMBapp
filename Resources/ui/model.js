function this_class(  ) {



////////////////////////////////////////////////////
//VARS
////////////////////////////////////////////////////
	
	var self = Ti.UI.createWindow( { width: 1024, height:768, zIndex:0, fullscreen:true, navBarHidden:true, backgroundColor: settings.get_color( 'brown' ), window_id:"Model Flow" } );
	
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
			
			
			var main_container = Ti.UI.createView({
				left: 0, top:0,
				width: '100%', height: '100%'
			});
			self.container.add( main_container );
			
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
						text: json_data.model.title,
						color: settings.get_color( 'brown' )					
					});
					header_banner_container.add( header_label );			
		
		//MAIN
			
			
			var para = Ti.UI.createLabel({
				top: 185, 
				width: 655, height: 190,					
				color:  settings.get_color( 'brown' ),
				text: json_data.model.para,
				font: { fontSize: 17, fontFamily: settings.get_font( 'G-Book' ) },
				textAlign: 'left'
			});
			main_container.add( para );
			
			var p1 = Ti.UI.createImageView({
				left: 160, top: 227,
				width: 'auto', height: 'auto',
				image: 'includes/images/basaglar/pink_arrow.png'
			});
			main_container.add( p1 );
			
			var p2 = Ti.UI.createImageView({
				left: 160, top: 277,
				width: 'auto', height: 'auto',
				image: 'includes/images/basaglar/pink_arrow.png'
			});
			main_container.add( p2 );
			
			var p3 = Ti.UI.createImageView({
				left: 160, top: 325,
				width: 'auto', height: 'auto',
				image: 'includes/images/basaglar/pink_arrow.png'
			});
			main_container.add( p3 );
			
			var color_array = [ { one: '#c6579a', two: '#cd70a8' }, { one: '#2dccd3', two: '#49d6dc' }, { one: '#d19c07', two: '#dcb442' }, { one: '#9ca123', two: '#b6bb3f' } ];					
			
			var circle_1 = Ti.UI.createView({
				left: 55, top:392,
				width: 198, height: 198,
				borderRadius: 99,
				backgroundColor: color_array[ 0 ].one,
				borderColor: color_array[ 0 ].two,
				borderWidth: 6,
				opacity: 0
			});
			main_container.add( circle_1 );
			
				var c1_title = Ti.UI.createLabel({
//					top: 50, 
					width: '100%', 					
					color:  settings.get_color( 'white' ),
					text: json_data.model.circle_1.title,
					font: { fontSize: 19, fontFamily: settings.get_font( 'GR-Bold' ) },
					textAlign: 'center',
					id: 'Assumptions'
				});
				circle_1.add( c1_title );
/*				
				var c1_text = Ti.UI.createLabel({
					top: 72, 
					width: '100%', 					
					color:  settings.get_color( 'white' ),
					text: json_data.model.circle_1.text,
					font: { fontSize: 17, fontFamily: settings.get_font( 'G-Book' ) },
					textAlign: 'center',
					opacity: 0
				});
				circle_1.add( c1_text );
				circle_1.text_view = c1_text;
*/
				c1_title.addEventListener( 'click', circled_clicked );
				
			var circle_2 = Ti.UI.createView({
				left: 295, top:392,
				width: 198, height: 198,
				borderRadius: 99,
				backgroundColor: color_array[ 1 ].one,
				borderColor: color_array[ 1 ].two,
				borderWidth: 6,
				opacity: 0
			});
			main_container.add( circle_2 );
			
				var c2_title = Ti.UI.createLabel({
//					top: 38, 
					width: '100%', 					
					color:  settings.get_color( 'white' ),
					text: json_data.model.circle_2.title,
					font: { fontSize: 19, fontFamily: settings.get_font( 'GR-Bold' ) },
					textAlign: 'center',
					id: 'Data Inputs'
				});
				circle_2.add( c2_title );
// 				
				// var c2_text = Ti.UI.createLabel({
					// top: 80, 
					// width: '100%', 					
					// color:  settings.get_color( 'white' ),
					// text: json_data.model.circle_2.text,
					// font: { fontSize: 17, fontFamily: settings.get_font( 'G-Book' ) },
					// textAlign: 'center',
					// opacity: 0
				// });
				// circle_2.add( c2_text );
				// circle_2.text_view = c2_text;
				c2_title.addEventListener( 'click', circled_clicked );
				
			var circle_3 = Ti.UI.createView({
				left: 535, top:392,
				width: 198, height: 198,
				borderRadius: 99,
				backgroundColor: color_array[ 2 ].one,
				borderColor: color_array[ 2 ].two,
				borderWidth: 6,
				opacity: 0
			});
			main_container.add( circle_3 );
			
				var c3_title = Ti.UI.createLabel({
//					top: 50, 
					width: '100%', 					
					color:  settings.get_color( 'white' ),
					text: json_data.model.circle_3.title,
					font: { fontSize: 19, fontFamily: settings.get_font( 'GR-Bold' ) },
					textAlign: 'center',
					id: 'Budget Impact'
				});
				circle_3.add( c3_title );
				
				// var c3_text = Ti.UI.createLabel({
					// top: 72, 
					// width: '100%', 					
					// color:  settings.get_color( 'white' ),
					// text: json_data.model.circle_3.text,
					// font: { fontSize: 17, fontFamily: settings.get_font( 'G-Book' ) },
					// textAlign: 'center',
					// opacity: 0
				// });
				// circle_3.add( c3_text );
				// circle_3.text_view = c3_text;
				c3_title.addEventListener( 'click', circled_clicked );
				
			var circle_4 = Ti.UI.createView({
				left: 775, top:392,
				width: 198, height: 198,
				borderRadius: 99,
				backgroundColor: color_array[ 3 ].one,
				borderColor: color_array[ 3 ].two,
				borderWidth: 6,
				opacity: 0
			});
			main_container.add( circle_4 );
			
			
				var c4_title = Ti.UI.createLabel({
//					top: 60, 
					width: '100%', 					
					color:  settings.get_color( 'white' ),
					text: json_data.model.circle_4.title,
					font: { fontSize: 19, fontFamily: settings.get_font( 'GR-Bold' ) },
					textAlign: 'center',
					id: 'Report'
				});
				circle_4.add( c4_title );
				
				// var c4_text = Ti.UI.createLabel({
					// top: 80, 
					// width: '100%', 					
					// color:  settings.get_color( 'white' ),
					// text: json_data.model.circle_4.text,
					// font: { fontSize: 17, fontFamily: settings.get_font( 'G-Book' ) },
					// textAlign: 'center',
					// opacity: 0
				// });
				// circle_4.add( c4_text );
// 				
				// circle_4.text_view = c4_text;
				c4_title.addEventListener( 'click', circled_clicked );
				
			var arrow_1 = Ti.UI.createView({
				left: 260, top: 467,
				width: 26, height: 44,
				backgroundImage: 'includes/images/model/grey_arrow.png'
			});
			main_container.add( arrow_1 );
			
			var arrow_2 = Ti.UI.createView({
				left: 500, top: 467,
				width: 26, height: 44,
				backgroundImage: 'includes/images/model/grey_arrow.png'
			});
			main_container.add( arrow_2 );
			
			var arrow_3 = Ti.UI.createView({
				left: 740, top: 467,
				width: 26, height: 44,
				backgroundImage: 'includes/images/model/grey_arrow.png'
			});
			main_container.add( arrow_3 );
			
			var proceed_button = Ti.UI.createView({
				top: 648,
				width: 245, height: 48,
				//backgroundColor: settings.get_color( 'light_green' ),
				backgroundColor: '#63b67c',
				borderColor: '#69c083', 
				borderWidth: 6
			});
			main_container.add( proceed_button );
			
				var proceed_text = lvc_ui.create_label();
					proceed_text.text = json_data.model.proceed_text;
					proceed_text.font = { 
										fontSize: 14,
										fontFamily: settings.get_font( 'GR-Medium' )
									};
					proceed_text.color = '#FFFFFF';
				proceed_button.add( proceed_text );
					
				var proceed_hit_area = lvc_ui.create_hit_area();
				proceed_button.add( proceed_hit_area );
				proceed_hit_area.addEventListener( 'click', proceed_function );
			
					
////////////////////////////////////////////////////
//FUNCTIONS
////////////////////////////////////////////////////
	function trigger_animations() {
		
		circle_1.animate( { opacity: 1, duration: 750, delay: 500 } );
		circle_2.animate( { opacity: 1, duration: 750, delay: 750 } );
		circle_3.animate( { opacity: 1, duration: 750, delay: 1000 } );
		circle_4.animate( { opacity: 1, duration: 750, delay: 1250 } );
	
	}
	
	function proceed_function() {
		
		screen_controller.switch_screen_state_function( 'Assumptions' );
		
	}		
	
	function circled_clicked ( e ) {
		
		var obj = e.source;
	
		screen_controller.switch_screen_state_function( obj.id );
		
//		obj.text_view.animate( { opacity: 1, duration: 500 } );	
		
		
	};

////////////////////////////////////////////////////
//RUN FUNCTIONS
////////////////////////////////////////////////////
	
	trigger_animations();

	
	return self;
	
}

module.exports = this_class;