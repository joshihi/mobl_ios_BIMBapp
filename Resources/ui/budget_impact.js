function this_class(  ) {



////////////////////////////////////////////////////
//VARS
////////////////////////////////////////////////////
	
	var display_table = require( 'ui/data_inputs/display_table' );
	var human_market_share_class = require( 'ui/data_inputs/human_market_share' );
	
	var left_panel;
	var right_panel;
	var type_array = new Array();
	
	var discount_slider_class = require('ui/data_inputs/discount_slider');

	print( '????????????????????????????????????????????????????????????????' );
	print( '????????????????????????????????????????????????????????????????' );
	print( '????????????????????????????????????????????????????????????????' );
	print( '????????????????????????????????????????????????????????????????' );
	print( '????????????????????????????????????????????????????????????????' );
		
	var self = Ti.UI.createWindow( { width: 1024, height:768, zIndex:0, fullscreen:true, navBarHidden:true, backgroundColor: settings.get_color( 'white' ), window_id:"Budget Impact" } );
	
	engine.re_calculate();	
	
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
				arrows_and_dots_container.addEventListener( 'click', function() {
					
					engine.re_calculate();					
					engine.print_everything();
					
				});
					var header_label = Ti.UI.createLabel({						
						left:195, top:16,
						width:400, height:50,
						font: { fontSize: 30, fontFamily: settings.get_font( 'GR-Bold' ) },
						text: 'BUDGET IMPACT',
						color: settings.get_color( 'brown' )					
					});
					header_banner_container.add( header_label );
					
			var type_nav_container = new results_type_selector_class( diabetes_type_changed );
			self.container.add(	type_nav_container );
		
		//MAIN
		
		var main_container = Ti.UI.createView({
			top:130,
			width: 926, height: 590,
			backgroundColor: '#eeeeee'
		});
		self.container.add( main_container );
			
			create_content();	
		
			var buttons_container = Ti.UI.createView({
				top:114, left: 766,
				width: 122, height: Ti.UI.SIZE,
				layout: 'vertical',
				zIndex: 1000
			});
			main_container.add( buttons_container );
				
				var detail_button = create_pu_button( 'Detailed \nResults', 'includes/images/results/icon_details.png' );
					detail_button.top = 0;
					detail_button.hit_area.pop_up = 'detailed_results';
					detail_button.hit_area.addEventListener( 'click', show_pop_up );			
				buttons_container.add( detail_button );
				
				var drug_p_button = create_pu_button( 'Drug Price \nScenario', 'includes/images/results/icon_drugs.png' );
					drug_p_button.top = 5;
					drug_p_button.hit_area.pop_up = 'detailed_results';
					drug_p_button.hit_area.args = 'dps';
					drug_p_button.hit_area.addEventListener( 'click', show_pop_up );							
				buttons_container.add( drug_p_button );
				
				var savings_button = create_pu_button( 'Savings \nGraph', 'includes/images/results/icon_saving.png' );
					savings_button.top = 5;
					savings_button.hit_area.pop_up = 'overlay_savings_graph';
					savings_button.hit_area.addEventListener( 'click', show_pop_up );
				buttons_container.add( savings_button );			
				
				var tornando_button = create_pu_button( 'Sensitivity \nAnalysis', 'includes/images/results/icon_tornando.png' );
					tornando_button.top = 5;
					tornando_button.hit_area.pop_up = 'tornado';					
					tornando_button.addEventListener( 'click', show_pop_up );	
				buttons_container.add( tornando_button );
				
			var report_button = button_class.create_proceed( '  REPORT', 'includes/images/report_icon.png' );
				report_button.bottom = 20;
				report_button.backgroundColor = '#69c083';
				report_button.borderColor = '#63b67c';
			self.add( report_button );
			report_button.addEventListener( 'click', report_function );
	
	function create_content() {
		
		self.content_container = Ti.UI.createView({
			top:0,
			width: 926, height: 590
		});
		main_container.add( self.content_container );
					
			var statement_container = Ti.UI.createView({
				top:0,
				width: '100%', height: Ti.UI.SIZE,
				layout: 'vertical'
			});
			self.content_container.add( statement_container );
					
				var statement_one = add_top_statement_one();
				statement_container.add( statement_one );
	/*			
				var statement_two = add_top_statement_two();
				statement_container.add( statement_two );
/*				
				var statement_three = add_top_statement_three();
				statement_container.add( statement_three );
					
				var statement_four = add_top_statement_four();
				statement_container.add( statement_four );
*/			
				add_top_statement_two();
				add_top_statement_three();
				add_top_statement_four();
					
			var market_share_container = Ti.UI.createView({
				top: 314, left: 15,
				width: Ti.UI.SIZE, height: Ti.UI.SIZE
			});
			self.content_container.add( market_share_container );
			
				var human_market_share_view = new human_market_share_class();
				market_share_container.add( human_market_share_view );
				
		
	};
			
			
	function add_top_statement_one() {
				
		var type = 'T1DM';
		if ( data_store.diabetes_type == 1 ) {
			type = 'T1DM';
		} else if ( data_store.diabetes_type == 2 ) {
			type = 'T2DM';		
		} else {
			type = 'T1DM & T2DM';
		}
		
		var value = 100;
			value = with_commas( Math.round( engine.get_value( 255, 8 ) ));		
		
		var daily_price_basaglar_pens = daily_price_lantus_pens = daily_price_basaglar_carts = daily_price_lantus_carts = _default.cur;
			daily_price_basaglar_pens += ( engine.get_value( 112, 4 ) && engine.get_value( 112, 4 ) != 'USER_VALUE' ) ? dp_2( engine.get_value( 112, 4 ) ) : dp_2( engine.get_value( 112, 5 ) );
			daily_price_basaglar_carts += ( engine.get_value( 121, 4 ) && engine.get_value( 121, 4 ) != 'USER_VALUE' ) ? dp_2( engine.get_value( 121, 4 ) ) : dp_2( engine.get_value( 121, 5 ) );
		
		
		var basaglar_pens_carts_exist = engine.check_if_pens_and_carts( 'basaglar' );
		
		var s_1 = 'The ' + engine.check_if_saving( 255 ) + ' within ';
		var s_2 = 'Basaglar™ ';
		var s_3 = 'is ';
		var s_4 = _default.cur + value;
		var s_5 = ' over a 5 year time horizon\n';
		var s_6 = 'at a daily price of ';
		var s_7 = daily_price_basaglar_pens;
		var s_8 = ' for pens ';
		var s_8a = 'and ';
		var s_9 = daily_price_basaglar_carts;
		var s_10 = ' cartridges.';
		
		var full_text = s_1 + s_2 + s_3 + s_4 + s_5 + s_6; // + s_7 + s_8 + s_9+ s_10; 
		
		if ( basaglar_pens_carts_exist.pens ) full_text += s_7 + s_8;
		if ( basaglar_pens_carts_exist.pens && basaglar_pens_carts_exist.carts ) full_text += s_8a;
		 
		if ( basaglar_pens_carts_exist.carts ) full_text += s_9;
		if ( basaglar_pens_carts_exist.carts && !basaglar_pens_carts_exist.pens ) full_text += ' for';
		if ( basaglar_pens_carts_exist.carts ) full_text += s_10;
		
		var container = Ti.UI.createView({						
			top: 20,
			width: Ti.UI.SIZE, height: Ti.UI.SIZE,
			layout:'horizontal'
		});
			
			
			 if ( s_7 == s_9 ) {
			 	var attr = Ti.UI.createAttributedString({
				    text: full_text,
				    attributes: [
				        {
				            type: Ti.UI.ATTRIBUTE_FONT,
				            value: { fontSize: 22, fontFamily: settings.get_font( 'GR-Bold' ) },
				            range: [ full_text.indexOf( s_2 ), ( s_2 ).length]
				        },
				        {
				            type: Ti.UI.ATTRIBUTE_FONT,
				            value: { fontSize: 22, fontFamily: settings.get_font( 'GR-Bold' ) },
				            range: [ full_text.indexOf( s_4 ), ( s_4 ).length]
				        },
				        {
				            type: Ti.UI.ATTRIBUTE_FONT,
				            value: { fontSize: 22, fontFamily: settings.get_font( 'GR-Bold' ) },
				            range: [ full_text.indexOf( s_7 ), ( s_7 ).length]
				        },
				        {
				            type: Ti.UI.ATTRIBUTE_FONT,
				            value: { fontSize: 22, fontFamily: settings.get_font( 'GR-Bold' ) },
				            range: [ getPosition( full_text, s_9, 2 ), ( s_9 ).length]
				        }
				       
				   ]
				});	
			} else if ( basaglar_pens_carts_exist.pens ) {
				
				var attr = Ti.UI.createAttributedString({
				    text: full_text,
				    attributes: [
				        {
				            type: Ti.UI.ATTRIBUTE_FONT,
				            value: { fontSize: 22, fontFamily: settings.get_font( 'GR-Bold' ) },
				            range: [ full_text.indexOf( s_2 ), ( s_2 ).length]
				        },
				        {
				            type: Ti.UI.ATTRIBUTE_FONT,
				            value: { fontSize: 22, fontFamily: settings.get_font( 'GR-Bold' ) },
				            range: [ full_text.indexOf( s_4 ), ( s_4 ).length]
				        },
				        {
				            type: Ti.UI.ATTRIBUTE_FONT,
				            value: { fontSize: 22, fontFamily: settings.get_font( 'GR-Bold' ) },
				            range: [ full_text.indexOf( s_7 ), ( s_7 ).length]
				        }
			      ]
			      });
			} else if ( basaglar_pens_carts_exist.carts ) {
				
				var attr = Ti.UI.createAttributedString({
				    text: full_text,
				    attributes: [
				        {
				            type: Ti.UI.ATTRIBUTE_FONT,
				            value: { fontSize: 22, fontFamily: settings.get_font( 'GR-Bold' ) },
				            range: [ full_text.indexOf( s_2 ), ( s_2 ).length]
				        },
				        {
				            type: Ti.UI.ATTRIBUTE_FONT,
				            value: { fontSize: 22, fontFamily: settings.get_font( 'GR-Bold' ) },
				            range: [ full_text.indexOf( s_4 ), ( s_4 ).length]
				        },
				        {
				            type: Ti.UI.ATTRIBUTE_FONT,
				            value: { fontSize: 22, fontFamily: settings.get_font( 'GR-Bold' ) },
				            range: [ full_text.indexOf( s_9 ), ( s_9 ).length]
				        }
			      ]
			      });
			} else {
				var attr = Ti.UI.createAttributedString({
				    text: full_text,
				    attributes: [
				        {
				            type: Ti.UI.ATTRIBUTE_FONT,
				            value: { fontSize: 22, fontFamily: settings.get_font( 'GR-Bold' ) },
				            range: [ full_text.indexOf( s_2 ), ( s_2 ).length]
				        },
				        {
				            type: Ti.UI.ATTRIBUTE_FONT,
				            value: { fontSize: 22, fontFamily: settings.get_font( 'GR-Bold' ) },
				            range: [ full_text.indexOf( s_4 ), ( s_4 ).length]
				        },
				        {
				            type: Ti.UI.ATTRIBUTE_FONT,
				            value: { fontSize: 22, fontFamily: settings.get_font( 'GR-Bold' ) },
				            range: [ full_text.indexOf( s_7 ), ( s_7 ).length]
				        },
				     	{
				            type: Ti.UI.ATTRIBUTE_FONT,
				            value: { fontSize: 22, fontFamily: settings.get_font( 'GR-Bold' ) },
				            range: [ full_text.indexOf( s_9 ), ( s_9 ).length]
				        }
			      ]
			      });
			}
			
			
			var label_1 = Ti.UI.createLabel({						
				top: 0, left: 0, width: Ti.UI.SIZE, height: Ti.UI.SIZE, color: settings.get_color( 'brown' ), textAlign: 'center',
				font: { fontSize: 22, fontFamily: settings.get_font( 'GR-Book' ) },
				attributedString: attr				
			});
			container.add( label_1 );
			
			function getPosition(str, m, i) {
			   return str.split(m, i).join(m).length;
			}
			
		return container;
		
	};
	
	function add_top_statement_two() {
		
		
		var statement_1 = 'Basaglar™';
		var statement_2 = 'Lantus';
		
		
		var label_1 = Ti.UI.createLabel({						
			top: 112, left: 200, width: Ti.UI.SIZE, height: Ti.UI.SIZE, color: '#c6579a', textAlign: 'left',
			font: { fontSize: 32, fontFamily: settings.get_font( 'GR-Bold' ) },
			text: statement_1				
		});
		self.content_container.add( label_1 );
		
		var label_2 = Ti.UI.createLabel({						
			top: 112, right: 190, width: Ti.UI.SIZE, height: Ti.UI.SIZE, color: '#acae2e', textAlign: 'left',
			font: { fontSize: 32, fontFamily: settings.get_font( 'GR-Bold' ) },
			text: statement_2				
		});
		self.content_container.add( label_2 );
		
		
	};
	
	function add_top_statement_three() {
		
		var statement_1 = '5 Year\nCost';
		
		var basagalar_5_year_cost = 100;
		var lantus_5_year_cost = 100;
		if ( data_store.diabetes_type == 1 ) {
			basagalar_5_year_cost = with_commas( Math.round( engine.get_value( 155, 8 ) ));		
			lantus_5_year_cost = with_commas( Math.round( engine.get_value( 156, 8 ) ));		
		} else if ( data_store.diabetes_type == 2 ) {
			basagalar_5_year_cost = with_commas( Math.round( engine.get_value( 210, 8 ) ));		
			lantus_5_year_cost = with_commas( Math.round( engine.get_value( 211, 8 ) ));		
		} else {
			basagalar_5_year_cost =  with_commas( Math.round( engine.get_value( 155, 8 ) + engine.get_value( 210, 8 ) ));
			lantus_5_year_cost =  with_commas( Math.round( engine.get_value( 156, 8 ) + engine.get_value( 211, 8 ) ));
		}
			
		var container = Ti.UI.createView({						
			left: 15, top: 157,
			width: 736, height: 75,
			backgroundColor:'#FFFFFF'	
		});
		self.content_container.add( container );
			
			var label_1 = Ti.UI.createLabel({						
				top: 0, left: 0, width: 150, height: Ti.UI.FILL, color: settings.get_color( 'brown' ), textAlign: 'right',
				font: { fontSize: 20, fontFamily: settings.get_font( 'GR-Medium' ) },
				text: statement_1				
			});
			container.add( label_1 );	
			
			var value_1 = Ti.UI.createLabel({						
				top: 0, left: 185, width: Ti.UI.SIZE, height: Ti.UI.FILL, color: '#c6579a', textAlign: 'left',
				font: { fontSize: 32, fontFamily: settings.get_font( 'GR-Bold' ) },
				text: basagalar_5_year_cost				
			});
			container.add( value_1 );	
			
			var value_2 = Ti.UI.createLabel({						
				top: 0, right: 15, width: Ti.UI.SIZE, height: Ti.UI.FILL, color: '#acae2e', textAlign: 'right',
				font: { fontSize: 32, fontFamily: settings.get_font( 'GR-Bold' ) },
				text: lantus_5_year_cost				
			});
			container.add( value_2 );	
			
	}
	
	function add_top_statement_four() {
		
		var statement_1 = '5 Year\nPatients';
		var basagalar_5_year_patient = 100;
		var lantus_5_year_patient = 100;
		if ( data_store.diabetes_type == 1 ) {
			basagalar_5_year_patient = with_commas( Math.round( engine.get_value( 138, 8 ) ));		
			lantus_5_year_patient = with_commas( Math.round( engine.get_value( 139, 8 ) ));		
		} else if ( data_store.diabetes_type == 2 ) {
			basagalar_5_year_patient = with_commas( Math.round( engine.get_value( 193, 8 ) ));		
			lantus_5_year_patient = with_commas( Math.round( engine.get_value( 194, 8 ) ));		
		} else {
			basagalar_5_year_patient =  with_commas( Math.round( engine.get_value( 138, 8 ) + engine.get_value( 193, 8 ) ));
			lantus_5_year_patient =  with_commas( Math.round( engine.get_value( 139, 8 ) + engine.get_value( 194, 8 ) ));
		}
		var container = Ti.UI.createView({						
			left: 15, top: 240,
			width: 736, height: 75,
			backgroundColor:'#FFFFFF'	
		});
		self.content_container.add( container );
			
			var label_1 = Ti.UI.createLabel({						
				top: 0, left: 0, width: 150, height: Ti.UI.FILL, color: settings.get_color( 'brown' ), textAlign: 'right',
				font: { fontSize: 20, fontFamily: settings.get_font( 'GR-Medium' ) },
				text: statement_1				
			});
			container.add( label_1 );	
			
			var value_1 = Ti.UI.createLabel({						
				top: 0, left: 185, width: Ti.UI.SIZE, height: Ti.UI.FILL, color: '#c6579a', textAlign: 'left',
				font: { fontSize: 32, fontFamily: settings.get_font( 'GR-Bold' ) },
				text: basagalar_5_year_patient				
			});
			container.add( value_1 );	
			
			var value_2 = Ti.UI.createLabel({						
				top: 0, right: 15, width: Ti.UI.SIZE, height: Ti.UI.FILL, color: '#acae2e', textAlign: 'right',
				font: { fontSize: 32, fontFamily: settings.get_font( 'GR-Bold' ) },
				text: lantus_5_year_patient				
			});
			container.add( value_2 );	
			
	}
	
	
		
/*	
	function add_top_statement_three() {
		
		var value_1 = 100;
		if ( data_store.diabetes_type == 1 ) {
			value_1 = with_commas( Math.round( engine.get_value( 37, 8 ) ));		
		} else if ( data_store.diabetes_type == 2 ) {
			value_1 = with_commas( Math.round( engine.get_value( 63, 8 ) ));		
		} else {
			value_1 = with_commas( Math.round( engine.get_value( 37, 8 ) + engine.get_value( 63, 8 ) ));
		}
		var value_2 = 100;
		if ( data_store.diabetes_type == 1 ) {
			value_2 = with_commas( Math.round( engine.get_value( 253, 8 ) ));		
		} else if ( data_store.diabetes_type == 2 ) {
			value_2 = with_commas( Math.round( engine.get_value( 253, 8 ) ));		
		} else {
			value_2 = with_commas( Math.round( engine.get_value( 253, 8 ) ));
		}
			
		var statement_1 = 'The 5 year cumulative cost of treating ';
		var statement_2 = value_1;
		var statement_3 = ' patients in the';
		var statement_4 = 'alternative market is: ';
		var statement_5 = _default.cur + value_2;
		
		
		var container = Ti.UI.createView({						
			top: 20,
			width: Ti.UI.SIZE, height: Ti.UI.SIZE,
			layout:'vertical'	
		});
			
			var container_1 = Ti.UI.createView({						
				top: 0,
				width: Ti.UI.SIZE, height: Ti.UI.SIZE,
				layout:'horizontal'	
			});
			container.add( container_1 );
		
				var label_1 = Ti.UI.createLabel({						
					top: 0, left: 0,
					width:  Ti.UI.SIZE, height: Ti.UI.SIZE,
					font: { fontSize: 20, fontFamily: settings.get_font( 'GR-Book' ) },
					text: statement_1,
					color: settings.get_color( 'brown' ),
					textAlign: 'center'					
				});
				container_1.add( label_1 );
				
				var label_2 = Ti.UI.createLabel({						
					top: 0, left: 0,
					width: Ti.UI.SIZE, height: Ti.UI.SIZE,
					font: { fontSize: 20, fontFamily: settings.get_font( 'GR-Bold' ) },
					text: statement_2,
					color: '#aba714',
					textAlign: 'left'					
				});
				container_1.add( label_2 );
				
				var label_3 = Ti.UI.createLabel({						
					top: 0, left: 0,
					width: Ti.UI.SIZE, height: Ti.UI.SIZE,
					font: { fontSize: 20, fontFamily: settings.get_font( 'GR-Book' ) },
					text: statement_3,
					color: settings.get_color( 'brown' ),
					textAlign: 'left'					
				});
				container_1.add( label_3 );
			
			var container_2 = Ti.UI.createView({						
				top: 2,
				width: Ti.UI.SIZE, height: Ti.UI.SIZE,
				layout:'horizontal'	
			});
			container.add( container_2 );
					
				var label_4 = Ti.UI.createLabel({						
					top: 0, left: 0,
					width: Ti.UI.SIZE, height: Ti.UI.SIZE,
					font: { fontSize: 20, fontFamily: settings.get_font( 'GR-Book' ) },
					text: statement_4,
					color: settings.get_color( 'brown' ),
					textAlign: 'left'					
				});
				container_2.add( label_4 );
				
				var label_5 = Ti.UI.createLabel({						
					top: 0, left: 0,
					width: Ti.UI.SIZE, height: Ti.UI.SIZE,
					font: { fontSize: 20, fontFamily: settings.get_font( 'GR-Bold' ) },
					text: statement_5,
					color: '#aba714',
					textAlign: 'left'					
				});
				container_2.add( label_5 );
		
		return container;
		
	};
	
	function add_top_statement_four() {
		
		var value_1 = 100;
		if ( data_store.diabetes_type == 1 ) {
			value_1 = with_commas( Math.round( engine.get_value( 37, 8 ) ));		
		} else if ( data_store.diabetes_type == 2 ) {
			value_1 = with_commas( Math.round( engine.get_value( 63, 8 ) ));		
		} else {
			value_1 = with_commas( Math.round( engine.get_value( 37, 8 ) + engine.get_value( 63, 8 ) ));
		}
		var value_2 = 100;
		if ( data_store.diabetes_type == 1 ) {
			value_2 = with_commas( Math.round( engine.get_value( 249, 8 ) ));		
		} else if ( data_store.diabetes_type == 2 ) {
			value_2 = with_commas( Math.round( engine.get_value( 249, 8 ) ));		
		} else {
			value_2 = with_commas( Math.round( engine.get_value( 249, 8 ) ));
		}
			
		var statement_1 = 'The 5 year cumulative cost of treating ';
		var statement_2 = value_1;
		var statement_3 = ' patients in the';
		var statement_4 = 'market including Basaglar™ is: ';
		var statement_5 = _default.cur + value_2;
		
		
		var container = Ti.UI.createView({						
			top: 20,
			width: Ti.UI.SIZE, height: Ti.UI.SIZE,
			layout:'vertical'	
		});
			
			var container_1 = Ti.UI.createView({						
				top: 0,
				width: Ti.UI.SIZE, height: Ti.UI.SIZE,
				layout:'horizontal'	
			});
			container.add( container_1 );
		
				var label_1 = Ti.UI.createLabel({						
					top: 0, left: 0,
					width:  Ti.UI.SIZE, height: Ti.UI.SIZE,
					font: { fontSize: 20, fontFamily: settings.get_font( 'GR-Book' ) },
					text: statement_1,
					color: settings.get_color( 'brown' ),
					textAlign: 'center'					
				});
				container_1.add( label_1 );
				
				var label_2 = Ti.UI.createLabel({						
					top: 0, left: 0,
					width: Ti.UI.SIZE, height: Ti.UI.SIZE,
					font: { fontSize: 20, fontFamily: settings.get_font( 'GR-Bold' ) },
					text: statement_2,
					color: '#b83d88',
					textAlign: 'left'					
				});
				container_1.add( label_2 );
				
				var label_3 = Ti.UI.createLabel({						
					top: 0, left: 0,
					width: Ti.UI.SIZE, height: Ti.UI.SIZE,
					font: { fontSize: 20, fontFamily: settings.get_font( 'GR-Book' ) },
					text: statement_3,
					color: settings.get_color( 'brown' ),
					textAlign: 'left'					
				});
				container_1.add( label_3 );
			
			var container_2 = Ti.UI.createView({						
				top: 2,
				width: Ti.UI.SIZE, height: Ti.UI.SIZE,
				layout:'horizontal'	
			});
			container.add( container_2 );
					
				var label_4 = Ti.UI.createLabel({						
					top: 0, left: 0,
					width: Ti.UI.SIZE, height: Ti.UI.SIZE,
					font: { fontSize: 20, fontFamily: settings.get_font( 'GR-Book' ) },
					text: statement_4,
					color: settings.get_color( 'brown' ),
					textAlign: 'left'					
				});
				container_2.add( label_4 );
				
				var label_5 = Ti.UI.createLabel({						
					top: 0, left: 0,
					width: Ti.UI.SIZE, height: Ti.UI.SIZE,
					font: { fontSize: 20, fontFamily: settings.get_font( 'GR-Bold' ) },
					text: statement_5,
					color: '#b83d88',
					textAlign: 'left'					
				});
				container_2.add( label_5 );
		
		return container;
		
	};
*/	
	function create_pu_button( title, icon ){
		
		var button = Ti.UI.createView({
			top: 0, left: 0,
			width: 122, height: 100,
			backgroundColor: '#69c083',
			borderColor: '#76cc90',
			borderWidth: 6
		});
			
			var icon = Ti.UI.createImageView({						
				top: 10,
				width: 'auto', height: 'auto',
				image: icon								
			});
			button.add( icon );
			
			var label = Ti.UI.createLabel({						
				bottom: 16, 
				width: Ti.UI.FILL, height: Ti.UI.SIZE,
				font: { fontSize: 14, fontFamily: settings.get_font( 'GR-Bold' ) },
				text: title,
				color: settings.get_color( 'white' ),
				textAlign: 'center'								
			});
			button.add( label );
			
			button.hit_area = Ti.UI.createView({
				top: 0, left: 0,
				width: Ti.UI.FILL, height: Ti.UI.FILL
			});
			button.add( button.hit_area );
			
		return button;	
	};
			
	function show_pop_up ( e ) {
		
		engine.print_everything();
		
		var pop_up_id = e.source.pop_up;
		
		var args = '';
		if ( e.source.args ) args = e.source.args;
				
		var pop_up_class = require('ui/' + pop_up_id );
		var pop_up = new pop_up_class( args );
		layers.add_layer_function( pop_up );
					
	};
	
	function back_function() {
		
		screen_controller.switch_screen_state_function( 'Data Inputs' );
		
	};	
	
	function market_share_function () {
		
		var temp_class = require( 'ui/market_share_scenario' );
		var temp_window = new temp_class();
		layers.add_layer_function( temp_window );
			
	};
	
	self.redraw_ui = function() {
		
		remove_content_area();						
		create_content();
		type_nav_container.redraw();
		
	};
	
	function diabetes_type_changed ( e ) {
			
		remove_content_area();						
		create_content();
					
	};
	
	function remove_content_area() {
		
		main_container.remove( self.content_container );
		self.content_container = null;
			
	};
	
	
	function report_function () {
	
		screen_controller.switch_screen_state_function( 'Report' );
				
	};



////////////////////////////////////////////////////
//FUNCTIONS
////////////////////////////////////////////////////
	
	
	

	
	
////////////////////////////////////////////////////
//RUN FUNCTIONS
////////////////////////////////////////////////////


	
	return self;
	
}

module.exports = this_class;