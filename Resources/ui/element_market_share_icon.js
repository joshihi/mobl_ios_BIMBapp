function this_class( percentage ) {



////////////////////////////////////////////////////
//VARS
////////////////////////////////////////////////////
	
	var color_1 = '#aba714';
	var color_2 = '#b83d88';
	
	var image_path = 'includes/images/market_share_icons.png';
	
	var self = Ti.UI.createView( { 
		width: '20%', height: Ti.UI.SIZE, layout: 'vertical'
	});
	
////////////////////////////////////////////////////
//UI
////////////////////////////////////////////////////
		
		var container = Ti.UI.createView( { 
			width: 58, height: 47
		});
		self.add( container );
			
			var bg = Ti.UI.createView({
				left: 0,
				width: '100%',
				height: '100%',
				backgroundColor: color_1
			});
			container.add( bg );
				
			var market_share_bar = Ti.UI.createView({
				left: 0,
				width: percentage + '%',
				height: '100%',
				bottom: 0,
				backgroundColor: color_2
			});
			container.add( market_share_bar );
					
			var icon = Ti.UI.createImageView({
				left: 0,
				width: '100%', height: '100%',
				image: image_path
			});
			container.add( icon );
	
				var label_container = Ti.UI.createView({
					top: 0,
					width: 58,
					height: Ti.UI.SIZE, layout: 'horizontal'
				});
				icon.add( label_container );
		
					var label = Ti.UI.createLabel({						
						top: 0, left:0, //right: 22,
						width: Ti.UI.SIZE, height: Ti.UI.SIZE,
						font: { fontSize: 20, fontFamily: settings.get_font( 'GR-Bold' ) },
						text: percentage,
						color: settings.get_color( 'pink' ),
						textAlign: 'right'					
					});
					label_container.add( label );					
					
					var per_label = Ti.UI.createLabel({						
						left: 0, top: 0,
						width: Ti.UI.SIZE, height: Ti.UI.SIZE,
						font: { fontSize: 18, fontFamily: settings.get_font( 'GR-Book' ) },
						text: '%',
						color: settings.get_color( 'pink' ),
						textAlign: 'right'					
					});
					label_container.add( per_label );
					
					if ( percentage.length > 3 ) {
						label.font = { fontSize: 18, fontFamily: settings.get_font( 'GR-Bold' ) };
						per_label.font = { fontSize: 16, fontFamily: settings.get_font( 'GR-Book' ) };
					}
					if ( percentage.length > 4 ) {
						label.font = { fontSize: 16, fontFamily: settings.get_font( 'GR-Bold' ) };
						per_label.font = { fontSize: 14, fontFamily: settings.get_font( 'GR-Book' ) };
					}
					if ( percentage.length > 5 ) {
						label.font = { fontSize: 14, fontFamily: settings.get_font( 'GR-Bold' ) };
						per_label.font = { fontSize: 12, fontFamily: settings.get_font( 'GR-Book' ) };
					}
					
					
////////////////////////////////////////////////////
//RUN FUNCTIONS
////////////////////////////////////////////////////

	
	return self;
	
}

module.exports = this_class;