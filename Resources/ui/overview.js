function this_class(  ) {



////////////////////////////////////////////////////
//VARS
////////////////////////////////////////////////////
	
	var self = Ti.UI.createWindow( { width: 1024, height:768, zIndex:0, fullscreen:true, navBarHidden:true, backgroundColor: settings.get_color( 'brown' ), window_id:"Overview" } );
	
	var previous_tab = null;
	
	var overview_copy = "Biosimilars are therapeutic protein molecules with an identical amino acid sequence to that of a previously marketed product, with no clinically meaningful difference in efficacy or safety profile¹⋅²\n\nBiosimilars are not generics; they are similar but not the same as reference products³\n\nBiosimilars provide valuable options that create choice for prescribers and patients⁴\n\nThe quality of biosimilar manufacturing matters⁵⋅⁶";
	var overview_refs = "1. FDA. Guidance for Industry. April 2015;\n2. EMA Guideline on similar biological medicinal products containing biotechnology-derived \nproteins as active substance: quality issues (revision 1). May 24, 2012;\n3. Declerck. GaBI J 2012;1(1):13–6;\n4. Wilkins et al. J Diabetes Sci Technol 2014;8(1):23–5;\n5. Sharma. Biotechnol Adv 2007;25(3):325–31; \n6. Schellekens. Nat Rev Drug Discov 2002;1(6):457–62";


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
						text: json_data.overview.title,
						color: settings.get_color( 'brown' )					
					});
					header_banner_container.add( header_label );
				
				var main_tab_container_one = Ti.UI.createView({
					left: 0, top: 0,
					width: 1024, height: 768
				});
				
				var main_tab_container_two = Ti.UI.createView({
					left: 0, top: 0,
					width: 1024, height: 768
				});
			
			var main_tab_container = Ti.UI.createScrollableView({
				left: 0, top: 0,
				width: 1024, height: 768,
				views: [ main_tab_container_one, main_tab_container_two ]
			});
			self.container.add( main_tab_container );
			
			
			
			main_tab_container.addEventListener( 'scrollEnd', scroll_end );
			
			var dot_indicator = dot_indicator_class( 2 );
				dot_indicator.bottom = 35;
			self.container.add( dot_indicator );
					
			var left_arrow = Ti.UI.createView({
				left: 15, top: 408,
				width: 12, height: 24,
				direction: -1, opacity: 0,
				backgroundImage: 'includes/images/overview_arrow_left.png'
			});
			self.container.add( left_arrow );
			left_arrow.addEventListener( 'click', arrow_clicked );
					
			var right_arrow = Ti.UI.createView({
				right: 15, top: 408,
				width: 12, height: 24,
				direction: 1,
				backgroundImage: 'includes/images/overview_arrow_right.png'
			});
			self.container.add( right_arrow );
			right_arrow.addEventListener( 'click', arrow_clicked );
				
			//TOP BAR
			
			var top_bar = lvc_ui.create_top_bar();
			self.container.add( top_bar );
			
				
		//MAIN
				
				var v_proceed_button = Ti.UI.createLabel({
					left: 706, 
					//left: 300, 
					top:77,
					width: 260, height: 48,				
					text: json_data.overview.proceed_text,
					font: { fontSize: 14, fontFamily: settings.get_font( 'GR-Medium' ) },
					backgroundColor: '#63b67c',
					borderColor: '#69c083', 
					borderWidth: 6,
					color:  settings.get_color( 'white' ),
					textAlign: 'center'
				});
				self.container.add( v_proceed_button );
				v_proceed_button.addEventListener( 'click', proceed_function );
				
				var box_1 = Ti.UI.createView({
					left:55, top: 147,
					width: 446, height: 265,
					borderRadius: 5,					
					backgroundColor:  settings.get_color( 'pink' )
				});
				main_tab_container_one.add( box_1 );		
					
					var box_1_image = Ti.UI.createView({
						top: 0,
						width: 446, height: 265,			
						backgroundImage:  'includes/images/overview/top_left.png'
					});
					box_1.add( box_1_image );	
					
					var box_1_label = Ti.UI.createLabel({
						left:0, bottom:0,
						width: "100%", height: 75,						
						color:  settings.get_color( 'white' ),
						text: json_data.overview.top_left,
						font: { fontSize: 15, fontFamily: settings.get_font( 'G-Book' ) },
						textAlign: 'center'
					});
					box_1.add( box_1_label );
					
					
				var box_2 = Ti.UI.createView({
					left: 520, top: 147,
					width: 446, height: 265,
					borderRadius: 5,					
					backgroundColor:  settings.get_color( 'light_blue' )
				});
				main_tab_container_one.add( box_2 );		
					
					var box_2_image = Ti.UI.createView({
						top: 0,
						width: 446, height: 265,			
						backgroundImage:  'includes/images/overview/top_right.png'
					});
					box_2.add( box_2_image );
					
					var box_2_label = Ti.UI.createLabel({
						left:0, bottom:0,
						width: "100%", height: 75,						
						color:  settings.get_color( 'white' ),
						text: json_data.overview.top_right,
						font: { fontSize: 15, fontFamily: settings.get_font( 'G-Book' ) },
						textAlign: 'center'
					});
					box_2.add( box_2_label );
				
				var box_3 = Ti.UI.createView({
					left:55, top: 430,
					width: 446, height: 265,
					borderRadius: 5,					
					backgroundColor:  settings.get_color( 'dark_orange' )
				});
				main_tab_container_one.add( box_3 );		
					
					var box_3_image = Ti.UI.createView({
						top: 18,
						width: 300, height: 175,				
						backgroundImage:  'includes/images/overview/devices.png'
					});
					box_3.add( box_3_image );	
					
					var box_3_label = Ti.UI.createLabel({
						left:0, bottom:0,
						width: "100%", height: 75,						
						color:  settings.get_color( 'white' ),
						text: json_data.overview.bottom_left,
						font: { fontSize: 15, fontFamily: settings.get_font( 'G-Book' ) },
						textAlign: 'center'
					});
					box_3.add( box_3_label );
				
				var box_4 = Ti.UI.createView({
					left:520, top: 430,
					width: 446, height: 265,
					borderRadius: 5,					
					backgroundColor:  settings.get_color( 'lime_green' )
				});
				main_tab_container_one.add( box_4 );		
					
					var box_4_image = Ti.UI.createView({
						top: 18,
						width: 300, height: 175,				
						backgroundImage:  'includes/images/overview/people.png'
					});
					box_4.add( box_4_image );
					
					var box_4_label = Ti.UI.createLabel({
						left:0, bottom:0,
						width: "100%", height: 75,						
						color:  settings.get_color( 'white' ),
						text: json_data.overview.bottom_right,
						font: { fontSize: 15, fontFamily: settings.get_font( 'G-Book' ) },
						textAlign: 'center'
					});
					box_4.add( box_4_label );		

///////-------------------------------

				var label_one = Ti.UI.createLabel({
					top: 230, 
					width: 650,				
					color:  settings.get_color( 'brown' ),
					text: overview_copy,
					font: { fontSize: 24, fontFamily: settings.get_font( 'G-Book' ) },
					textAlign: 'left'
				});
				main_tab_container_two.add( label_one );
				
					var arrow_1 = Ti.UI.createView({
						left: 162, top: 230, width: 17, height: 27, backgroundImage: 'includes/images/bio/pink_arrow.png'
					});
					main_tab_container_two.add( arrow_1 );
					
					var arrow_2 = Ti.UI.createView({
						left: 162, top: 348, width: 17, height: 27, backgroundImage: 'includes/images/bio/pink_arrow.png'
					});
					main_tab_container_two.add( arrow_2 );
					
					var arrow_3 = Ti.UI.createView({
						left: 162, top: 420, width: 17, height: 27, backgroundImage: 'includes/images/bio/pink_arrow.png'
					});
					main_tab_container_two.add( arrow_3 );
					
					var arrow_4 = Ti.UI.createView({
						left: 162, top: 492, width: 17, height: 27, backgroundImage: 'includes/images/bio/pink_arrow.png'
					});
					main_tab_container_two.add( arrow_4 );
				
				var label_refs = Ti.UI.createLabel({
					bottom: 95, 
					width: 650,				
					color:  settings.get_color( 'brown' ),
					text: overview_refs,
					font: { fontSize: 12, fontFamily: settings.get_font( 'G-Book' ) },
					textAlign: 'center'
				});
				main_tab_container_two.add( label_refs );			
			
			
			
////////////////////////////////////////////////////
//FUNCTIONS
////////////////////////////////////////////////////
	
	function scroll_end () {
		
		
		if ( main_tab_container.currentPage == 0 ) {
			right_arrow.opacity = 1;
			left_arrow.opacity = 0;
		} else {
			right_arrow.opacity = 0;
			left_arrow.opacity = 1;
		}
		dot_indicator.update_position( main_tab_container.currentPage );
	
	};
	
	function arrow_clicked ( e ) {
				
		var object = e.source;
		
		if ( main_tab_container.currentPage+object.direction >= 0 && main_tab_container.currentPage+object.direction < main_tab_container.views.length ) { 
			main_tab_container.scrollToView( main_tab_container.currentPage+object.direction );				
			
		}
		
	};
	
	function proceed_function() {
		
		print( 'clicked' );
		screen_controller.switch_screen_state_function( 'Introduction' );
		
	}

////////////////////////////////////////////////////
//RUN FUNCTIONS
////////////////////////////////////////////////////


	
	return self;
	
}

module.exports = this_class;