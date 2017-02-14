function this_class(  ) {



////////////////////////////////////////////////////
//VARS
////////////////////////////////////////////////////
	
	var self = Ti.UI.createWindow( { width: 1024, height:768, zIndex:0, fullscreen:true, navBarHidden:true, backgroundColor: settings.get_color( 'brown' ), window_id:"Appendix" } );
	
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
				height: 95,
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
						left:195, top:26,
						width:780, height:60,
						font: { fontSize: 30, fontFamily: settings.get_font( 'GR-Bold' ) },
						text: 'Appendix – starting insulin therapy \nin patients with type 2 diabetes'.toUpperCase(),
						color: settings.get_color( 'brown' ),
						verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_TOP					
					});
					header_banner_container.add( header_label );			
		
		//MAIN
			
		var main_container = Ti.UI.createScrollView({
			width: 912,
			height: Ti.UI.FILL,
			left:56,
			top:160,
			backgroundColor: settings.get_color( 'white' ),
			layout: 'vertical'
		});
		self.container.add( main_container );
/*			
			var label = Ti.UI.createLabel({
				left: 0, top: 0,
				font: { fontSize: 17, fontFamily: settings.get_font( 'GR-Book' ) },
				text: 'Begin NPH at bedtime or twice daily according to need.',
				color: settings.get_color( 'brown' ),
				verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_TOP,
			});
			main_container.add( label);

*/
			////////////////////////////////////////////////////
			//BOXES
			////////////////////////////////////////////////////
				
			var labels1 = [
								'Consider switching to a',
								'long-acting insulin \nanalogue',
								'(insulin detemir, insulin glargine) from NPH insulin if the person:',
								'Begin NPH',
								'at bedtime or twice daily according to need.'
							];
			
			var labels2 = [
								'Alternatively, consider ',
								'long-acting insulin\nanalogue if'
							];
			
			var labels3 = [
								'Consider twice-daily ',
								'biphasic human\ninsulin (pre-mixed)',
								'(particularly if HbA1c ≥ \,75 mmol/mol (9.0%))'
							];
			
			var labels4 = [
								'Consider ',
								'Pre-mixed short \nacting insulin \nanalogues,',
								'rather than pre-mixed short acting human insulin if:'
							];

			var bullets1 = [
								'does not reach target\nHbA1c because of\nhypoglycaemia, or',
								'has significant\nhypoglycaemia with NPH\ninsulin irrespective of\nHbA1c level, or',
								'cannot use the delivery\ndevice for NPH insulin but\ncould administer a\nlong-acting insulin\nanalogue, or',
								'needs help to inject insulin\nand could reduce the\nnumber of daily injections\nwith a long-acting\nanalogue.'
							];
			
			var bullets2 = [
								'the person needs help with\ninjecting insulin and a\nlong-acting insulin\nanalogue would reduce\ninjections from twice to\nonce daily, or',
								'the person’s lifestyle is\nrestricted by recurrent\nsymptomatic\nhypoglycaemic episodes,\nor',
								'the person would\notherwise need twice-daily\nNPH insulin injections plus\noral glucose lowering\ndrugs, or',
								'the person cannot use the\ndevice to inject NPH\ninsulin.'
							];
			
			var bullets3 = [
								'A once-daily regimen may\nbe an option.'
							];
			
			var bullets4 = [
								'immediate injection before\na meal is preferred, or',
								'hypoglycaemia is a\nproblem, or',
								'blood glucose levels rise\nmarkedly after meals.'
							];
			
			var boxes = [
							{color: '#b83d88', labels: labels1, bullets: bullets1 },
							{color: '#39b0bd', labels: labels2, bullets: bullets2 },
							{color: '#d19c07', labels: labels3, bullets: bullets3 },
							{color: '#9ca123', labels: labels4, bullets: bullets4 }
						];
			
			var first_box = Ti.UI.createView({
				width: 220, height: 77,
				left: 55, top: 160,
				borderRadius: 5,
				backgroundColor: boxes[0].color,
				layout: 'vertical'
			});
			self.add( first_box );
				
				var special_label1 = Ti.UI.createLabel({
					left: 0, top: 8,
					font: { fontSize: 25, fontFamily: settings.get_font( 'GR-Bold' ) },
					text: boxes[0].labels[3],
					color: settings.get_color( 'white' ),
					width: '100%', textAlign: 'center'
				});
				first_box.add( special_label1 );
				
				var special_label2 = Ti.UI.createLabel({
					left: 0, top: 5,
					font: { fontSize: 15, fontFamily: settings.get_font( 'GR-Book' ) },
					text: boxes[0].labels[4],
					color: settings.get_color( 'white' ),
					width: '100%', textAlign: 'center'
				});
				first_box.add( special_label2 );
				
			var first_box_arrow = Ti.UI.createView({
				width: 26, height: 28,
				left: 150, top: 238,
				backgroundImage: 'includes/images/appendix_arrow.png'
			});
			self.add( first_box_arrow );
			
			var box_view = Ti.UI.createView({
				width: Ti.UI.FULL, height: Ti.UI.SIZE,
				top: 0, left: 0, 
				layout: 'horizontal'
			});
			main_container.add( box_view );
			
			for(var i = 0, x = boxes.length; i < x; i++) {
				var box = Ti.UI.createView({
					width: 220, height: 435,
					left: (i == 0 ? 0 : 10), top: 0,
					borderRadius: 5,
					backgroundColor: boxes[i].color,
					layout: 'vertical'
				});
				if ( i == 0 ) {
					box.top = 108; 
				} else {
					box.height = 543; 
				}
				var box_label1 = Ti.UI.createLabel({
					left: 20, top: 20,
					font: { fontSize: 15, fontFamily: settings.get_font( 'GR-Book' ) },
					text: boxes[i].labels[0],
					color: settings.get_color( 'white' ),
				});
				box.add( box_label1 );
				
				var box_label2 = Ti.UI.createLabel({
					left: 20, top: 5,
					font: { fontSize: 17, fontFamily: settings.get_font( 'GR-Bold' ) },
					text: boxes[i].labels[1],
					color: settings.get_color( 'white' ),
				});
				box.add( box_label2 );
				
				if(boxes[i].labels[2]) {
					var box_label3 = Ti.UI.createLabel({
						left: 20, top: 20,
						font: { fontSize: 10, fontFamily: settings.get_font( 'GR-Book' ) },
						text: boxes[i].labels[2],
						color: settings.get_color( 'white' )
					});
					box.add( box_label3 );
				}
				
				for(var j = 0; j < boxes[i].bullets.length; j++) {
					var bullet_view = Ti.UI.createView({
						width:190, height: Titanium.UI.SIZE,
						top: 20
					});
						var bullet_image = Ti.UI.createImageView({
							width: 8, height: 12,
							left: 0, top: 0,
							image: 'includes/images/arrow_white.png'
						});
						var bullet = Ti.UI.createLabel({
							left: 20, top: 0,
							width: 170,
							font: { fontSize: 12, fontFamily: settings.get_font( 'GR-Book' ) },
							text: boxes[i].bullets[j],
							color: settings.get_color( 'white' )
						});
						bullet_view.add( bullet_image );
						bullet_view.add( bullet );
						box.add( bullet_view );
				}

				box_view.add( box );
			}
			
			var bottom_view = Ti.UI.createView({
				layout: 'vertical',
				top: 10, left: 0,
				width: Ti.UI.SIZE, height: Ti.UI.SIZE
			});
		
				var bottom_label_view = Ti.UI.createView({
					layout: 'horizontal',
					top: 0, left: 0,
					width: Ti.UI.SIZE, height: Ti.UI.SIZE
				});
					
				var label1 = Ti.UI.createLabel({
					left: 0, top: 0,
					width: Ti.UI.SIZE, height: Ti.UI.SIZE,
					font: { fontSize: 12, fontFamily: settings.get_font( 'GR-Book' ) },
					text: 'Flowchart developed based on NICE CG87 Type 2 diabetes',
					color: settings.get_color( 'brown' ),
					verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_TOP
				});
				var label2 = Ti.UI.createLabel({
					left: 0, top: -4,
					width: Ti.UI.SIZE, height: Ti.UI.SIZE,
					font: { fontSize: 12, fontFamily: settings.get_font( 'GR-Book' ) },
					text: '1',
					color: settings.get_color( 'brown' ),
					verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_TOP
				});
				bottom_label_view.add( label1, label2 );
				bottom_view.add( bottom_label_view );
			
					
				var bottom_label_view = Ti.UI.createView({
					layout: 'horizontal',
					top: 5, left: 0,
					width: Ti.UI.SIZE, height: Ti.UI.SIZE
				});
				
				var label1 = Ti.UI.createLabel({
					left: 0, top: 0,
					width: Ti.UI.SIZE, height: Ti.UI.SIZE,
					font: { fontSize: 10, fontFamily: settings.get_font( 'GR-Book' ) },
					text: '1. National Institute for Health and Care Excellence. ',
					color: settings.get_color( 'brown' )
				});
				var label2 = Ti.UI.createLabel({
					left: 0, top: 0,
					width: Ti.UI.SIZE, height: Ti.UI.SIZE,
					font: { fontSize: 10, fontFamily: settings.get_font( 'GR-Bold' ) },
					text: 'Type 2 diabetes. The management of type 2 diabetes. CG87. ',
					color: '#69c083'
				});
				var label3 = Ti.UI.createLabel({
					left: 0, top: 0,
					width: Ti.UI.SIZE, height: Ti.UI.SIZE,
					font: { fontSize: 10, fontFamily: settings.get_font( 'GR-Book' ) },
					text: 'London: NICE; 2009. Accessed February 2015',
					color: settings.get_color( 'brown' )
				});
				bottom_label_view.add( label1, label2, label3 );
				bottom_view.add( bottom_label_view );

				main_container.add( bottom_view );
/*				
			var button = Ti.UI.createButton({
				bottom: 0, right: 0,
				width: 128, height: 48,
				backgroundColor: '#69c083',
				borderColor: '#76cc90', 
				borderWidth: 6
			});
			var button_top_line = Ti.UI.createLabel({
				font: { fontSize: 12, fontFamily: settings.get_font( 'GR-Medium' ) },
				color: settings.get_color( 'white' ),
				text: 'PRESCRIBING',
				top: 11
			});
			var button_bottom_line = Ti.UI.createLabel({
				font: { fontSize: 12, fontFamily: settings.get_font( 'GR-Medium' ) },
				color: settings.get_color( 'white' ),
				text: 'INFORMATION',
				bottom: 11
			});
			button.add(button_top_line, button_bottom_line);
			self.container.add( button );
			button.addEventListener( 'click', button_clicked );	

*/		
					
////////////////////////////////////////////////////
//FUNCTIONS
////////////////////////////////////////////////////
	function button_clicked () {
		screen_controller.switch_screen_state_function( 'Prescribing Information' );
	};


////////////////////////////////////////////////////
//RUN FUNCTIONS
////////////////////////////////////////////////////
	
	return self;
	
}

module.exports = this_class;