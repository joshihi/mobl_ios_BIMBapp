function this_class(  ) {



////////////////////////////////////////////////////
//VARS
////////////////////////////////////////////////////
	
	var self = Ti.UI.createWindow( { width: 1024, height:768, zIndex:0, fullscreen:true, navBarHidden:true, backgroundColor: settings.get_color( 'white' ), window_id:"Biosimilars" } );
	
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
					
			var pi_button = Ti.UI.createView({
				left: device_width-128, bottom: 0,
				width: 128, height: 48,
				backgroundColor: settings.get_color( 'light_green' )
			});
			self.container.add( pi_button );
			
				var pi_text = lvc_ui.create_label();
					pi_text.text = json_data.bio.prescribing_text;
					pi_text.font = { 
										fontSize: 14,
										fontFamily: settings.get_font( 'GR-Bold' )
									};
					pi_text.color = '#FFFFFF';
				pi_button.add( pi_text );
					
				var pi_hit_area = lvc_ui.create_hit_area();
				pi_button.add( pi_hit_area );
				//pi_hit_area.addEventListener( 'click', do_shit );
			
		//MAIN
		
			var main_tab_container = Ti.UI.createView({
				top: 70,
				width: 912, height: 44
			});
			self.container.add( main_tab_container );
					
				var tab_one = Ti.UI.createLabel({
					left:0, top:0,
					width: 456, height: 48,
					borderRadius: 5,					
					backgroundColor:  settings.get_color( 'light_grey' ),
					color:  settings.get_color( 'brown' ),
					text: json_data.bio.tab_one,
					font: { fontSize: 14, fontFamily: settings.get_font( 'GR-Bold' ) },
					textAlign: 'center',
					id: 0
				});
				main_tab_container.add( tab_one );		
				tab_one.addEventListener( 'click', tab_button_clicked );
				
				var tab_two = Ti.UI.createLabel({
					right:0, top:0,
					width: 456, height: 48,
					borderRadius: 5,						
					backgroundColor:  settings.get_color( 'light_grey' ),
					color:  settings.get_color( 'brown' ),
					text: json_data.bio.tab_two,
					font: { fontSize: 14, fontFamily: settings.get_font( 'GR-Bold' ) },
					textAlign: 'center',
					id: 1
				});
				main_tab_container.add( tab_two );
				tab_two.addEventListener( 'click', tab_button_clicked );				
			
		var main_container = Ti.UI.createView({		
			left:56, top: 114,
			width: 912, height: 580,
			backgroundColor: settings.get_color( 'brown' )
		});
		self.container.add( main_container );
			
			var main_header_title = Ti.UI.createLabel({
				left:0, top:32,
				width: "100%", height: 35,				
				color:  settings.get_color( 'white' ),
				text: json_data.bio.tab_one,
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
			top: 85,
			width: 750, height: 430,
			backgroundColor: settings.get_color( 'white' ) 
		});
		main_container.add( main_container.content_container );
			
			var text = Ti.UI.createLabel({
				left: 115, top:0,
				width: 550, height: '100%',
				color:  settings.get_color( 'brown' ),
				text: json_data.bio.tab_one_para,
				font: { fontSize: 17, fontFamily: settings.get_font( 'G-Book' ) },
				textAlign: 'left'
			});
			main_container.content_container.add( text );
			
			var arrow_1 = Ti.UI.createView({
				left: 62, top: 75,
				width: 17, height: 27, backgroundImage: 'includes/images/bio/pink_arrow.png'
			});
			main_container.content_container.add( arrow_1 );
			
			var arrow_2 = Ti.UI.createView({
				left: 62, top: 158,
				width: 17, height: 27, backgroundImage: 'includes/images/bio/pink_arrow.png'
			});
			main_container.content_container.add( arrow_2 );
			
			var arrow_3 = Ti.UI.createView({
				left: 62, top: 225,
				width: 17, height: 27, backgroundImage: 'includes/images/bio/pink_arrow.png'
			});
			main_container.content_container.add( arrow_3 );
			
			var arrow_4 = Ti.UI.createView({
				left: 62, top: 294,
				width: 17, height: 27, backgroundImage: 'includes/images/bio/pink_arrow.png'
			});
			main_container.content_container.add( arrow_4 );
			
			
	};

	function create_content_two () {
		
		main_container.content_container = Ti.UI.createView({
			opacity: 0,
			top: 85,
			width: 750, height: 430,
			backgroundColor: settings.get_color( 'white' ) 
		});
		main_container.add( main_container.content_container );
			
			var text = Ti.UI.createLabel({
				left: 115, top:0,
				width: 550, height: '100%',
				color:  settings.get_color( 'brown' ),
				text: json_data.bio.tab_two_para,
				font: { fontSize: 17, fontFamily: settings.get_font( 'G-Book' ) },
				textAlign: 'left'
			});
			main_container.content_container.add( text );
			
			var arrow_1 = Ti.UI.createView({
				left: 62, top: 125,
				width: 17, height: 27, backgroundImage: 'includes/images/bio/pink_arrow.png'
			});
			main_container.content_container.add( arrow_1 );
			
			var arrow_2 = Ti.UI.createView({
				left: 62, top: 177,
				width: 17, height: 27, backgroundImage: 'includes/images/bio/pink_arrow.png'
			});
			main_container.content_container.add( arrow_2 );
			
			var arrow_3 = Ti.UI.createView({
				left: 62, top: 226,
				width: 17, height: 27, backgroundImage: 'includes/images/bio/pink_arrow.png'
			});
			main_container.content_container.add( arrow_3 );
			
			var arrow_4 = Ti.UI.createView({
				left: 62, top: 260,
				width: 17, height: 27, backgroundImage: 'includes/images/bio/pink_arrow.png'
			});
			main_container.content_container.add( arrow_4 );
			
	};

	
	function tab_button_clicked ( e ) {
		
		var object = e.source;
		object.color = settings.get_color( 'white' );
		object.backgroundColor = settings.get_color( 'brown' );
		
		main_header_title.text = object.text.replace('\n','');;
		
		if ( typeof main_container.content_container != undefined && main_container.content_container != null ) {
			main_container.remove( main_container.content_container );
			main_container.content_container = null;
		}
		
		if ( object.id == 0 ) create_content_one();
		if ( object.id == 1 ) create_content_two();
			
		main_container.content_container.animate( { opacity:1, duration: 1000 } );
		
		if ( previous_tab != null && previous_tab != object ) {
			previous_tab.color = settings.get_color( 'brown' );
			previous_tab.backgroundColor = settings.get_color( 'light_grey' );		
		}
		
		previous_tab = object;
		
	};

////////////////////////////////////////////////////
//RUN FUNCTIONS
////////////////////////////////////////////////////


	
	return self;
	
}

module.exports = this_class;