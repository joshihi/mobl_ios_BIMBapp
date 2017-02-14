function this_class( args ) {



////////////////////////////////////////////////////
//VARS
////////////////////////////////////////////////////
	
	var discount_slider_class = require('ui/data_inputs/discount_slider');
	var element_ms_class = require('ui/element_market_share_icon' );
	
	var type_array = new Array();
	var grey_container;
	var main_container;
	var graph_area;
	
	var view_type;
	var visualistaion_type = 'graph';
	
	if ( args ) view_type = args;
	
	var self = Ti.UI.createWindow( { width: 1024, height:768, zIndex:0, fullscreen:true, navBarHidden:true, backgroundColor: settings.get_color( 'white' ), window_id:"Detailed results" } );
	
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
		
		//CROSS
			var cross = lvc_ui.create_cross();	
			self.container.add( cross );
			
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
						text: 'DETAILED RESULTS',
						color: settings.get_color( 'brown' )					
					});
					header_banner_container.add( header_label );
			
			var type_nav_container = new results_type_selector_class( diabetes_type_changed );
			self.container.add(	type_nav_container );
				
		var proceed_button = button_class.create_proceed( '            Drug Price Scenario', 'includes/images/drug_price_icon.png' );
			proceed_button.bottom = 20;
			proceed_button.status = 1;
			proceed_button.zIndex = 1000000;
		self.container.add( proceed_button );
		proceed_button.addEventListener( 'click', proceed_button_clicked );
			
		//MAIN
		
		create_graph_content_area();
		
	
////////////////////////////////////////////////////
//FUNCTIONS
////////////////////////////////////////////////////
	
	function create_graph_content_area(){
		
		visualistaion_type = 'graph';
		
		grey_container = Ti.UI.createView({
			width: 926,
			height: 590,
			top: 130,
			backgroundColor: '#eeeeee',
			layout: 'horizontal'
		});
		self.container.add( grey_container );
		
			main_container = Ti.UI.createView({
				width: '100%',
				height: '100%',
				top: 0, left: 0
			});
			grey_container.add( main_container );
		
				var title = Ti.UI.createLabel({						
					left:0, top:25,
					width: '100%', height: Ti.UI.SIZE,
					font: { fontSize: 24, fontFamily: settings.get_font( 'GR-Bold' ) },
					text: 'Annual Cost (' + get_type_name() + ')',
					textAlign: 'center',
					color: settings.get_color( 'brown' )					
				});
				main_container.add( title );
		
				var web_holder = Ti.UI.createView({
					left: 0, top: 75,
					width: '100%',
					height: 475
				});
				main_container.add( web_holder );
					
					if ( view_type == 'dps' ) {
						var html = graphs.get_detailed_results_html( true, 'drug_scenario' );
					} else {
						var html = graphs.get_detailed_results_html( true, 'detailed' );
					}
					
					graph_area = Ti.UI.createWebView({
						left: 0, top: 0,
						width: '100%',
						height: 355,
						html: html,
						//url: 'detailed_graph.html',
						disableBounce: true,
						backgroundColor: 'transparent'
					});
					web_holder.add( graph_area );
				/*	
					graph_area.addEventListener( 'load', loader=function () { 
						graph_area.removeEventListener( 'load', loader );
						console.log( 'triggered' );
						graph_area.reload();
					});
				*/	
					setTimeout( function() {						
						if ( view_type == 'dps' ) {
							leavepiece_html_class.save_image( graph_area, "drug_scenario" );
						} else { 
							leavepiece_html_class.save_image( graph_area, "detailed_result" );
						}						
					}, settings.graph_save_speed );
					
					
					var market_share_key_text = Ti.UI.createLabel({						
						left: 5, top:360,
						width: Ti.UI.SIZE, height: Ti.UI.SIZE,
						font: { fontSize: 12, fontFamily: settings.get_font( 'GR-Book' ) },
						text: 'Percentage annual \nmarket share',
						textAlign: 'left',
						color: settings.get_color( 'brown' )		
					});
					web_holder.add( market_share_key_text );
																
					var ms_container = Ti.UI.createView({
						left: 150, top:360, right: 15,
						width: Ti.UI.FILL, height: Ti.UI.SIZE, layout: 'vertical'
					});	
					web_holder.add( ms_container );
						
						if ( data_store.diabetes_type == 1 || data_store.diabetes_type == 3 ) {	
							
							var t1_market_share_text = Ti.UI.createLabel({						
								left: 130, top: 360, 
								width: Ti.UI.SIZE, height: Ti.UI.SIZE,
								font: { fontSize: 12, fontFamily: settings.get_font( 'GR-Medium' ) },
								text: 'T1DM', textAlign: 'left', color: settings.get_color( 'brown' )					
							});
							web_holder.add( t1_market_share_text );
							
							var t1dm_ms_container = Ti.UI.createView({
								left: 0, top:0, right: 15, bottom: 5,
								width: Ti.UI.FILL, height: Ti.UI.SIZE, layout: 'horizontal'
							});	
							ms_container.add( t1dm_ms_container );
								
								var element_ms_1 = new element_ms_class( engine.get_value( 38, 4 ) );	
								t1dm_ms_container.add( element_ms_1 );
								
								var element_ms_2 = new element_ms_class( engine.get_value( 38, 5 ) );	
								t1dm_ms_container.add( element_ms_2 );
								
								var element_ms_3 = new element_ms_class( engine.get_value( 38, 6 ) );	
								t1dm_ms_container.add( element_ms_3 );
								
								var element_ms_4 = new element_ms_class( engine.get_value( 38, 7 ) );	
								t1dm_ms_container.add( element_ms_4 );
								
								var element_ms_5 = new element_ms_class( engine.get_value( 38, 8 ) );	
								t1dm_ms_container.add( element_ms_5 );
						
						}
						
						if ( data_store.diabetes_type == 2 || data_store.diabetes_type == 3 ) {
							
							var t2_market_share_text = Ti.UI.createLabel({						
								left: 130, top: 360, 
								width: Ti.UI.SIZE, height: Ti.UI.SIZE,
								font: { fontSize: 12, fontFamily: settings.get_font( 'GR-Medium' ) },
								text: 'T2DM', textAlign: 'left', color: settings.get_color( 'brown' )					
							});
							web_holder.add( t2_market_share_text );
							
							if ( data_store.diabetes_type == 3 ) t2_market_share_text.top = 412;
								
							var t2dm_ms_container = Ti.UI.createView({
								left: 0, top:0, right: 15,
								width: Ti.UI.FILL, height: Ti.UI.SIZE, layout: 'horizontal'	
							});	
							ms_container.add( t2dm_ms_container );
							
								var element_ms_1 = new element_ms_class( engine.get_value( 64, 4 ) );	
								t2dm_ms_container.add( element_ms_1 );
								
								var element_ms_2 = new element_ms_class( engine.get_value( 64, 5 ) );	
								t2dm_ms_container.add( element_ms_2 );
								
								var element_ms_3 = new element_ms_class( engine.get_value( 64, 6 ) );	
								t2dm_ms_container.add( element_ms_3 );
								
								var element_ms_4 = new element_ms_class( engine.get_value( 64, 7 ) );	
								t2dm_ms_container.add( element_ms_4 );
								
								var element_ms_5 = new element_ms_class( engine.get_value( 64, 8 ) );	
								t2dm_ms_container.add( element_ms_5 );
								
						}
				
				var table_icon = Ti.UI.createView({
					right: 0, top: 0,
					width: 46, height: 46,
					backgroundImage: 'includes/images/table_icon.png',
					id: 1,
					zIndex: 100000,
				});						
				main_container.add( table_icon );
				table_icon.addEventListener( 'click', vis_icon_clicked );	
				
			var drug_price_container = Ti.UI.createView({
				left: 0, top: 0,
				width: 270, height: '100%',
				backgroundColor: settings.get_color( 'brown' ),
				layout: 'vertical'
			});		
			grey_container.add( drug_price_container );
				
				var dps_title = Ti.UI.createLabel({						
					left:20, top:20,
					width: Ti.UI.SIZE, height: Ti.UI.SIZE,
					font: { fontSize: 24, fontFamily: settings.get_font( 'GR-Bold' ) },
					text: 'Drug Price \nScenario',
					textAlign: 'left',
					color: settings.get_color( 'white' )					
				});
				drug_price_container.add( dps_title );
				
				var dps_title = Ti.UI.createLabel({						
					left:20, top: 12,
					width: Ti.UI.SIZE, height: Ti.UI.SIZE,
					font: { fontSize: 14, fontFamily: settings.get_font( 'GR-Bold' ) },
					text: '% discount applied to Lantus®',
					textAlign: 'left',
					color: '#aba714'					
				});
				drug_price_container.add( dps_title );
				
				var year_1_container = Ti.UI.createView({
					left: 20, top: 15, right: 20,
					width: Ti.UI.FILL, height: 75
				});		
				drug_price_container.add( year_1_container );
				
					var year_1_slider = discount_slider_class( { title: 'Year 1', row: 171, col: 4, callback: discount_update }, update_others );
					year_1_container.add( year_1_slider );
					
				
				var year_2_container = Ti.UI.createView({
					left: 20, top: 15, right: 20,
					width: Ti.UI.FILL, height: 75
				});		
				drug_price_container.add( year_2_container );
					
					var year_2_slider = discount_slider_class( { title: 'Year 2', row: 171, col: 5, callback: discount_update } );
					year_2_container.add( year_2_slider );
				
				var year_3_container = Ti.UI.createView({
					left: 20, top: 15, right: 20,
					width: Ti.UI.FILL, height: 75
				});		
				drug_price_container.add( year_3_container );
					
					var year_3_slider = discount_slider_class( { title: 'Year 3', row: 171, col: 6, callback: discount_update } );
					year_3_container.add( year_3_slider );
				
				var year_4_container = Ti.UI.createView({
					left: 20, top: 15, right: 20,
					width: Ti.UI.FILL, height: 75
				});		
				drug_price_container.add( year_4_container );
					
					var year_4_slider = discount_slider_class( { title: 'Year 4', row: 171, col: 7, callback: discount_update } );
					year_4_container.add( year_4_slider );
				
				var year_5_container = Ti.UI.createView({
					left: 20, top: 15, right: 20,
					width: Ti.UI.FILL, height: 75
				});		
				drug_price_container.add( year_5_container );
					
					var year_5_slider = discount_slider_class( { title: 'Year 5', row: 171, col: 8, callback: discount_update } );
					year_5_container.add( year_5_slider );
						
				function update_others( value ) {
					
					year_2_slider.update_from_master( value );
					year_3_slider.update_from_master( value );
					year_4_slider.update_from_master( value );
					year_5_slider.update_from_master( value );
					
					engine.re_calculate();	
					discount_update();
										
				};
					
			if ( view_type == 'dps' ) proceed_button_clicked( { source: proceed_button } );
			proceed_button.opacity = 1;
	};
	
	function create_table_content_area () {
		
		visualistaion_type = 'table';
		
		grey_container = Ti.UI.createView({
			width: 926,
			height: 590,
			top: 130,
			backgroundColor: '#eeeeee',
			layout: 'horizontal'
		});
		self.container.add( grey_container );
		
			main_container = Ti.UI.createView({
				width: '100%',
				height: '100%',
				top: 0, left: 0
			});
			grey_container.add( main_container );
		
				var title = Ti.UI.createLabel({						
					left:0, top:25,
					width: '100%', height: Ti.UI.SIZE,
					font: { fontSize: 24, fontFamily: settings.get_font( 'GR-Bold' ) },
					text: 'Detailed Tabular Results',
					textAlign: 'center',
					color: settings.get_color( 'brown' )					
				});
				main_container.add( title );
		
				var table_holder = Ti.UI.createView({
					left: 0, top: 75,
					width: '100%',
					height: 475
				});
				main_container.add( table_holder );
									
				var graph_icon = Ti.UI.createView({
					right: 0, top: 0,
					width: 46, height: 46,
					backgroundImage: 'includes/images/vis_graph_icon.png',
					id: 1,
					zIndex: 100000,
				});						
				main_container.add( graph_icon );
				graph_icon.addEventListener( 'click', vis_icon_clicked );	
			
				var table = get_table(  );				
				main_container.add( table );
				
				var saving = with_commas( Math.abs( Math.round( engine.get_value( 254, 8 )  ) ));		
						
				var statement_container = Ti.UI.createView({						
					top: 515,
					width: Ti.UI.SIZE, height: Ti.UI.SIZE,
					layout:'horizontal'	
				});
				main_container.add( statement_container );
					
					var budget_impact_savings_text = engine.check_if_saving();
					if ( budget_impact_savings_text == 'saving' ) budget_impact_savings_text += 's';
					
					var label_1 = Ti.UI.createLabel({						
						top: 0, left: 0,
						width:  '100%', height: Ti.UI.SIZE,
						font: { fontSize: 20, fontFamily: settings.get_font( 'GR-Book' ) },
						text: 'Treatment with Basaglar™ is expected to generate estimated ' + budget_impact_savings_text + ' of ',
						color: settings.get_color( 'brown' ),
						textAlign: 'center'					
					});
					statement_container.add( label_1 );
					
					var label_2 = Ti.UI.createLabel({						
						top: 3, left: 0,
						width: '100%', height: Ti.UI.SIZE,
						font: { fontSize: 20, fontFamily: settings.get_font( 'GR-Bold' ) },
						text: _default.cur + saving + ' over 5 years',
						color: '#b83d88',
						textAlign: 'center'					
					});
					statement_container.add( label_2 );
				
			proceed_button.opacity = 0;
			
	};
	
	function vis_icon_clicked ( e ) {
		
		var obj = e.source;
		console.log(JSON.stringify(obj));
		
		if ( visualistaion_type == 'table' ) {
			remove_content_area();
			create_graph_content_area();
		} else {
			remove_content_area();
			create_table_content_area();	
		}
		
	};
	
	function diabetes_type_changed ( ) {

		remove_content_area();
		
		create_graph_content_area();

	};
	
	function remove_content_area() {
		
		self.container.remove( grey_container );
		grey_container = null;
		main_container = null;
		graph_area = null;
			
	};
	
	function drug_price_toggle ( bool ) {
		
		if ( bool ) {
			
			main_container.width = 656;
			var html = graphs.get_detailed_results_html( true, 'drug_scenario' );
			graph_area.setHtml( html );
			setTimeout( function() {						
				leavepiece_html_class.save_image( graph_area, "drug_scenario" );						
			}, settings.graph_save_speed );
			
		} else {
			
			main_container.width = '100%';
			var html = graphs.get_detailed_results_html( true, 'detailed' );
			graph_area.setHtml( html );
			setTimeout( function() {						
				leavepiece_html_class.save_image( graph_area, "detailed_result" );						
			}, settings.graph_save_speed );
			
		}
		
	}
	
	
	function proceed_button_clicked ( e ) {
		
		var obj = e.source;
		console.log(JSON.stringify(e.source));
		
		if ( obj.status == 1 ) {
			obj.status = 2;
			obj.title = 'Close';
			drug_price_toggle( true );
			view_type = 'dps';
		} else {
			obj.status = 1;
			obj.title = '            Drug Price Scenario';
			drug_price_toggle( false );
			view_type = '';
		}
		
	
	};
	
	function discount_update () {
		
		var html = graphs.get_detailed_results_html( true, 'drug_scenario' );
		
		graph_area.setHtml( html );
		setTimeout( function() {						
			leavepiece_html_class.save_image( graph_area, "drug_scenario" );						
		}, settings.graph_save_speed );
					
	};
	
	var table_row_array = new Array();
	
	function get_table() {	
		
		table_row_array = new Array();
				
		var annual_cost_inc_basaglar_id = 248;
		var total_cost_basaglar_id = 250;
		var total_cost_lantus_id = 251;
		var alternative_market_id = 252;
		var expected_annual_saving_id = 254;
		var cumaltive_budget_impact_id = 255;
		
		var years_array = engine.get_years_array();
		
		var annual_cost_inc_basaglar_array = engine.get_multiple_values( [{ row: annual_cost_inc_basaglar_id, col:4 }, { row: annual_cost_inc_basaglar_id, col:5 }, { row: annual_cost_inc_basaglar_id, col:6 }, { row: annual_cost_inc_basaglar_id, col:7 }, { row: annual_cost_inc_basaglar_id, col:8 } ] );				
		var total_cost_basaglar_array = engine.get_multiple_values( [{ row: total_cost_basaglar_id, col:4 }, { row: total_cost_basaglar_id, col:5 }, { row: total_cost_basaglar_id, col:6 }, { row: total_cost_basaglar_id, col:7 }, { row: total_cost_basaglar_id, col:8 } ] );
		var total_cost_lantus_array = engine.get_multiple_values( [{ row: total_cost_lantus_id, col:4 }, { row: total_cost_lantus_id, col:5 }, { row: total_cost_lantus_id, col:6 }, { row: total_cost_lantus_id, col:7 }, { row: total_cost_lantus_id, col:8 } ] );
		var alternative_market_array = engine.get_multiple_values( [{ row: alternative_market_id, col:4 }, { row: alternative_market_id, col:5 }, { row: alternative_market_id, col:6 }, { row: alternative_market_id, col:7 }, { row: alternative_market_id, col:8 } ] );
		var expected_annual_saving_array = engine.get_multiple_values( [{ row: expected_annual_saving_id, col:4 }, { row: expected_annual_saving_id, col:5 }, { row: expected_annual_saving_id, col:6 }, { row: expected_annual_saving_id, col:7 }, { row: expected_annual_saving_id, col:8 } ] );
		var cumaltive_budget_impact_array = engine.get_multiple_values( [{ row: cumaltive_budget_impact_id, col:4 }, { row: cumaltive_budget_impact_id, col:5 }, { row: cumaltive_budget_impact_id, col:6 }, { row: cumaltive_budget_impact_id, col:7 }, { row: cumaltive_budget_impact_id, col:8 } ] );
		
		var data_array = [ years_array, annual_cost_inc_basaglar_array, total_cost_basaglar_array, total_cost_lantus_array, alternative_market_array, expected_annual_saving_array, cumaltive_budget_impact_array ];
		
		var budget_impact_savings_text = engine.check_if_saving( expected_annual_saving_id );
		if ( budget_impact_savings_text == 'saving' ) budget_impact_savings_text += 's';
					
		
		var titles_array = [
			"YEARS",
			"Annual cost - market including Basaglar",
			"- Basaglar",
			"- Non Basaglar patients",
			"Annual cost - alternative market",
			"Expected annual " + budget_impact_savings_text,
			"Cumulative " + engine.check_if_saving( cumaltive_budget_impact_id )
		];
		
		var container =Ti.UI.createView({
			left: 40, top: 0,
			width: Ti.UI.FILL, height: Ti.UI.SIZE, layout: 'vertical'
		});
		
		var table_container =Ti.UI.createView({
			left: 40, top: 75, right: 40,
			width: Ti.UI.FILL, height: Ti.UI.SIZE, layout: 'vertical'
		});
		container.add( table_container );
		
		var width = ( 100 / ( data_array[0].length + 1 )) + '%' ;
		
		for ( var i=0; i<data_array.length; i++ ) {
			
			var row = Ti.UI.createView({
				left: 0, top: 2,
				width: '100%', height: Ti.UI.SIZE
			});
			table_container.add( row );
				
				var row_container =Ti.UI.createView({
					left: 0, top: 0,
					width: '100%', height: Ti.UI.SIZE, layout: 'horizontal'
				});
				row.add( row_container );
								
				if ( i == 1 ) {
					row.loaded = false;
					
					var hit_area = Ti.UI.createView({
						left: 0, top: 0,
						width: '100%', height: 60,
						row: row,
						show_label: show_label
					});
					hit_area.addEventListener( 'click', row_clicked );
					row.add( hit_area );
					
					var scroll_indicator = Ti.UI.createView({
						id: 'arrow',
						top: -225,
						right: 8,
						width: 24,
						height: 14,
						zIndex:1000,
						backgroundImage: 'includes/images/assumptions_arrow.png',						
						show_label: show_label	
					});
					scroll_indicator.addEventListener( 'click', row_clicked );					
					container.add( scroll_indicator );
					
					hit_area.partner = scroll_indicator;
					scroll_indicator.partner = hit_area;
						
				}
							
				if ( i == 2 || i == 3 ) {
					row.height = 0;
					row.top = 0;
				}
				
				if ( i == 0 ) {
							
					for ( var k=-1; k<data_array[i].length; k++ ) {	
																		
						var label = Ti.UI.createLabel({
						    text: 'Show all',
						    width: width, height: 32,
						    top: 0, left: 0,
						    font: { fontSize: 15, fontFamily: settings.get_font( 'GR-Bold' ) },
							color: '#69c083',
						    textAlign: 'center'
						});		
						row_container.add( label );
							
						if ( k != -1 ) {
							label.text = data_array[i][k];
							label.backgroundColor = settings.get_color( 'brown' );
							label.color = settings.get_color( 'white' );
						} else {
							var show_label = label;
							show_label.addEventListener( 'click', show_clicked );
							show_label.opacity = 0;
						}
							
					}
				
				} else {
					
					for ( var k=-1; k<data_array[i].length; k++ ) {	
															
						var label = Ti.UI.createLabel({
						    text: titles_array[ i ],
						    width: width, height: 60,
						    top: 0, left: 0,
						    font: { fontSize: 15, fontFamily: settings.get_font( 'GR-Bold' ) },
							color: settings.get_color( 'brown' ),
							backgroundColor: settings.get_color( 'white' ),
						    textAlign: 'center'
						});		
							
						if ( k != -1 ) {
							label.text = _default.cur + '\n' + with_commas( Math.round( data_array[i][k] ) );
							label.textAlign = 'center';
							label.font = { fontSize: 15, fontFamily: settings.get_font( 'GR-Medium' ) };
						} else {
							row_container.backgroundColor = settings.get_color( 'white' );
							label.textAlign = "left";
							label.left = "1%";
							label.width = "15.5%";										
						}
						
						
						
						if ( i == 2 ) label.color = "#b83d88";
						if ( i == 3 ) label.color = "#acae2e";
						
						row_container.add( label );
							
					}
					
					if ( i == 1 ) {						
						var line = Ti.UI.createView({
							left: 0, top: 0,
							width: '100%', height: 2,
							backgroundColor: '#63b67c'
						});
						row_container.add( line );							
					}
					
					table_row_array.push( row );				
					
				}
				
				
				
			}
		
			
		
		return container;
		
	}
	
	function row_clicked ( e ) {
		
		var obj = e.source;
		
		console.log( 'clicked ' + obj.loaded );
		
		if ( obj.loaded ) {
			if ( obj.id == 'arrow' ) {
				obj.top = -225;
				obj.transform = Ti.UI.create2DMatrix().rotate(0);
			} else {
				obj.partner.top = -225;
				obj.partner.transform = Ti.UI.create2DMatrix().rotate(0);
			}
			table_row_array[ 1 ].height = 0;
			table_row_array[ 2 ].height = 0;
			
		} else {
			if ( obj.id == 'arrow' ) {
				obj.top = -345;
				obj.transform = Ti.UI.create2DMatrix().rotate(180);
			} else {
				obj.partner.top = -345;
				obj.partner.transform = Ti.UI.create2DMatrix().rotate(180);
			}
			table_row_array[ 1 ].height = Ti.UI.SIZE;
			table_row_array[ 2 ].height = Ti.UI.SIZE;
			
		}
		
		obj.loaded = !obj.loaded;
		obj.partner.loaded = obj.loaded;
	};
	
	function show_clicked ( e ){
		
		e.source.opacity = 0;
		
		for ( var i=0; i<table_row_array.length; i++ ){
			table_row_array[i].top = 2;
			table_row_array[i].height = Ti.UI.SIZE;
		}
		
	};
	
	
////////////////////////////////////////////////////
//RUN FUNCTIONS
////////////////////////////////////////////////////


	
	return self;
	
}

module.exports = this_class;