

////////////////////////////////////////////////////
//VARS
////////////////////////////////////////////////////
	
	var labels_array = new Array();
	
////////////////////////////////////////////////////
//UI
////////////////////////////////////////////////////

		
		
////////////////////////////////////////////////////
//FUNCTIONS
////////////////////////////////////////////////////
	
	exports.get_table = function ( array, table_title, value_type, type ) {
		
		var padding = 10;
		var table_width = 655;
		
		if ( type == 'small' ) {
			padding = 5;
			table_width = 210;
		}
		
		var table = Ti.UI.createView({
			left: 0, top: 0,
			width: Ti.UI.SIZE, height: Ti.UI.SIZE,		
			layout: 'vertical'
		});
		
		if ( table_title != '' ) {
			var title = Ti.UI.createLabel({
				top: 10, right: 10, bottom: 10,
				width: Ti.UI.SIZE, height: Ti.UI.SIZE,
				font: { fontSize: 24, fontFamily: settings.get_font( 'GR-Bold' ) },
				color: settings.get_color( 'brown' ),
				text: table_title,
				textAlign: 'right',
				zIndex: 10
			});
			
			if ( type == 'small' ) {
				width = 210;
				height = 145;
				top = 15;
				title.left = 10;
				title.top = 10;	
				title.bottom = 10;	
				title.font = { fontSize: 12, fontFamily: settings.get_font( 'GR-Bold' ) };
				title.textAlign = 'left';
			}
			
			table.add( title );
		}
		
		var table_container = Ti.UI.createView({
			left: 0, top: 35,
			width: Ti.UI.SIZE, height: Ti.UI.SIZE,
			layout: 'vertical',	
			//borderRadius: 20,
			backgroundColor: '#eeeeee',
		});
		table.add( table_container );
		
		var row_array = exports.get_row( array, value_type, type );
		
		var table_view = Ti.UI.createTableView({
		    left: padding, top: padding, right: padding, bottom: padding,
		    width: table_width-padding, height: Ti.UI.SIZE,
			separatorStyle:Ti.UI.iPhone.TableViewSeparatorStyle.NONE,
			backgroundColor: 'transparent'
		});
		table_container.add( table_view );
		table_view.setData( row_array );
		
		if ( type == 'market_scenario' ) {
			table_view.width = '100%';
		}
		
		return table;

	};
		
	exports.get_row = function ( array, value_type, type ) {
		
		var row_height = 60; 
		
		var row_array = new Array();
		
		var cell_width = (79/5) + '%';
		
		var label_size = 14;
		var value_size = 14;
		if ( type == 'market_scenario' ) {
			label_size = 10;
			value_size = 10;
		}
		
		for ( var i=0; i<array.length; i++ ) {
					
			var row = Ti.UI.createTableViewRow({
				left: 0, right: 0, top: 0, 
				width: Ti.UI.FILL, height: row_height,			
		       	selectedColor:'transparent',
		       	selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE
			});
			
				var container = Ti.UI.createView({
					right: 10, top: 0, 
					width: Ti.UI.FILL, height: Ti.UI.FILL,
					layout: 'horizontal'
				});
				row.add( container );
				
					var title_cell = Ti.UI.createLabel({
						left: 0, top: 0, 
						width: '20%', height: row_height
					});
					container.add( title_cell );
						
						var title_cell_label = Ti.UI.createLabel({
							left: 5, top: 5, right: 5, bottom: 5, 
							width: Ti.UI.FILL, height: Ti.UI.FILL,
							font: { fontSize: label_size, fontFamily: settings.get_font( 'GR-Bold' ) },
							color: settings.get_color( 'brown' ),
							text: array[i].title,
							textAlign: 'right'
						});
						title_cell.add( title_cell_label );
					
					for ( var k=0; k<array[i].data.length; k++ ) {
						
						var cell = Ti.UI.createView({
							left: 0, top: 0, 
							width: cell_width, height: row_height
						});
						container.add( cell );
							
							if ( array[i].data[k].row ) {
								var value = engine.get_value( array[i].data[k].row, array[i].data[k].col );
								if ( array[i].data[k].type == 'abs' ) value = Math.abs( value );
								value = with_commas( Math.round( value ) );  	
							} else {
								var value = with_commas( Math.round( array[i].data[k] ) );
							}
							
							var cell_label = Ti.UI.createLabel({
								top: 5, bottom: 5, 
								width: Ti.UI.FILL, height: Ti.UI.FILL,
								font: { fontSize: value_size, fontFamily: settings.get_font( 'Gotham-Book' ) },
								color: settings.get_color( 'brown' ),
								backgroundColor: '#c5c5c5',
								text: value,
								textAlign: 'center'
							});
							cell.add( cell_label );
							if ( array[i].data[k].row ) {
								cell_label.row = array[i].data[k].row;
								cell_label.col = array[i].data[k].col;
								cell_label.type = array[i].data[k].type; 
								labels_array.push( cell_label );	
							}
														
							if ( array[i].title == 'Years' ) {
								cell_label.text = array[i].data[k];
								cell_label.font = { fontSize: value_size, fontFamily: settings.get_font( 'GR-Bold' ) }; 
								cell_label.backgroundColor = 'transparent';
							}
							if ( value_type == '%' && array[i].title != 'Years' ) {
								cell_label.text = array[i].data[k]+'%';
							}
							
							
					}
		
			row_array.push( row );
				
		}
		
		Ti.App.addEventListener( 'engine_refresh', function() {
			update_from_engine( ); 
		});
		
		return row_array;
		
	};
	
	function update_from_engine ( e ) {
		
		for ( var i=0; i<labels_array.length; i++ ) {
			
			var obj =labels_array[i];
			
			if ( obj.type == 'abs' ) {
				obj.text = with_commas( Math.round( Math.abs( engine.get_value( obj.row, obj.col ) ) ) );			
			} else {
				obj.text = with_commas( Math.round( engine.get_value( obj.row, obj.col ) ) );					
			}
			
		}
		
	};
		
	
////////////////////////////////////////////////////
//RUN FUNCTIONS
////////////////////////////////////////////////////
	