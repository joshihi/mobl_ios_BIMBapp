function this_class(  ) {



////////////////////////////////////////////////////
//VARS
////////////////////////////////////////////////////
	
	var content_array = [
		{
			title: 'EMA approval',
			sub_title: 'Lilly-BI biosimilar glargine was granted marketing authorisation \n(approved trade name Abasaglar) in September 2014 and is\n indicated to treat diabetes mellitus in adults, adolescents and \nchildren aged 2 years and above¹',
//			reference:'*Lantus is the Registered Trade Mark of Sanofi\n1. European Medicines Agency: Assessment Report'	
			reference:'1. European Medicines Agency: Assessment Report'	
		},
		{
			title: 'Lilly-BI were the first to develop a Biosimilar insulin \n product approved in Europe',
			statement_one: 'New biotechnology \nproducts require market \nauthorisation from EMA to \nprove safety and efficacy',
			statement_two: 'Companies must submit \nevidence to demonstrate \nthe manufacturing \nprocess is robust \nand reproducible',
			statement_three: 'Any applications for \na variation to the \nmanufacturing process \nmust also provide \nsimilar evidence',
			statement_four: 'Manufacturing activities \nmust be performed in\ncompliance with EU Good \nManufacturing Practices'	
		},
		{
			title: 'What is a biosimilar?',
			statement_one: 'A biosimilar is a therapeutic protein molecule with an identical amino acid\nsequence to that of a previously marketed biological reference product, with \nno clinically meaningful difference in safety or efficacy¹',
			statement_two: 'The complexity of biological medicines, and their manufacture, is such that\nbiosimilar final products are similar, but not identical to reference products',
			statement_three: 'The term biosimilar is a regulatory designation used in Europe, but not \napplied universally to every country or geographic region',
			statement_four: 'If a biologic is patented, other companies are able to produce a biosimilar of \nthe biological reference product when the patent expires',
			reference:'1. European Medicines Agency. Questions and answers on biosimilar medicines:\nEuropean Medicines Agency, 2012. Accessed February 2015'	
		},
		{
			title: 'How similar is similar?',
			l_title: 'The development of biosimilars \nmust meet high regulatory standards',
			l_1: 'High similarity demonstrated in preclinical in vitro and \nin vivo PD and toxicology studies and \nphysiochemical characterization¹,²',
			l_2: 'High similarity demonstrated in clinical trials designed to \nassess PK and PD against standard acceptance limits¹,²',
			l_3: 'No clinically meaningful differences in immunogenicity²',
			l_4: 'Head-to-head clinical trial(s) to detect relevant differences in \nefficacy or drug-related safety profile²',
			r_title: 'Biosimilar insulins from a trusted source \noffer a valid therapeutic option',
			r_1: 'The complexity of a biological reference product influences \nthe complexity of manufacturing a biosimilar³',
			r_2: 'The host cell characteristics, protein stability, purification, formulation, and storage aspects of manufacturing affect biosimilars⁴⁻⁶',
			reference:'1. EMA. Guideline on Similar Biological Medicinal Products – Draft. May 22, 2013;\n2. FDA. Guidance for Industry. April 2015; \n3. Mellstedt et al. Ann Oncol 2008;19(3):411–9;\n4. Schellekens. Nat Rev Drug Discov 2002;1(6):457–62; \n5. Hermeling et al. Pharm Res 2004;21:897–903; \n6. Owens et al. Diabetes Technol Ther 2012;14(11):989–96'		
		
		},
		{
			title: 'The quality of biosimilars matters',
			statement_one: 'Similarity demonstrated through physiochemical characterisation,\n pre-clinical in vitro and in vivo PD and toxicology studies¹',
			statement_two: 'Similarity demonstrated in clinical trials designed to assess PK and PD against standard acceptance limits¹',
			statement_three: 'No clinically meaningful differences in immunogenicity¹',
			statement_four: 'Head-to-head clinical trial(s) to detect relevant differences in efficacy or drug-related safety*¹',
			reference:'*No anticipated need for efficacy studies since HbA1c is not considered sensitive enough for the purpose\nof showing biosimilarity of two insulins \n1. European Medicines Agency. Guideline on non-clinical and clinical development of similar biological \nmedicinal products containing recombinant human insulin and insulin analogues. Accessed April 2015'		
		},
			

	];

	var self = Ti.UI.createView({
		opacity: 0,
		left:0, top:85,
		width: "100%", height: 430
	});
	
////////////////////////////////////////////////////
//UI
////////////////////////////////////////////////////
	
	create_scrollable_view();
	
	function create_scrollable_view(){
		
		var slide_array = new Array();
			
		for ( var i=0;i<content_array.length;i++ ) {
			
			var temp_view = Ti.UI.createView({
				width: 750, height: 370
			});
				
				var temp_view_label = Ti.UI.createLabel({
					left:0, top:0, width: '100%', height: 75,					
					color:  settings.get_color( 'brown' ),
					text: content_array[i].title,
					font: { fontSize: 18, fontFamily: settings.get_font( 'GR-Medium' ) },
					textAlign: 'center'
				});
				temp_view.add( temp_view_label );
				
				if ( i == 0 ) temp_view.add( create_slide_one() );				
				if ( i == 1 ) temp_view.add( create_slide_two() );				
				if ( i == 2 ) temp_view.add( create_slide_three() );				
				if ( i == 3 ) temp_view.add( create_slide_five() );				
				if ( i == 4 ) temp_view.add( create_slide_four() );				
							
			slide_array.push( temp_view );
		}
		
		var scrollable_view = Ti.UI.createScrollableView({
			top:0,
			width: 750, height: 370,
			views: slide_array,
			backgroundColor: settings.get_color( 'white' )
		});
		self.add( scrollable_view );
		scrollable_view.addEventListener( 'scrollEnd', scroll_end_function );
			
			var left_arrow = Ti.UI.createView({
				left: 62, top: 160,
				width: 63, height: 48,
				direction: -1, opacity: 0,
				backgroundImage: 'includes/images/intro/left_arrow.png'
			});
			self.add( left_arrow );
			left_arrow.addEventListener( 'click', arrow_clicked );
					
			var right_arrow = Ti.UI.createView({
				right: 62, top: 160,
				width: 63, height: 48,
				direction: 1,
				backgroundImage: 'includes/images/intro/right_arrow.png'
			});
			self.add( right_arrow );
			right_arrow.addEventListener( 'click', arrow_clicked );
			
			var dot_indicator = dot_indicator_class( content_array.length );
				dot_indicator.bottom = 20;
			self.add( dot_indicator );
				
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
				
				dot_indicator.update_position( scrollable_view.currentPage );
				
			}
			
	};
	
	
	function create_slide_one () {
		
		var slide = Ti.UI.createView({
			width: Ti.UI.FILL, height:  Ti.UI.FILL
		});
			
			var sub_title = Ti.UI.createLabel({
				left:0, top:70, width: '100%', height: Ti.UI.SIZE,					
				color:  settings.get_color( 'brown' ),
				text: content_array[ 0 ].sub_title,
				font: { fontSize: 17, fontFamily: settings.get_font( 'GR-Book' ) },
				textAlign: 'center'
			});
			slide.add( sub_title );
			
			var logo = Ti.UI.createImageView({
				top: 145,
				width: 'auto', height: 'auto',
				image: 'includes/images/basaglar/logo.png',
				border: 'red'
			});
			slide.add( logo );
			
			var reference = Ti.UI.createLabel({
				left:0, bottom:32, width: '100%', height: Ti.UI.SIZE,					
				color:  settings.get_color( 'brown' ),
				text: content_array[ 0 ].reference,
				font: { fontSize: 12, fontFamily: settings.get_font( 'GR-Book' ) },
				textAlign: 'center'
			});
			slide.add( reference );
			
		return slide;
		
	};
	
	function create_slide_two () {
		
		var slide = Ti.UI.createView({
			width: Ti.UI.FILL, height:  Ti.UI.FILL
		});
			
			var i_one = Ti.UI.createImageView({
				left: 75, top: 100,
				width: 'auto', height: 'auto',
				image: 'includes/images/basaglar/i_one.png'
			});
			slide.add( i_one );
			
			var s_one = Ti.UI.createLabel({
				left: 150, top: 100, width: 210, height: Ti.UI.SIZE,					
				color:  settings.get_color( 'brown' ),
				text: content_array[ 1 ].statement_one,
				font: { fontSize: 15, fontFamily: settings.get_font( 'GR-Book' ) },
				textAlign: 'left'
			});
			slide.add( s_one );
			
			var i_two = Ti.UI.createImageView({
				left: 75, top: 230,
				width: 'auto', height: 'auto',
				image: 'includes/images/basaglar/i_two.png'
			});
			slide.add( i_two );
			
			var s_two = Ti.UI.createLabel({
				left: 150, top: 230, width: 210, height: Ti.UI.SIZE,					
				color:  settings.get_color( 'brown' ),
				text: content_array[ 1 ].statement_two,
				font: { fontSize: 15, fontFamily: settings.get_font( 'GR-Book' ) },
				textAlign: 'left'
			});
			slide.add( s_two );
			
			var i_three = Ti.UI.createImageView({
				left: 405, top: 100,
				width: 'auto', height: 'auto',
				image: 'includes/images/basaglar/i_three.png'
			});
			slide.add( i_three );
			
			var s_three = Ti.UI.createLabel({
				left: 475, top: 100, width: 210, height: Ti.UI.SIZE,					
				color:  settings.get_color( 'brown' ),
				text: content_array[ 1 ].statement_three,
				font: { fontSize: 15, fontFamily: settings.get_font( 'GR-Book' ) },
				textAlign: 'left'
			});
			slide.add( s_three );
			
			var i_four = Ti.UI.createImageView({
				left: 405, top: 230,
				width: 'auto', height: 'auto',
				image: 'includes/images/basaglar/i_four.png'
			});
			slide.add( i_four );
			
			var s_four = Ti.UI.createLabel({
				left: 475, top: 230, width: 210, height: Ti.UI.SIZE,					
				color:  settings.get_color( 'brown' ),
				text: content_array[ 1 ].statement_four,
				font: { fontSize: 15, fontFamily: settings.get_font( 'GR-Book' ) },
				textAlign: 'left'
			});
			slide.add( s_four );
		
		return slide;
		
	};
	
	function create_slide_three () {
		var slide = Ti.UI.createView({
			width: Ti.UI.FILL, height:  Ti.UI.FILL
		});
			
			var i_1 = Ti.UI.createImageView({
				left: 75, top: 70,
				width: 'auto', height: 'auto',
				image: 'includes/images/basaglar/pink_arrow.png'
			});
			slide.add( i_1 );
			
			var s_one = Ti.UI.createLabel({
				left: 95, top: 70, width: 575, height: Ti.UI.SIZE,					
				color:  settings.get_color( 'brown' ),
				text: content_array[ 2 ].statement_one,
				font: { fontSize: 15, fontFamily: settings.get_font( 'GR-Book' ) },
				textAlign: 'left'
			});
			slide.add( s_one );
			
			var i_2 = Ti.UI.createImageView({
				left: 75, top: 142,
				width: 'auto', height: 'auto',
				image: 'includes/images/basaglar/pink_arrow.png'
			});
			slide.add( i_2 );
			
			var s_two = Ti.UI.createLabel({
				left: 95, top: 142, width: 575, height: Ti.UI.SIZE,					
				color:  settings.get_color( 'brown' ),
				text: content_array[ 2 ].statement_two,
				font: { fontSize: 15, fontFamily: settings.get_font( 'GR-Book' ) },
				textAlign: 'left'
			});
			slide.add( s_two );
			
			var i_3 = Ti.UI.createImageView({
				left: 75, top: 195,
				width: 'auto', height: 'auto',
				image: 'includes/images/basaglar/pink_arrow.png'
			});
			slide.add( i_3 );
			
			var s_three = Ti.UI.createLabel({
				left: 95, top: 195, width: 575, height: Ti.UI.SIZE,					
				color:  settings.get_color( 'brown' ),
				text: content_array[ 2 ].statement_three,
				font: { fontSize: 15, fontFamily: settings.get_font( 'GR-Book' ) },
				textAlign: 'left'
			});
			slide.add( s_three );
			
			var i_4 = Ti.UI.createImageView({
				left: 75, top: 245,
				width: 'auto', height: 'auto',
				image: 'includes/images/basaglar/pink_arrow.png'
			});
			slide.add( i_4 );
			
			var s_four = Ti.UI.createLabel({
				left: 95, top: 245, width: 575, height: Ti.UI.SIZE,					
				color:  settings.get_color( 'brown' ),
				text: content_array[ 2 ].statement_four,
				font: { fontSize: 15, fontFamily: settings.get_font( 'GR-Book' ) },
				textAlign: 'left'
			});
			slide.add( s_four );
		
			var reference = Ti.UI.createLabel({
				left:0, bottom:32, width: '100%', height: Ti.UI.SIZE,					
				color:  settings.get_color( 'brown' ),
				text: content_array[ 2 ].reference,
				font: { fontSize: 12, fontFamily: settings.get_font( 'GR-Book' ) },
				textAlign: 'center'
			});
			slide.add( reference );
		
		return slide;
	};
	
	function create_slide_four () {
		
		var slide = Ti.UI.createView({
			width: Ti.UI.FILL, height:  Ti.UI.FILL
		});
			
			var l_title = Ti.UI.createLabel({
				left: 65, top: 70, width: 295, height: Ti.UI.SIZE,					
				color:  settings.get_color( 'pink' ),
				text: content_array[ 3 ].l_title,
				font: { fontSize: 12, fontFamily: settings.get_font( 'GR-Bold' ) },
				textAlign: 'left'
			});
			slide.add( l_title );
				
				var lc_1 = Ti.UI.createView({
					left: 65, top: 105, width: 295, height: Ti.UI.SIZE,
					backgroundColor:  settings.get_color( 'pink' )
				});
				slide.add( lc_1 );
					
					var attr = Ti.UI.createAttributedString({
					    text: content_array[ 3 ].l_1,
					    attributes: [
					        {
					            type: Ti.UI.ATTRIBUTE_FONT,
					            value: { fontSize: 9, fontFamily: settings.get_font( 'G-BookItalic' ) },
					            range: [ content_array[ 3 ].l_1.indexOf('in vitro'), ('in vitro').length]
					        },
					        {
					            type: Ti.UI.ATTRIBUTE_FONT,
					            value: { fontSize: 9, fontFamily: settings.get_font( 'G-BookItalic' ) },
					            range: [ content_array[ 3 ].l_1.indexOf('in vivo'), ('in vivo').length]
					        }
					   ]
					});
					
					var l_1 = Ti.UI.createLabel({
						left: 10, top: 10, right: 10, bottom: 15, width: Ti.UI.FILL, height: Ti.UI.SIZE,					
						color:  settings.get_color( 'white' ),
						//text: content_array[ 3 ].l_1,
						attributedString: attr,
						font: { fontSize: 9, fontFamily: settings.get_font( 'GR-Book' ) },
						textAlign: 'center'
					});
					lc_1.add( l_1 );
				
				var lc_2 = Ti.UI.createView({
					left: 65, top: 166, width: 295, height: Ti.UI.SIZE,
					backgroundColor:  settings.get_color( 'pink' )
				});
				slide.add( lc_2 );
				
					var l_2 = Ti.UI.createLabel({
						left: 10, top: 10, right: 10, bottom: 10, width: Ti.UI.FILL, height: Ti.UI.SIZE,					
						color:  settings.get_color( 'white' ),
						text: content_array[ 3 ].l_2,
						font: { fontSize: 9, fontFamily: settings.get_font( 'GR-Book' ) },
						textAlign: 'center'
					});
					lc_2.add( l_2 );
					
				var lc_3 = Ti.UI.createView({
					left: 65, top: 207, width: 295, height: Ti.UI.SIZE,
					backgroundColor:  settings.get_color( 'pink' )
				});
				slide.add( lc_3 );
				
					var l_3 = Ti.UI.createLabel({
						left: 10, top: 10, right: 10, bottom: 10, width: Ti.UI.FILL, height: Ti.UI.SIZE,					
						color:  settings.get_color( 'white' ),
						text: content_array[ 3 ].l_3,
						font: { fontSize: 9, fontFamily: settings.get_font( 'GR-Book' ) },
						textAlign: 'center'
					});
					lc_3.add( l_3 );
				
				var lc_4 = Ti.UI.createView({
					left: 65, top: 240, width: 295, height: Ti.UI.SIZE,
					backgroundColor:  settings.get_color( 'pink' )
				});
				slide.add( lc_4 );
				
					var l_4 = Ti.UI.createLabel({
						left: 10, top: 10, right: 10, bottom: 10, width: Ti.UI.FILL, height: Ti.UI.SIZE,					
						color:  settings.get_color( 'white' ),
						text: content_array[ 3 ].l_4,
						font: { fontSize: 9, fontFamily: settings.get_font( 'GR-Book' ) },
						textAlign: 'center'
					});
					lc_4.add( l_4 );		
			
			var r_title = Ti.UI.createLabel({
				left: 390, top: 70, width: 295, height: Ti.UI.SIZE,					
				color:  '#9ca123',
				text: content_array[ 3 ].r_title,
				font: { fontSize: 12, fontFamily: settings.get_font( 'GR-Bold' ) },
				textAlign: 'left'
			});
			slide.add( r_title );
			
				var rc_1 = Ti.UI.createView({
					left: 390, top: 105, width: 295, height: Ti.UI.SIZE,
					backgroundColor: '#9ca123'
				});
				slide.add( rc_1 );
				
					var r_1 = Ti.UI.createLabel({
						left: 10, top: 10, right: 10, bottom: 10, width: Ti.UI.FILL, height: Ti.UI.SIZE,					
						color:  settings.get_color( 'white' ),
						text: content_array[ 3 ].r_1,
						font: { fontSize: 9, fontFamily: settings.get_font( 'GR-Book' ) },
						textAlign: 'center'
					});
					rc_1.add( r_1 );
					
				var rc_2 = Ti.UI.createView({
					left: 390, top: 147, width: 295, height: Ti.UI.SIZE,
					backgroundColor: '#9ca123'
				});
				slide.add( rc_2 );
				
					var r_2 = Ti.UI.createLabel({
						left: 10, top: 10, right: 10, bottom: 10, width: Ti.UI.FILL, height: Ti.UI.SIZE,					
						color:  settings.get_color( 'white' ),
						text: content_array[ 3 ].r_2,
						font: { fontSize: 9, fontFamily: settings.get_font( 'GR-Book' ) },
						textAlign: 'center'
					});
					rc_2.add( r_2 );
			
			var reference = Ti.UI.createLabel({
				left:0, bottom:10, width: '100%', height: Ti.UI.SIZE,					
				color:  settings.get_color( 'brown' ),
				text: content_array[ 3 ].reference,
				font: { fontSize: 12, fontFamily: settings.get_font( 'GR-Book' ) },
				textAlign: 'center'
			});
			slide.add( reference );
			
		return slide;
	};
	
	function create_slide_five () {
		
		var id = 4;
		
		var slide = Ti.UI.createView({
			width: Ti.UI.FILL, height:  Ti.UI.FILL
		});
			
			var i_1 = Ti.UI.createImageView({
				left: 75, top: 70,
				width: 'auto', height: 'auto',
				image: 'includes/images/basaglar/pink_arrow.png'
			});
			slide.add( i_1 );
			
			var attr = Ti.UI.createAttributedString({
			    text: content_array[ id ].statement_one,
			    attributes: [
			        {
			            type: Ti.UI.ATTRIBUTE_FONT,
			            value: { fontSize: 15, fontFamily: settings.get_font( 'G-BookItalic' ) },
			            range: [ content_array[ id ].statement_one.indexOf('in vitro'), ('in vitro').length]
			        },
			        {
			            type: Ti.UI.ATTRIBUTE_FONT,
			            value: { fontSize: 15, fontFamily: settings.get_font( 'G-BookItalic' ) },
			            range: [ content_array[ id ].statement_one.indexOf('in vivo'), ('in vivo').length]
			        }
			   ]
			});
					
			
			var s_one = Ti.UI.createLabel({
				left: 95, top: 70, width: 575, height: Ti.UI.SIZE,					
				color:  settings.get_color( 'brown' ),
				//text: content_array[ id ].statement_one,
				attributedString: attr,
				font: { fontSize: 15, fontFamily: settings.get_font( 'GR-Book' ) },
				textAlign: 'left'
			});
			slide.add( s_one );
			
			var i_2 = Ti.UI.createImageView({
				left: 75, top: 120,
				width: 'auto', height: 'auto',
				image: 'includes/images/basaglar/pink_arrow.png'
			});
			slide.add( i_2 );
			
			var s_two = Ti.UI.createLabel({
				left: 95, top: 120, width: 575, height: Ti.UI.SIZE,					
				color:  settings.get_color( 'brown' ),
				text: content_array[ id ].statement_two,
				font: { fontSize: 15, fontFamily: settings.get_font( 'GR-Book' ) },
				textAlign: 'left'
			});
			slide.add( s_two );
			
			var i_3 = Ti.UI.createImageView({
				left: 75, top: 175,
				width: 'auto', height: 'auto',
				image: 'includes/images/basaglar/pink_arrow.png'
			});
			slide.add( i_3 );
			
			var s_three = Ti.UI.createLabel({
				left: 95, top: 175, width: 575, height: Ti.UI.SIZE,					
				color:  settings.get_color( 'brown' ),
				text: content_array[ id ].statement_three,
				font: { fontSize: 15, fontFamily: settings.get_font( 'GR-Book' ) },
				textAlign: 'left'
			});
			slide.add( s_three );
			
			var i_4 = Ti.UI.createImageView({
				left: 75, top: 212,
				width: 'auto', height: 'auto',
				image: 'includes/images/basaglar/pink_arrow.png'
			});
			slide.add( i_4 );
			
			var s_four = Ti.UI.createLabel({
				left: 95, top: 212, width: 575, height: Ti.UI.SIZE,					
				color:  settings.get_color( 'brown' ),
				text: content_array[ id ].statement_four,
				font: { fontSize: 15, fontFamily: settings.get_font( 'GR-Book' ) },
				textAlign: 'left'
			});
			slide.add( s_four );
		
			var reference = Ti.UI.createLabel({
				left:0, bottom:32, width: '100%', height: Ti.UI.SIZE,					
				color:  settings.get_color( 'brown' ),
				text: content_array[ id ].reference,
				font: { fontSize: 12, fontFamily: settings.get_font( 'GR-Book' ) },
				textAlign: 'center'
			});
			slide.add( reference );
		
		return slide;
	};
	
////////////////////////////////////////////////////
//RUN FUNCTIONS
////////////////////////////////////////////////////


	
	return self;
	
}

module.exports = this_class;