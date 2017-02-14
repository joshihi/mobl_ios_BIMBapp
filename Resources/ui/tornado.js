function this_class(  ) {



////////////////////////////////////////////////////
//VARS
////////////////////////////////////////////////////
	
	var option_group_array;
	var graph_area;
	
	var self = Ti.UI.createWindow( { width: 1024, height:768, zIndex:0, fullscreen:true, navBarHidden:true, backgroundColor: settings.get_color( 'white' ), window_id:"Tornado" } );
	
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
						text: 'SENSITIVITY ANALYSIS',
						color: settings.get_color( 'brown' )					
					});
					header_banner_container.add( header_label );
		
		//MAIN
		
		var main_container = Ti.UI.createView({
			width: 926,
			height: 590,
			top: 130,
			backgroundColor: '#eeeeee'
		});
		self.container.add( main_container );
		
			var left_container = Ti.UI.createView({
				left: 50, top: 27,
				width: 250,
				height: Ti.UI.FILL,
				layout: 'vertical'
			});
			main_container.add( left_container );
				
				var step_1_container = Ti.UI.createView({						
					left: 0, top: 0,
					width:Ti.UI.FILL, height: Ti.UI.SIZE,
					layout: 'horizontal'				
				});
				left_container.add( step_1_container );
				
					var step_1 = Ti.UI.createLabel({						
						left:0, top:0,
						width:Ti.UI.SIZE, height: Ti.UI.SIZE,
						font: { fontSize: 18, fontFamily: settings.get_font( 'GR-Bold' ) },
						text: 'Step 1: ',
						textAlign: 'left',
						color: settings.get_color( 'brown' )					
					});
					step_1_container.add( step_1 );
					
					var step_1_text = Ti.UI.createLabel({						
						left:0, top:2,
						width:Ti.UI.SIZE, height: Ti.UI.SIZE,
						font: { fontSize: 14, fontFamily: settings.get_font( 'G-Book' ) },
						text: 'Select tornado outcome',
						textAlign: 'left',
						color: settings.get_color( 'brown' )					
					});
					step_1_container.add( step_1_text );
		
				var select_group = create_select_group();
				left_container.add( select_group );
				
				var step_2_container = Ti.UI.createView({						
					left: 0, top: 27,
					width:Ti.UI.FILL, height: Ti.UI.SIZE,
					layout: 'horizontal'				
				});
				left_container.add( step_2_container );
				
					var step_2 = Ti.UI.createLabel({						
						left:0, top:0,
						width:Ti.UI.SIZE, height: Ti.UI.SIZE,
						font: { fontSize: 18, fontFamily: settings.get_font( 'GR-Bold' ) },
						text: 'Step 2: ',
						textAlign: 'left',
						color: settings.get_color( 'brown' )					
					});
					step_2_container.add( step_2 );
					/*
					var step_2_text_1 = Ti.UI.createLabel({						
						left:0, top:2,
						width:Ti.UI.SIZE, height: Ti.UI.SIZE,
						font: { fontSize: 14, fontFamily: settings.get_font( 'G-Book' ) },
						text: 'Enter percentage variation',
						textAlign: 'left',
						color: settings.get_color( 'brown' )					
					});
					step_2_container.add( step_2_text_1 );
					*/
					var step_2_text_2 = Ti.UI.createLabel({						
						left:0, top:2,
						width: '100%', height: Ti.UI.SIZE,
						font: { fontSize: 14, fontFamily: settings.get_font( 'G-Book' ) },
						text: 'Enter percentage variation',
						textAlign: 'left',
						color: settings.get_color( 'brown' )					
					});
					step_2_container.add( step_2_text_2 );
				
				var percentage_container = Ti.UI.createView({						
					left: 0, top: 20,
					width:Ti.UI.FILL, height: Ti.UI.SIZE,
					layout: 'horizontal'				
				});
				left_container.add( percentage_container );
				
					var percentage_textfield = Ti.UI.createTextField ({						
						left: 0, top: 0,
						width: 200, height: 42,
						backgroundColor: 'white',
						borderColor: '#c1c1c1',
						borderWidth: 1,
						value: 10,
						textAlign: 'center',
						font: { fontSize: 30, fontFamily: settings.get_font( 'GR-Bold' ) },
						color: '#69c083'			
					});
					percentage_container.add( percentage_textfield );
					percentage_textfield.addEventListener( 'change', function( e ) {
						data_store.tornando_percentage = e.source.value;	
					});
					
					var precentage_sign = Ti.UI.createLabel({						
						left:0, top:0,
						width: Ti.UI.FILL, height: 42,
						font: { fontSize: 27, fontFamily: settings.get_font( 'G-Book' ) },
						text: '%',
						textAlign: 'center',
						color: settings.get_color( 'brown' )					
					});
					percentage_container.add( precentage_sign );
				
			var right_container = Ti.UI.createView({
				left: 340, top: 27,
				width: 535,
				height: Ti.UI.FILL,
				layout: 'vertical'
			});
			main_container.add( right_container );
				
				var step_3_container = Ti.UI.createView({						
					left: 0, top: 0,
					width:Ti.UI.FILL, height: Ti.UI.SIZE,
					layout: 'horizontal'				
				});
				right_container.add( step_3_container );
				
					var step_3 = Ti.UI.createLabel({						
						left:0, top:0,
						width:Ti.UI.SIZE, height: Ti.UI.SIZE,
						font: { fontSize: 18, fontFamily: settings.get_font( 'GR-Bold' ) },
						text: 'Step 3: ',
						textAlign: 'left',
						color: settings.get_color( 'brown' )					
					});
					step_3_container.add( step_3 );
					
					var step_3_text = Ti.UI.createLabel({						
						left:0, top:2,
						width:Ti.UI.SIZE, height: Ti.UI.SIZE,
						font: { fontSize: 14, fontFamily: settings.get_font( 'G-Book' ) },
						text: 'Select inputs to include in OWSA (select all that apply)',
						textAlign: 'left',
						color: settings.get_color( 'brown' )					
					});
					step_3_container.add( step_3_text );	

				var option_group = create_option_group();
				right_container.add( option_group );
	
		var proceed_button = button_class.create_proceed( '      Generate Tornado', 'includes/images/tornando_icon.png' );
			proceed_button.bottom = 20;
			proceed_button.status = 1;
		self.container.add( proceed_button );
		proceed_button.addEventListener( 'click', proceed_button_clicked );
		
////////////////////////////////////////////////////
//FUNCTIONS
////////////////////////////////////////////////////
	
	function create_select_group () {
		
		var container = Ti.UI.createView({						
			left:0, top: 18,
			width:Ti.UI.FILL, height: Ti.UI.SIZE,
			layout: 'vertical'				
		});
		
		var array = [
			{ id: 1, title:"Annual cost \n- market including Basaglar" },
			{ id: 2, title:"Annual cost \n- alternative market" },
			{ id: 3, title:"Expected annual\nbudget impact" },
			{ id: 4, title:"Cumulative\nbudget impact" }			
		];

/*		var array = [
			{ id: 1, title:"Cumulative cost\n(competitors only)" },
			{ id: 2, title:"Cumulative cost\n(BASAGLAR™)" },
			{ id: 3, title:"Cumulative\nbudget impact" },
			{ id: 4, title:"Budget impact" }			
		];
*/
		
		var select_group_array = new Array();
		
		for ( var i=0; i<array.length; i++ ) {
			
			var temp = Ti.UI.createLabel({						
				left: 0, top: 0,
				width:Ti.UI.FILL, height: 80,
				font: { fontSize: 18, fontFamily: settings.get_font( 'GR-Bold' ) },
				color: 'white',	
				textAlign: 'center',	   
				text: array[ i ].title,
				id: array[ i ].id, 
				backgroundColor: '#69c083',
				borderColor: '#76cc90', 
				borderWidth: 6,
				active: false				
			});
			container.add( temp );
			select_group_array.push( temp );
			temp.addEventListener( 'click', change_state );
			
			if ( i > 0 ) temp.top = 2;
		}
		
		function change_state ( e ) {
			
			var obj = e.source;
			
			if ( !obj.active ) {
				for (var i = 0; i<select_group_array.length; i++) {				
					select_group_array[i].backgroundColor = '#69c083';
					select_group_array[i].borderColor = '#76cc90';
					select_group_array[i].borderWidth = 6;
					select_group_array[i].active = false;				
					select_group_array[i].color = settings.get_color( 'white' );
				}
				
				obj.backgroundColor = settings.get_color( 'white' );
				obj.borderColor = '#e1e1e1';
				obj.color = settings.get_color( 'brown' );
				obj.active = true;
				
				data_store.tornando_outcome = obj.id;
			}
							
		}
		
		change_state( { source:select_group_array[ 0 ] } );
	
		return container;
		
	};
	
	function create_option_group () {
		
		var container = Ti.UI.createView({						
			left:0, top: 18,
			width:Ti.UI.FILL, height: Ti.UI.SIZE,
			layout: 'vertical'				
		});
		
		var array = [
			{ id: 1, base_row: 10, base_col: 3, edit_col: 2,  title:"% of population with diabetes" },
			{ id: 2, base_row: 11, base_col: 3, edit_col: 2, title:"% of patients with T1DM" },
			{ id: 3, base_row: 12, base_col: 3, edit_col: 2, title:"% of patients with T2DM" },
			{ id: 4, base_row: 34, base_col: 3, edit_col: 2, title:"% of patients treated with basal/long-acting insulin glargine: T1DM" },
			{ id: 5, base_row: 35, base_col: 3, edit_col: 2, title:"% of basal insulin market who are new initiators (eligible market): T1DM" },	
			{ id: 6, base_row: 60, base_col: 3, edit_col: 2, title:"% of patients treated with basal/long-acting insulin glargine: T2DM" },	
			{ id: 7, base_row: 61, base_col: 3, edit_col: 2, title:"% of basal insulin market who are new initiators (eligible market): T2DM" },	
			{ id: 8, base_row: 108, base_col: 5, edit_col: 4, title:"Cost of pen: Lantus® cost/day" },	
			{ id: 9, base_row: 112, base_col: 5, edit_col: 4, title:"Cost of pen: Basaglar™ cost/day" },	
			{ id: 10, base_row: 117, base_col: 5, edit_col: 4, title:"Cost of cartridge: Lantus® cost/day" },	
			{ id: 11, base_row: 121, base_col: 5, edit_col: 4, title:"Cost of cartridge: Basaglar™ cost/day" }
		];
		
		option_group_array = new Array();
		
		var row_height = 30;
		
		for ( var i=0; i<array.length; i++ ) {
			
			var temp = Ti.UI.createView({						
				left:0, top: 0,
				width: Ti.UI.FILL, height: row_height,
				backgroundColor: 'white',
				title: array[ i ].title,
				id: array[ i ].id,
				base_row: array[ i ].base_row,
				base_col: array[ i ].base_col,
				edit_col: array[ i ].edit_col,
				active: true				
			});
			container.add( temp );	
			
				var icon = Ti.UI.createView({
					left: 0, top: 0,
					width: row_height, height: row_height, backgroundImage: 'includes/images/tick.png',
					backgroundColor: settings.get_color( 'white' ),
					borderColor: '#e1e1e1',
					borderWidth: 6
				
				});
				temp.add( icon );
				
				var text = Ti.UI.createLabel({						
					left: 45, top: 0,
					width: Ti.UI.FILL, height: row_height,
					font: { fontSize: 13, fontFamily: settings.get_font( 'GR-Bold' ) },
					color: settings.get_color( 'brown' ),	
					textAlign: 'left',	   
					text: array[ i ].title				
				});
				temp.add( text );
				
				var hit_area = Ti.UI.createView({
					left: 0, top: 0,
					width: '100%', height: '100%',
					container: temp
				});
				temp.add( hit_area );
				
				temp.icon = icon;
				temp.hit_area = hit_area;			
				
			option_group_array.push( temp );
			hit_area.addEventListener( 'click', option_change_state );
			
			if ( i > 0 ) temp.top = 5;
			
			option_change_state( { source: hit_area } );
			
		}
		
		function option_change_state ( e ) {
			
			var obj = e.source.container;

			if ( obj.active ) {
						
				obj.icon.backgroundColor = '#69c083';
				obj.icon.borderColor = '#76cc90';
				obj.icon.borderWidth = 6;
				obj.icon.backgroundImage = '';
				obj.active = false;	
							
			} else {
				
				obj.icon.backgroundColor = settings.get_color( 'white' );
				obj.icon.borderColor = '#e1e1e1';
				obj.icon.backgroundImage = 'includes/images/tick.png';
				obj.active = true;	
				
			}
									
		}
		
		//option_change_state( { source:option_group_array[ 0 ].hit_area } );
	
		return container;
		
	};
	
	function graph_area_toggle ( bool ) {
		
		if ( bool ) {
			
			//var html = '<body style="background-color:#EEEEEE" ></body>';
			var html = graphs.get_tornando_graph_html( option_group_array );
			
			print( html );
			var file = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'tornado.html');
			file.write(html);
			
			graph_area = Ti.UI.createWebView({
				left: 50, top: 27, right: 50, bottom: 50,
				width: '100%',
				height: '100%',
				//width: 700,
				//height: 500,
				backgroundColor: '#EEEEEE',
				html: html,
				disableBounce: true
			});
			main_container.add( graph_area );
			
			setTimeout( function() {						
				leavepiece_html_class.save_image( graph_area, "tornado" );						
			}, settings.graph_save_speed - 1000 );
			
			graph_area.height = main_container.height - graph_area.top - graph_area.bottom;
			graph_area.width = main_container.width - graph_area.left - graph_area.right;
			
		} else {
			
			main_container.remove( graph_area );
			graph_area = null;
			
		}
		
	}
	
	
	function proceed_button_clicked ( e ) {
		
		var obj = e.source;
		
		if ( obj.status == 1 ) {
			if ( check_if_selected() ) {
				obj.status = 2;
				obj.title = '      Edit Tornado';
				graph_area_toggle( true );
			} else {
				no_selection_made();
			}
		} else {
			obj.status = 1;
			graph_area_toggle( false );
			obj.title = '      Generate Tornado';
		}
	
	};
	
	function check_if_selected () {
		
		for ( var i=0; i< option_group_array.length; i++ ) {
			
			if ( option_group_array[ i ].active ) return true;
			
		}
		
		return false;
		
	};
	
	function no_selection_made () {
		
		var dialog = Ti.UI.createAlertDialog({
			title: 'No selection made',
		    message: 'Please make a selection and try again.',
		    ok: 'Continue',
		    buttonNames: [ 'Continue' ]
		});
		dialog.show();
			
	};
	
	
////////////////////////////////////////////////////
//RUN FUNCTIONS
////////////////////////////////////////////////////


	
	return self;
	
}

module.exports = this_class;