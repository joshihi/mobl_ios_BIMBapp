function this_class() {

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	
////////////////////////////////////////////////////
//VARS
////////////////////////////////////////////////////
	var self = {};


//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

////////////////////////////////////////////////////
//FUNCTIONS
////////////////////////////////////////////////////
	self.create_webview = function ( ) {
			var webview = Ti.UI.createWebView({
			width: "100%", height: "100%",		
			backgroundColor: "transparent", disableBounce: true, touchEnabled: false			
		});	
		return webview;	
	};
	
	self.create_label = function ( ) {	
		var label = Ti.UI.createLabel({
			width: "100%", height: "100%",
			textAlign: 'center'						
		});	
		return label;	
	};
	
	
	self.create_hit_area = function  () {
		var hit_area = Ti.UI.createView({
			width: "100%", height: "100%", zIndex: 8000
		});
		
		return hit_area;
	};
	
	self.create_cross = function () {
		
		var cross_icon = Ti.UI.createView({
			right: 0, top: 0,
			width: 60, height: 60, backgroundImage: 'includes/images/x.png',
			backgroundColor: '#63b67c',
			borderColor: '#69c083', borderWidth: 6
		});
		cross_icon.addEventListener( 'click', layers.remove_layer_function );	
		
		return cross_icon;
		
	};
	
	self.create_blue_cross = function () {
		
		var cross_icon = Ti.UI.createView({
			right: 0, top: 0,
			width: 60, height: 60, backgroundImage: 'includes/images/x.png',
			backgroundColor: '#63b67c',
			borderColor: '#69c083',
			borderWidth: 6
		});
		cross_icon.addEventListener( 'click', layers.remove_layer_function );	
		
		return cross_icon;
		
	};
	
	self.create_blue_table_icon = function () {
		
		var table_icon = Ti.UI.createView({
			right: 0, top: 0,
			width: 46, height: 46, backgroundImage: 'includes/images/icon_table.png',
			backgroundColor: '#76cc90', // '#4597cb',
			borderColor: '#76cc90',
			borderWidth: 6,
			// zIndex: 2000000,
		});	
		
		return table_icon;
		
	};
	self.line_height_label_function = function ( parent, copy, line_spacing, left, top, width, height, font, font_size, text_align ) {	

		var copy_array = copy.split("\n"); 
		
		for ( var i=0; i<copy_array.length; i++ ) {
			var temp_label = Ti.UI.createLabel({
				left: left, top: top+(i*line_spacing),
				width: width, height: height,
				font: { fontFamily: font, fontSize: font_size },
				textAlign: text_align,
				color: settings.get_color( 'white' ),
				text:copy_array[i]						
			});		
			parent.add( temp_label );
		}			
	};
	
	self.create_top_bar = function () {
		
		var top_nav_bar = Ti.UI.createView({
			top:0,
			width: device_width, height: 55,		
			backgroundColor: settings.get_color( 'purple' )
		});
			
			var text_container = Ti.UI.createView({
				left: 82, top:0,
				width: device_width, height: '100%',
				layout: 'horizontal'		
			});
			top_nav_bar.add( text_container );
			
				var title_label = Ti.UI.createLabel({
					left: 0,
					width: Ti.UI.SIZE, height: "100%",
					font: { fontFamily: settings.get_font( 'GR-Bold' ), fontSize:30 },
					color: settings.get_color( 'white' ),
					textAlign: 'center',
					text: json_data.top_bar.title			
				});	
				text_container.add( title_label );
				
				var left_title_label = Ti.UI.createLabel({
					left: 10, top: 17,
					width: 235, height: 19,
					font: { fontFamily: settings.get_font( 'GR-Book' ), fontSize:18 },
					color: settings.get_color( 'white' ),				
					textAlign: 'left',
					text: json_data.top_bar.left_title_text			
				});	
				text_container.add( left_title_label );
		
			var menu_icon = Ti.UI.createView({
				left: 15,
				width: 33, height: 27,		
				backgroundImage: 'includes/images/menu_icon.png'
			});
			top_nav_bar.add( menu_icon );
			
			var menu_hit_area = Ti.UI.createView({
				left: 0, top:0,
				width: 70, height: '100%',
				layout: 'horizontal'	
			});
			top_nav_bar.add( menu_hit_area );
			menu_hit_area.addEventListener( 'click', menu_icon_clicked );
			
			
			var current_screen = screen_controller.get_current_screen_id();
			if ( current_screen != 'Data Inputs' && current_screen != 'Budget Impact' && current_screen != 'Report' && current_screen != 'Prescribing Information' && current_screen != 'Appendix'  && current_screen != 'References' ) {
			
				var skip_button_container = Ti.UI.createLabel({
					right: -1, top: -1,
					width: 184, height: 57,
					borderColor: 'white'				
				});	
				top_nav_bar.add( skip_button_container );
					
					var skip_icon = Ti.UI.createView({
						left: 13,
						width: 25, height: 25,		
						backgroundImage: 'includes/images/skip_icon.png'
					});
					skip_button_container.add( skip_icon );
					
					var skip_title = Ti.UI.createLabel({
						left: 32,
						width: Ti.UI.FILL, height: "100%",
						font: { fontFamily: settings.get_font( 'GR-Medium' ), fontSize: 14 },
						color: settings.get_color( 'white' ),
						textAlign: 'center',
						text: 'Skip to data input'						
					});	
					skip_button_container.add( skip_title );
					skip_button_container.addEventListener( 'click', skip_clicked );
			
			}
			
		return top_nav_bar;
		
	};
	
	function skip_clicked () {
		
		var temp_class = require( 'ui/skip_overlay' );
		var temp_window = new temp_class();
		layers.add_layer_function( temp_window );
		
	};
	
	function menu_icon_clicked () {
		
		var current_window = layers.top_layer_function();
		
		if ( typeof current_window.side_menu == 'undefined') {
			current_window.container.zIndex = 10;	
			current_window.side_menu = new side_menu_class( current_window.window_id );
			current_window.add( current_window.side_menu );	
		}
		
		var menu_cover = Ti.UI.createView({
			width: '100%', height: '100%',
			bubbleParent: false
		});
		current_window.container.add( menu_cover );
		menu_cover.addEventListener( 'click', menu_cover_clicked );
			
		current_window.container.animate( { left: 184, duration:500 });
		
	};
	
	function menu_cover_clicked ( e ) {
		var object = e.source;
		var current_window = layers.top_layer_function();
		
		current_window.container.remove( object );
		object = null;
		current_window.container.animate( { left: 0, duration: 500 } );
	}

	
	return self;
}

module.exports = this_class;