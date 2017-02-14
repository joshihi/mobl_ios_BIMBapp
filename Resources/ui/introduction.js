function this_class(  ) {



////////////////////////////////////////////////////
//VARS
////////////////////////////////////////////////////
	
	var self = Ti.UI.createWindow( { width: 1024, height:768, zIndex:0, fullscreen:true, navBarHidden:true, backgroundColor: settings.get_color( 'brown' ), window_id:"Introduction" } );
	
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
						text: json_data.intro.title,
						color: settings.get_color( 'brown' )					
					});
					header_banner_container.add( header_label );
/*		
			var biosimilar_button_container = Ti.UI.createView({
				width: 128,
				height: 48,
				left:695,
				top:18,
				backgroundColor: settings.get_color( 'light_green' )
			});
			header_banner_container.add( biosimilar_button_container );
				
				var biosimilar_text = lvc_ui.create_label();
					biosimilar_text.text = json_data.intro.button_one;
					biosimilar_text.right = 0;
					biosimilar_text.width = "80%";
					biosimilar_text.font = { 
										fontSize: 14,
										fontFamily: settings.get_font( 'GR-Bold' )
									};
					biosimilar_text.color = '#FFFFFF';
				biosimilar_button_container.add( biosimilar_text );
				
				var biosimilar_icon = Ti.UI.createView({
					left: 10,
					width:24, height: 24,
					backgroundImage: 'includes/images/biosimilar_icon.png'	
				});
				biosimilar_button_container.add(biosimilar_icon);
				
				var biosimilar_hit_area = lvc_ui.create_hit_area();
				biosimilar_button_container.add( biosimilar_hit_area );
				biosimilar_hit_area.addEventListener( 'click', biosimilar_clicked );
						
			var heritage_button_container = Ti.UI.createView({
				width: 128,
				height: 48,
				left:840,
				top:18,
				backgroundColor:  settings.get_color( 'light_green' )
			});
			header_banner_container.add( heritage_button_container );
			
				var heritage_text = lvc_ui.create_label();
					heritage_text.text = json_data.intro.button_two;
					heritage_text.right = 0;
					heritage_text.width = "80%";
					heritage_text.font = { 
										fontSize: 14,
										fontFamily: settings.get_font( 'GR-Bold' )
									};
					heritage_text.color = '#FFFFFF';
				heritage_button_container.add( heritage_text );
				
				var heritage_icon = Ti.UI.createView({
					left: 10,
					width:24, height: 24,
					backgroundImage: 'includes/images/heritage_icon.png'	
				});
				heritage_button_container.add(heritage_icon);
				
				var heritage_hit_area = lvc_ui.create_hit_area();
				heritage_button_container.add( heritage_hit_area );
				heritage_hit_area.addEventListener( 'click', heritage_clicked );
*/				
		//MAIN
		
		var main_tab_container = Ti.UI.createView({
			left: 56, top: 136,
			width: 912, height: 48,
			layout: 'horizontal'
		});
		self.container.add( main_tab_container );
				
				var tab_one = Ti.UI.createLabel({
					left: 0, top:0,
					width: 147, height: 48,
					borderRadius: 5,					
					borderWidth: 5,					
					borderColor:  settings.get_color( 'light_grey' ),												
					backgroundColor:  settings.get_color( 'light_grey' ),
					color:  settings.get_color( 'brown' ),
					text: json_data.intro.content_one.title,
					font: { fontSize: 14, fontFamily: settings.get_font( 'GR-Medium' ) },
					textAlign: 'center',
					id: 0
				});
				main_tab_container.add( tab_one );		
				tab_one.addEventListener( 'click', tab_button_clicked );
				
				var tab_two = Ti.UI.createLabel({
					left: 6, top:0,
					width: 147, height: 48,
					borderRadius: 5,
					borderWidth: 5,							
					borderColor:  settings.get_color( 'border_green' ),												
					backgroundColor:  settings.get_color( 'bg_green' ),
					color:  settings.get_color( 'white' ),
					text: json_data.intro.content_two.title,
					font: { fontSize: 14, fontFamily: settings.get_font( 'GR-Medium' ) },
					textAlign: 'center',
					id: 1
				});
				main_tab_container.add( tab_two );
				tab_two.addEventListener( 'click', tab_button_clicked );
				
				var tab_three = Ti.UI.createLabel({
					left: 6, top:0,
					width: 147, height: 48,
					borderRadius: 5,
					borderWidth: 5,	
					borderColor:  settings.get_color( 'border_green' ),																	
					backgroundColor:  settings.get_color( 'bg_green' ),						
					color:  settings.get_color( 'white' ),
					text: json_data.intro.content_three.title,
					font: { fontSize: 14, fontFamily: settings.get_font( 'GR-Medium' ) },
					textAlign: 'center',
					id: 2
				});
				main_tab_container.add( tab_three );
				tab_three.addEventListener( 'click', tab_button_clicked );
								
				var tab_four = Ti.UI.createLabel({
					left: 6, top: 0,
					width: 147, height: 48,
					borderRadius: 5,
					borderWidth: 5,
					borderColor:  settings.get_color( 'border_green' ),												
					backgroundColor:  settings.get_color( 'bg_green' ),
					color:  settings.get_color( 'white' ),
					text: json_data.intro.content_four.title,
					font: { fontSize: 14, fontFamily: settings.get_font( 'GR-Medium' ) },
					textAlign: 'center',
					id: 3
				});
				main_tab_container.add( tab_four );
				tab_four.addEventListener( 'click', tab_button_clicked );
								
				var tab_five = Ti.UI.createLabel({
					left: 6, top:0,
					width: 147, height: 48,
					borderRadius: 5,
					borderWidth: 5,
					borderColor:  settings.get_color( 'border_green' ),																			
					backgroundColor:  settings.get_color( 'bg_green' ),
					color:  settings.get_color( 'white' ),
					text: json_data.intro.content_five.title,
					font: { fontSize: 14, fontFamily: settings.get_font( 'GR-Medium' ) },
					textAlign: 'center',
					id: 4
				});
				main_tab_container.add( tab_five );
				tab_five.addEventListener( 'click', tab_button_clicked );
				
				var tab_six = Ti.UI.createLabel({
					left: 6, top:0,
					width: 147, height: 48,
					borderRadius: 5,
					borderWidth: 5,
					borderColor:  settings.get_color( 'border_green' ),																								
					backgroundColor:  settings.get_color( 'bg_green' ),
					color:  settings.get_color( 'white' ),
					text: json_data.intro.content_six.title,
					font: { fontSize: 14, fontFamily: settings.get_font( 'GR-Medium' ) },
					textAlign: 'center',
					id: 5
				});
				main_tab_container.add( tab_six );
				tab_six.addEventListener( 'click', tab_button_clicked );
				
		
		var main_container = Ti.UI.createView({
			width: 912,
			height: 516,
			left:56,
			top:180,
			backgroundColor: settings.get_color( 'light_grey' )
		});
		self.container.add( main_container );	
			
			var main_header_title = Ti.UI.createLabel({
				left:0, top:32,
				width: "100%", height: 35,				
				color:  settings.get_color( 'brown' ),
				text: json_data.intro.content_one.title.toUpperCase(),
				font: { fontSize: 30, fontFamily: settings.get_font( 'GR-Bold' ) },
				textAlign: 'center'
			});
			main_container.add( main_header_title );	
		
	

	tab_button_clicked( { source: tab_one } );
					
////////////////////////////////////////////////////
//FUNCTIONS
////////////////////////////////////////////////////
	
	function create_content_one () {
		
		main_container.content_container = Ti.UI.createView({
			opacity: 0,
			left:0, top:85,
			width: "100%", height: 430
		});
		main_container.add( main_container.content_container );
			
			var temp_array = json_data.intro.content_one.slides;
			var slide_array = new Array();
			
			for ( var i=0;i<temp_array.length;i++ ) {
				
				var temp_view = Ti.UI.createView({
					width: 750, height: 370
				});
					
					var temp_view_label = Ti.UI.createLabel({
						left:0, top:0, width: '100%', height: 80,					
						color:  settings.get_color( 'brown' ),
						text: temp_array[i].main_text,
						font: { fontSize: 18, fontFamily: settings.get_font( 'GR-Medium' ) },
						textAlign: 'center'
					});
					temp_view.add( temp_view_label );
				
				if ( i == 0 ) {
					var diagram = Ti.UI.createView({
						bottom: 35,
						width: 597, height: 240,
						backgroundImage: 'includes/images/intro/history/diagram_one.png'
					});
					temp_view.add( diagram );
				}	
				
				if ( i == 1 ) {
					var bg_image = Ti.UI.createView({
						top: 60,
						width: 611,
						height: 136,
						backgroundImage: 'includes/images/heritage_bg.png'
					});
					temp_view.add( bg_image );
					
					var slides = json_data.heritage.slides;
					var color_array = [ { one: '#c6579a', two: '#cd70a8' }, { one: '#2dccd3', two: '#49d6dc' }, { one: '#d19c07', two: '#dcb442' }, { one: '#9ca123', two: '#b6bb3f' } ];
					var position_array = [ 75, 252, 430, 605 ];
					var pop_up_position_array = [ 
						{ left: 77, top: 234, width: 420, height: 100 },
						{ left: 77, top: 234, width: 420, height: 100 },
						{ left: 252, top: 234, width: 420, height: 85 },
						{ left: 252, top: 234, width: 420, height: 85 }
					];
					var reveal_array = new Array();
					
					var previous_tab = null;
					
					for ( var k=0; k<slides.length; k++ ) {
						
						var date_circle = Ti.UI.createLabel({
							top: 150, left: position_array[k],
							width: 70, height: 70,
							borderRadius: 35,
							borderWidth: 6,
							font: { fontFamily: settings.get_font( 'GR-Bold' ), fontSize: 18 },
							color: 'white',
							textAlign: 'center',
							text: slides[ k ].year,
							backgroundColor: color_array[ k ].one,
							borderColor: color_array[ k ].two,
							id: k		
						});	
						temp_view.add( date_circle );
						date_circle.addEventListener( 'click', year_clicked );
						
						var reveal = {};
						
						reveal.line = Ti.UI.createView({
							top: 200, left: position_array[ k ]+32,
							width: 5, height: 45,
							backgroundColor: color_array[ k ].one,
							opacity: 0		
						});	
						temp_view.add( reveal.line );
						
						reveal.text_container = Ti.UI.createView({
							top: pop_up_position_array[ k ].top, left: pop_up_position_array[ k ].left,
							width: pop_up_position_array[ k ].width, height: pop_up_position_array[ k ].height,
							backgroundColor: color_array[ k ].one,
							opacity: 0,
							borderRadius: 5			
						});	
						temp_view.add( reveal.text_container );
						
							var reveal_text = Ti.UI.createLabel({
								top: 15, left: 15, bottom: 15, right: 15,
								width: Ti.UI.FILL, height: Ti.UI.FILL,
								font: { fontFamily: settings.get_font( 'G-Book' ), fontSize: 12 },
								color: 'white',
								textAlign: 'left',
								text: slides[ k ].main_text	
							});	
							reveal.text_container.add( reveal_text );
						
						reveal_array.push( reveal );
						
					}
					
					show_reveal_area( 0 );
					
					function year_clicked ( e ) {
						
						var obj = e.source;
						
						show_reveal_area( obj.id );
						
					};
					
					function show_reveal_area ( position ) {
						
						for ( var l=0; l< reveal_array.length; l++ ) {
							
							if ( l == position ) {
								
								reveal_array[l].line.opacity = 1;
								reveal_array[l].text_container.opacity = 1;
								
							} else {
								
								reveal_array[l].line.opacity = 0;
								reveal_array[l].text_container.opacity = 0;
										
							}
							
						}
						
						
					};
				}
				
				if ( i == 2 ) {
					var diagram = Ti.UI.createView({
						bottom: 35,
						width: 600, height: 275,
						backgroundImage: 'includes/images/intro/history/diagram_three.png'
					});
					temp_view.add( diagram );
					var button = Ti.UI.createLabel({
						bottom: 20,
						width: 215, height: 48,				
						text: 'View Full Screen',
						font: { fontSize: 14, fontFamily: settings.get_font( 'GR-Bold' ) },
						backgroundColor: '#69c083',
						borderColor: '#76cc90',
						borderWidth: 6,
						color:  settings.get_color( 'white' ), textAlign: 'center',
						data: temp_array[i]
					});
					temp_view.add( button );
					button.addEventListener( 'click', function() {
						launch_overlay( { title: button.data.pop_up_title, sub_title: button.data.pop_up_sub_title, image: 'includes/images/intro/history/diagram_three_full.png' } );					

					});
				}	
				
				if ( i == 3 ) {
/*					var diagram = Ti.UI.createView({
						bottom: 35,
						width: 597, height: 240,
						backgroundImage: 'includes/images/intro/history/diagram_four.png'
					});
					temp_view.add( diagram );
*/
					var diagram_left = Ti.UI.createView({
						left: 0, bottom: 35,
						width: 597, height: 240,
						backgroundImage: 'includes/images/intro/history/history_diagram_left.png'
					});
					temp_view.add( diagram_left );
					
					var diagram_right = Ti.UI.createView({
						left: 150, bottom: 35,
						width: 597, height: 240,
						backgroundImage: 'includes/images/intro/history/history_diagram_right.png'
					});
					temp_view.add( diagram_right );

					
					
				}
									
				slide_array.push( temp_view );
			}
						
			var scrollable_view = Ti.UI.createScrollableView({
				top:0,
				width: 750, height: 370,
				views: slide_array,
				backgroundColor: settings.get_color( 'white' ),
				diagram_left: diagram_left,
				diagram_right: diagram_right
			});
			main_container.content_container.add( scrollable_view );
			
			scrollable_view.addEventListener( 'scrollEnd', scroll_end_function );
					
			var left_arrow = Ti.UI.createView({
				left: 62, top: 160,
				width: 63, height: 48,
				direction: -1, opacity: 0,
				backgroundImage: 'includes/images/intro/left_arrow.png'
			});
			main_container.content_container.add( left_arrow );
			left_arrow.addEventListener( 'click', arrow_clicked );
					
			var right_arrow = Ti.UI.createView({
				right: 62, top: 160,
				width: 63, height: 48,
				direction: 1,
				backgroundImage: 'includes/images/intro/right_arrow.png'
			});
			main_container.content_container.add( right_arrow );
			right_arrow.addEventListener( 'click', arrow_clicked );
			
			var dot_indicator = dot_indicator_class( temp_array.length );
				dot_indicator.bottom = 20;
			main_container.content_container.add( dot_indicator );
				
			function arrow_clicked ( e ) {
				
				var object = e.source;
				
				if ( scrollable_view.currentPage+object.direction >= 0 && scrollable_view.currentPage+object.direction < scrollable_view.views.length ) { 
					scrollable_view.scrollToView( scrollable_view.currentPage+object.direction );				
					
				}
				
			}
			
			function scroll_end_function ( e ) {
				
				var object = e.source;
				
				if ( scrollable_view.currentPage == 0 ) { 
					left_arrow.opacity = 0;				
				} else if ( scrollable_view.currentPage == scrollable_view.views.length-1 ) { 
					right_arrow.opacity = 0;	
				} else {
					left_arrow.opacity = 1;
					right_arrow.opacity = 1;
				} 
				
				if ( scrollable_view.currentPage == 3 && scrollable_view.previousPage != scrollable_view.currentPage) {
					
					scrollable_view.diagram_left.animate( { left: 75, duration: 500 } );
					scrollable_view.diagram_right.animate( { left: 75, duration: 500 } );
						
				} else if ( scrollable_view.currentPage == 2 && scrollable_view.previousPage == 3 ) {
					
					scrollable_view.diagram_left.left = 0;
					scrollable_view.diagram_right.left = 150;				
					
				}
				
				scrollable_view.previousPage = scrollable_view.currentPage;
				
				dot_indicator.update_position( scrollable_view.currentPage );
				
			}
					
	}
	
	function create_content_two(){
		
		var intro_basaglar_class = require('ui/intro_basaglar');
		main_container.content_container = new intro_basaglar_class();
		main_container.add( main_container.content_container );
		
	}
	
	function create_content_three(){
		
		main_container.content_container = Ti.UI.createView({
			opacity: 0,
			left:0, top:85,
			width: "100%", height: 430
		});
		main_container.add( main_container.content_container );
			
			var white_bg = Ti.UI.createView({
				top:0,
				width: 750, height: 370,
				backgroundColor: settings.get_color( 'white' )
			});
			main_container.content_container.add( white_bg );
			
				var temp_view_label = Ti.UI.createLabel({
					left:0, top:0, width: '100%', height: 80,					
					color:  settings.get_color( 'brown' ),
					text: json_data.intro.content_three.main_title,
					font: { fontSize: 18, fontFamily: settings.get_font( 'GR-Medium' ) },
					textAlign: 'center'
				});
				white_bg.add( temp_view_label );
				
				var diagram = Ti.UI.createView({
					top: 80,
					width: 323, height: 176,
					backgroundImage: 'includes/images/intro/basaglar_sequence/diagram.png'
				});
				white_bg.add( diagram );
				
				var button = Ti.UI.createLabel({
					bottom: 32,
					width: 215, height: 48,				
					text: 'View Full Screen',
					font: { fontSize: 14, fontFamily: settings.get_font( 'GR-Bold' ) },
					backgroundColor: '#69c083',
					borderColor: '#76cc90', borderWidth: 6,
					color:  settings.get_color( 'white' ), textAlign: 'center'
				});
				white_bg.add( button );
				button.addEventListener( 'click', function() {
					launch_overlay( { title: 'Basaglar™ Sequence', sub_title: json_data.intro.content_three.pop_up_sub_title, image: 'includes/images/intro/basaglar_sequence/diagram_full.png' } );
				});
							
	};
	
	
	
	
	function create_content_four(){
		
		main_container.content_container = Ti.UI.createScrollView({
			opacity: 0,
			left:70, top:70,
			layout: 'horizontal',
			width: "100%", height: 430,
			contentWidth: "100%", contentHeight: 430
		});
		main_container.add( main_container.content_container );
		
			var temp_array = json_data.intro.content_two.views;
			
			for ( var i=0; i<temp_array.length; i++ ) {
					
				var container_one = Ti.UI.createView({
					left: 15, top: 15,
	  				width: 176, height: 176,
	  				backgroundColor: settings.get_color( 'white' )		
				});
				main_container.content_container.add( container_one );
					
					var string_to_change = "1c";
					if ( json_data.intro.content_two.views[i].text.indexOf( string_to_change ) > -1 ) {
						var attr = Ti.UI.createAttributedString({
						    text: json_data.intro.content_two.views[i].text,
						    attributes: [
						        {
						            type: Ti.UI.ATTRIBUTE_FONT,
						            value: { fontSize: 8, fontFamily: settings.get_font( 'G-Book' ) },
						            range: [ json_data.intro.content_two.views[i].text.indexOf( string_to_change ), ( string_to_change ).length]
						        }
						   ]
						});
									
						var label = Ti.UI.createLabel({
							top:15, 
							width: '85%',				
							color:  settings.get_color( 'brown' ),
							attributedString: attr,		
							font: { fontSize: 12, fontFamily: settings.get_font( 'G-Book' ) },
							textAlign: 'left'
						});
						container_one.add( label );
							
					} else {
						
						var label = Ti.UI.createLabel({
							top:15, 
							width: '85%',				
							color:  settings.get_color( 'brown' ),
							text: json_data.intro.content_two.views[i].text,
							font: { fontSize: 12, fontFamily: settings.get_font( 'G-Book' ) },
							textAlign: 'left'
						});
						container_one.add( label );
					
					}
					
					var button_container = Ti.UI.createView({
						left: 0, bottom: 0,
						width: '100%', height: 48,
						backgroundColor: '#69c083',
						borderColor: '#76cc90',
						borderWidth: 6
					});
					container_one.add( button_container );
						
						var button_text = lvc_ui.create_label();
							button_text.text = "View graph";
							button_text.right = 0;
							button_text.width = "85%";
							button_text.font = { 
												fontSize: 14,
												fontFamily: settings.get_font( 'GR-Bold' )
											};
							button_text.color = '#FFFFFF';
						button_container.add( button_text );
						
						var button_icon = Ti.UI.createView({
							left: 38,
							width:12, height: 20,
							backgroundImage: 'includes/images/graph_icon.png'
						});
						button_container.add( button_icon );	
						
						var button_hit_area = lvc_ui.create_hit_area();
						button_hit_area.data = json_data.intro.content_two.views[i];
						button_container.add( button_hit_area );
						button_hit_area.addEventListener( 'click', view_graph_button_clicked );
								
				}
		
		function view_graph_button_clicked (e) {
			
			var obj = e.source;
			
			// LAYERS
			var clinical_efficacy_overlay_class = require('ui/clinical_efficacy_overlay');
			var clinical_efficacy_overlay = new clinical_efficacy_overlay_class( obj.data );
			layers.add_layer_function( clinical_efficacy_overlay );
			
			//print( obj.data );
			
		};
			
	};		
				
	function create_content_five(){
		
		main_container.content_container = Ti.UI.createView({
			opacity: 0,
			left:0, top:85,
			width: "100%", height: 430
		});
		main_container.add( main_container.content_container );
			
			var white_bg = Ti.UI.createView({
				top:0,
				width: 750, height: 370,
				backgroundColor: settings.get_color( 'white' )
			});
			main_container.content_container.add( white_bg );
			
				var device_image = Ti.UI.createView({
					left: 260,
					width: 449, height: 257,
					backgroundImage: 'includes/images/intro/devices.png'
				});
				white_bg.add( device_image );
				
				var sub_text = Ti.UI.createLabel({
					left: 50,
					width: 190,	height: '100%',			
					color:  settings.get_color( 'brown' ),
					text: json_data.intro.content_five.sub_text,
					font: { fontSize: 17, fontFamily: settings.get_font( 'GR-Bold' ) },
					textAlign: 'left'
				});
				white_bg.add( sub_text );			
		
	};
	
	function create_content_six(){
		
		main_container.content_container = Ti.UI.createView({
			opacity: 0,
			left:0, top:85,
			width: "100%", height: 430
		});
		main_container.add( main_container.content_container );
			
			var white_bg = Ti.UI.createView({
				top:0,
				width: 750, height: 370,
				backgroundColor: settings.get_color( 'white' )
			});
			
			var white_bg_two = Ti.UI.createView({
				top:0,
				width: 750, height: 370,
				backgroundColor: settings.get_color( 'white' )
			});
				
				var sub_title_label = Ti.UI.createLabel({
					top:25, 
					width: '100%', height: 20,			
					color:  settings.get_color( 'brown' ),
					text: json_data.intro.content_six.sub_title,
					font: { fontSize: 18, fontFamily: settings.get_font( 'GR-Medium' ) },
					textAlign: 'center'
				});
				white_bg.add( sub_title_label );
				
				var pink_text_label = Ti.UI.createLabel({
					left: 65, top: 72, 
					width: 440, height: 30,			
					color:  settings.get_color( 'pink' ),
					text: json_data.intro.content_six.pink_text,
					font: { fontSize: 13, fontFamily: settings.get_font( 'GR-Bold' ) },
					textAlign: 'left'
				});
				white_bg.add( pink_text_label );
				
				var green_text_label = Ti.UI.createLabel({
					left: 395, top: 72, 
					width: 440, height: 30,			
					color:  settings.get_color( 'lime_green' ),
					text: json_data.intro.content_six.green_text,
					font: { fontSize: 13, fontFamily: settings.get_font( 'GR-Bold' ) },
					textAlign: 'left'
				});
				white_bg.add( green_text_label );
				
				
				var temp_array = json_data.intro.content_six.rows;
				
				for ( var i=0; i<temp_array.length; i++ ) {
										
					var pink_bar_label = Ti.UI.createLabel({
						left: 65, top: 108+(i*28), 
						width: 290,	height: 23,			
						color:  settings.get_color( 'white' ),
						backgroundColor:  settings.get_color( 'pink' ),
						text: temp_array[i].pink_text,
						font: { fontSize: 10, fontFamily: settings.get_font( 'G-Book' ) },
						textAlign: 'center'
					});
					white_bg.add( pink_bar_label );
					
					var brown_arrow = Ti.UI.createView({
						top: 110+(i*28),
						width: 12, height: 21,
						backgroundImage: 'includes/images/intro/brown_arrow.png'
					});
					white_bg.add( brown_arrow );
					
					if ( i == 5 ) {
						
						var attr = Ti.UI.createAttributedString({
						    text: temp_array[i].green_text,
						    attributes: [
						        {
						            type: Ti.UI.ATTRIBUTE_FONT,
						            value: { fontSize: 10, fontFamily: settings.get_font( 'G-BookItalic' ) },
						            range: [ temp_array[i].green_text.indexOf('Ease-In'), ('Ease-In').length]
						        }
						   ]
						});
						
					}
					
					var green_bar_label = Ti.UI.createLabel({
						right: 65, top: 108+(i*28),  
						width: 290,	height: 23,			
						color:  settings.get_color( 'white' ),
						backgroundColor:  settings.get_color( 'lime_green' ),
						text: temp_array[i].green_text,
						font: { fontSize: 10, fontFamily: settings.get_font( 'G-Book' ) },
						textAlign: 'center'
					});
					white_bg.add( green_bar_label );				
					
					if ( i == 5 ) {
						green_bar_label.text = "";
						green_bar_label.text = "";
						green_bar_label.attributedString = attr;
					}
																
				}
				
				var slide_two_sub_title_label = Ti.UI.createLabel({
					top:25, 
					width: '100%', height: Ti.UI.SIZE,			
					color:  settings.get_color( 'brown' ),
					text: json_data.intro.content_six.slide_two_title,
					font: { fontSize: 18, fontFamily: settings.get_font( 'GR-Medium' ) },
					textAlign: 'center'
				});
				white_bg_two.add( slide_two_sub_title_label );
				
					var people_image = Ti.UI.createView({
						top: 60,
						width: 634, height: 265,
						backgroundImage: 'includes/images/intro/people.png'
					});
					white_bg_two.add( people_image );
				
				var slide_array = [ white_bg_two, white_bg ];
				
				var scrollable_view = Ti.UI.createScrollableView({
					top:0,
					width: 750, height: 370,
					views: slide_array,
					backgroundColor: settings.get_color( 'white' )
				});
				main_container.content_container.add( scrollable_view );
				
				scrollable_view.addEventListener( 'scrollEnd', scroll_end_function );
						
				var left_arrow = Ti.UI.createView({
					left: 62, top: 160,
					width: 63, height: 48,
					direction: -1, opacity: 0,
					backgroundImage: 'includes/images/intro/left_arrow.png'
				});
				main_container.content_container.add( left_arrow );
				left_arrow.addEventListener( 'click', arrow_clicked );
						
				var right_arrow = Ti.UI.createView({
					right: 62, top: 160,
					width: 63, height: 48,
					direction: 1,
					backgroundImage: 'includes/images/intro/right_arrow.png'
				});
				main_container.content_container.add( right_arrow );
				right_arrow.addEventListener( 'click', arrow_clicked );
				
				var dot_indicator = dot_indicator_class( slide_array.length );
					dot_indicator.bottom = 20;
				main_container.content_container.add( dot_indicator );
					
				function arrow_clicked ( e ) {
					
					var object = e.source;
					
					if ( scrollable_view.currentPage+object.direction >= 0 && scrollable_view.currentPage+object.direction < scrollable_view.views.length ) { 
						scrollable_view.scrollToView( scrollable_view.currentPage+object.direction );				
						
					}
					
				}
				
				function scroll_end_function ( e ) {
					
					var object = e.source;
					
					if ( scrollable_view.currentPage == 0 ) { 
						left_arrow.opacity = 0;
						right_arrow.opacity = 1;				
					} else if ( scrollable_view.currentPage == 1 ) { 
						left_arrow.opacity = 1;
						right_arrow.opacity = 0;	
					} 
					
					dot_indicator.update_position( scrollable_view.currentPage );
					
				}
					
				
				var model_button = Ti.UI.createView({
					bottom: 85,
					width: 245, height: 48,
					backgroundColor: '#63b67c',
					borderColor: '#69c083', 
					borderWidth: 6,
				});
				main_container.content_container.add( model_button );
				
					var model_text = lvc_ui.create_label();
						model_text.text = json_data.intro.content_five.proceed_text;
						model_text.font = { 
											fontSize: 14,
											fontFamily: settings.get_font( 'GR-Medium' )
										};
						model_text.color = '#FFFFFF';
					model_button.add( model_text );
						
					var proceed_hit_area = lvc_ui.create_hit_area();
					model_button.add( proceed_hit_area );
					proceed_hit_area.addEventListener( 'click', proceed_function );
				
			
			
			
				
	};	
	

	
	function tab_button_clicked ( e ) {
		
		var object = e.source;
		object.color = settings.get_color( 'brown' );
		object.backgroundColor = settings.get_color( 'light_grey' );
		object.borderColor = settings.get_color( 'light_grey' );
		
		main_header_title.text = object.text.replace('\n','').toUpperCase();
		
		if ( typeof main_container.content_container != undefined && main_container.content_container != null ) {
			main_container.remove( main_container.content_container );
			main_container.content_container = null;
		}
		
		if ( object.id == 0 ) create_content_one();
		if ( object.id == 1 ) create_content_two();
		if ( object.id == 2 ) create_content_three();
		if ( object.id == 3 ) create_content_four();
		if ( object.id == 4 ) create_content_five();
		if ( object.id == 5 ) create_content_six();
		
		main_container.content_container.animate( { opacity:1, duration: 1000 } );
		
		if ( previous_tab != null && previous_tab != object ) {
			previous_tab.color = settings.get_color( 'white' );
			previous_tab.backgroundColor = settings.get_color( 'bg_green' );		
			previous_tab.borderColor = settings.get_color( 'border_green' );		
		}
		
		previous_tab = object;
	
	}
	
	function launch_overlay ( data ) {
			
		// LAYERS
		var generic_overlay_class = require('ui/generic_overlay');
		var generic_overlay_class = new generic_overlay_class( data );
		layers.add_layer_function( generic_overlay_class );
		
		//print( obj.data );
		
	};
	
	function biosimilar_clicked () {
		
		screen_controller.change_screen_function( 'Biosimilars' );	
	
	};
	
	function heritage_clicked () {
		
		screen_controller.change_screen_function( 'Heritage' );	
	
	};
	
	function proceed_function() {
		
		screen_controller.switch_screen_state_function( 'Model' );
		
	}				


////////////////////////////////////////////////////
//RUN FUNCTIONS
////////////////////////////////////////////////////


	
	return self;
	
}

module.exports = this_class;